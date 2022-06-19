import { createResource, createRoot, createSignal } from "solid-js"
import { outdent } from "outdent"
import { Query } from "../models/Query"
import createStardogQuery from "./createStardogQuery"

const queries: Query[] = [
  {
    name: "Lista pazienti",
    code: outdent`
      SELECT ?ID ?Nome ?Cognome ?Data_di_Nascita ?Codice_Fiscale ?Tessera_Sanitaria ?Nome_Medico ?Cognome_Medico
      FROM <https://fse.ontology/>
      WHERE {
        ?ID
          a fse:patient ;
          foaf:firstName ?Nome ;
          foaf:lastName ?Cognome ;
          foaf:birthday ?Data_di_Nascita ;
          fse:fiscalCode ?Codice_Fiscale .
        OPTIONAL { ?ID fse:healthCardNumber ?Tessera_Sanitaria }
        OPTIONAL {
          ?ID fse:hasFamilyDoctor ?Medico_di_Famiglia .
          ?Medico_di_Famiglia
            foaf:firstName ?Nome_Medico ;
            foaf:lastName ?Cognome_Medico .
        }
      }
    `
  },
  {
    name: "Lista documenti",
    code: outdent`
    SELECT
      ?ID ?Tipo_Documento ?Testo ?Lingua ?Paese ?Codice ?Codice_LOINC ?Versione
      (CONCAT(?patientName, " ", ?patientSurname) AS ?Paziente)
      (CONCAT(?authorName, " ", ?authorSurname) AS ?Autore)
      ?Dispositivo_Emittente ?Organizzazione ?Data 
      ?In_adempimento_a
      (CONCAT(?signatoryName, " ", ?signatorySurname) AS ?Firmatario) ?Data_firma
    FROM <https://fse.ontology/>
    WHERE {
      ?Tipo_Documento rdfs:subClassOf fse:clinicalDocument .
      ?ID
        a ?Tipo_Documento ;
        fse:languageCode ?Lingua ;
        fse:realmCode ?Paese ;
        fse:versionNumber ?Versione ;
        fse:hasCode ?Codice_LOINC ;
        fse:confidentialityLevel ?Codice ;
        fse:createdAt ?Data;
        fse:refersTo [
          foaf:firstName ?patientName ;
          foaf:lastName ?patientSurname
        ]
      OPTIONAL {
        ?ID fse:hasHumanAuthor [
          foaf:firstName ?authorName ;
          foaf:lastName ?authorSurname
        ] .
      }
      OPTIONAL {
          ?ID fse:body ?Testo ;
      }
      OPTIONAL {
        ?id fse:hasDeviceAuthor [
          fse:hasIdentifier ?Dispositivo_Emittente
        ]
      }
      OPTIONAL {
          ?ID fse:inFulfillmentOf ?In_adempimento_a;
      }
      OPTIONAL {
        ?ID fse:hasCustodian [
            org:identifier ?Organizzazione
        ]
      }
      OPTIONAL {
        ?ID fse:hasBeenSigned [
          fse:effectiveTime ?Data_firma ;
          fse:hasLegalAuthenticator [
            foaf:firstName ?signatoryName;
            foaf:lastName ?signatorySurname
          ]
        ];
      }
      FILTER (?Tipo_Documento NOT IN (fse:clinicalDocument))
    }
    `
  },
  {
    name: "Conteggio documenti per organizzazione",
    code: outdent`
      SELECT ?ID ?Nome_Organizzazione (COUNT(?document) AS ?Documenti)
      FROM <https://fse.ontology/>
      WHERE {
        ?document fse:hasCustodian ?ID .
        ?ID org:identifier ?Nome_Organizzazione .
      }
      GROUP BY ?ID ?Nome_Organizzazione
    `
  },
  {
    name: "Percentuale di entrate in pronto soccorso con ambulanza",
    code: outdent`
      SELECT (100 * COUNT(?amb) / (COUNT(?id)) AS ?Percentuale)
      FROM <https://fse.ontology/>
      WHERE {
        ?id
          a fse:firstAidReport ;
          fse:cameWith ?amb .
      }
    `
  },
  {
    name: "Pazienti con vaccini scaduti",
    code: outdent`
    SELECT ?ID (CONCAT(?name, " ", ?surname) AS ?Paziente) ?Documento ?Data ?Valido_fino_a
    FROM <https://fse.ontology/>
    WHERE {
      ?doc
        a fse:immunization ;
        fse:hasLatestVersion ?doc ;
        fse:refersTo ?ID ;
        fse:hasSection [
          fse:body ?Documento ;
          fse:includesAdministration [
            fse:effectiveTime ?Data ;
            fse:validUntil ?Valido_fino_a
          ]
        ] .
        ?ID foaf:firstName ?name ;
        foaf:lastName ?surname .
      FILTER(xsd:dateTime(?Valido_fino_a) < xsd:dateTime(NOW())) .
    }
    `
  },
  {
    name: "Elenco donatori di organi",
    code: outdent`
      SELECT ?ID ?Nome ?Cognome
      FROM <https://fse.ontology/>
      WHERE {
        ?ID
          fse:isOrganDonor "true" ;
          foaf:firstName ?Nome ;
          foaf:lastName ?Cognome .
      }
    `,
    options: { reasoning: true }
  },
  {
    name: "Elenco allergie",
    code: outdent`
      SELECT ?ID ?Nome ?Cognome ?Cod_Allergia ?Descrizione
      FROM <tag:stardog:api:context:all>
      WHERE {
        ?ID
          foaf:firstName ?Nome ;
          foaf:lastName ?Cognome ;
          fse:hasAllergy ?Cod_Allergia .
        ?Cod_Allergia
          obo:IAO_0000115 ?Descrizione .
      }
    `,
    options: { reasoning: true }
  },
  {
    name: "Elenco malattie",
    code: outdent`
      SELECT ?ID ?Nome ?Cognome ?Cod_Malattia ?Descrizione
      FROM <tag:stardog:api:context:all>
      WHERE {
        ?ID
          foaf:firstName ?Nome ;
          foaf:lastName ?Cognome ;
          fse:hasDisease ?Cod_Malattia .
        ?Cod_Malattia
          obo:IAO_0000115 ?Descrizione .
      }
    `,
    options: { reasoning: true }
  },
  {
    name: "Descrizione documenti",
    code: outdent`
      SELECT ?id ?desc
      FROM <tag:stardog:api:context:all>
      WHERE {
        ?id a fse:clinicalDocument .
        ?id fse:hasCode [
                loinc:LOINC_COMPONENT ?desc 
            ]
      }
    `,
    options: { reasoning: true }
  }
]

const queriesStore = createRoot(() => {
  // Query code string, used in CustomQuery
  const [queryCode, setQueryCode] = createSignal("")

  // Dynamic resource, refetches whenever currentQuery changes
  const runQuery = async (query: Query) => {
    if (query.code == "") return
    setQueryCode(query.code)
    const res = await createStardogQuery(query.code, query.options ?? {}).execute()
    if (res?.head?.vars == undefined || res?.results?.bindings == undefined)
      throw "Errore nell'esecuzione della query."
    return res
  }
  const [currentQuery, setCurrentQuery] = createSignal<Query | undefined>(undefined)
  const [queryResult] = createResource(currentQuery, runQuery)

  return {
    queries,
    queryCode, setQueryCode,
    currentQuery,
    runQuery: setCurrentQuery,
    queryResult
  }
})

export default () => queriesStore