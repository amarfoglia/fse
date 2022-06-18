import { createResource } from "solid-js"
import { ImmunizationCard, Section, Specialty } from "../models/Section"
import createStardogQuery from "./createStardogQuery"

const fetchImmunizationCards = async (documentId: string): Promise<ImmunizationCard[]> => {
  const query = createStardogQuery(`
    SELECT ?title ?body ?approachSiteCode ?doseQuantity ?unit ?preventedDisease 
      ?consumable ?via ?participant ?effectiveTime
      (CONCAT(?participantName, " ", ?participantSurname) AS ?participant)
      ?boosterNumber ?boosterStatus ?nextBooster
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:immunization ;
          fse:hasSection [
            fse:title ?title ;
            fse:body ?body; 
            fse:includesAdministration [
              fse:approachSiteCode ?approachSiteCode ;
              fse:doseQuantity ?doseQuantity ;
              fse:unit ?unit ;
              fse:prevents ?preventedDisease ;
              fse:consumable ?consumable ;
              fse:via ?via;
              fse:effectiveTime ?effectiveTime;
              fse:participant [
                foaf:firstName ?participantName ;
                foaf:lastName ?participantSurname
              ];
              fse:boosterOf ?booster
            ]
          ].
        ?booster fse:boosterNum ?boosterNumber ;
                 fse:statusCode ?boosterStatus;
        OPTIONAL {
            ?booster fse:nextBooster ?nextBooster
        }
        FILTER(?id = <${documentId}>)
      }
  `)
  const res = (await query.execute()).results.bindings
  const immunizationCards: ImmunizationCard[] = []

  for (const elem of res) {
    immunizationCards.push({
      title: elem["title"].value,
      body: elem["body"].value,
      administration: {
        approachSiteCode: elem["approachSiteCode"].value,
        doseQuantity: elem["doseQuantity"].value,
        effectiveTime: elem["effectiveTime"].value,
        unit: elem["unit"].value,
        via: elem["via"].value,
        consumable: elem["consumable"].value,
        booster: {
          boosterNumber: elem["boosterNumber"].value,
          statusCode: elem["boosterStatus"].value,
          nextBooster: elem["nextBooster"] ? elem["nextBooster"].value : "N/D"
        },
        participant: elem["participant"].value,
        preventedDisease: elem["preventedDisease"].value
      }
    })
  }  

  return immunizationCards
}

const fetchSpecialties = async (documentId: string): Promise<Specialty[]> => {
  const query = createStardogQuery(`
    SELECT ?title ?name ?result ?method ?code ?material ?unit
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:laboratoryMedicineReport ;
            fse:hasSection [
                  fse:title ?title ;
                  fse:hasCode ?code ;
                  fse:hasResult [
                        fse:name ?name ;
                        fse:result ?result ;
                        fse:method ?method ;
                        fse:material ?material ;
                        fse:unit ?unit ;      
                  ] 
            ] 
          FILTER(?id = <${documentId}>)
      }
  `)
  const res = (await query.execute()).results.bindings
  const specialties: Specialty[] = []

  for (const elem of res) {
    specialties.push({
      title: elem["title"].value,
      code: elem["code"].value,
      test: {
        name: elem["name"].value,
        method: elem["method"].value,
        material: elem["material"].value,
        result: elem["result"].value,
        unit: elem["unit"].value,
      }
    })
  }
  return specialties
}

const fetchAllergies = async (documentId: string): Promise<ImmunizationCard[]> => {
  const query = createStardogQuery(``)
  const res = (await query.execute()).results.bindings
  const immunizationCards: ImmunizationCard[] = []

  for (const elem of res) {
    immunizationCards.push()
  }  

  return immunizationCards
}

const useDocumentStore = (documentId: string) => {
  const [immunizationCards] = createResource<ImmunizationCard[]>(() => fetchImmunizationCards(documentId))
  const [specialties] = createResource<Specialty[]>(() => fetchSpecialties(documentId))

  return { immunizationCards, specialties }
}

export default useDocumentStore