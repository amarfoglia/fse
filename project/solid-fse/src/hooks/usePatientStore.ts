import { createResource } from "solid-js"
import { ClinicalDocument } from "../models/ClinicalDocument"
import { Patient } from "../models/Patient"
import { Section } from "../models/Section"
import mapBindingsToValues from "../utils/mapBindingsToValues"
import createStardogQuery from "./createStardogQuery"

const fetchPatient = async (fiscalCode: string) => {
  const query = createStardogQuery(`
    SELECT ?ID ?name ?surname ?birthDate ?fiscalCode ?healthCardNumber (CONCAT(?familyDoctorName, " ", ?familyDoctorSurname) AS ?familyDoctor)
    FROM <https://fse.ontology/>
    WHERE {
      ?ID
        fse:fiscalCode "${fiscalCode}" ;
        a fse:patient ;
        foaf:firstName ?name ;
        foaf:lastName ?surname ;
        foaf:birthday ?birthDate ;
        fse:fiscalCode ?fiscalCode .
      OPTIONAL { ?ID fse:healthCardNumber ?healthCardNumber }
      OPTIONAL {
        ?ID fse:hasFamilyDoctor ?doctor .
        ?doctor
          foaf:firstName ?familyDoctorName ;
          foaf:lastName ?familyDoctorSurname .
      }
    }
  `)
  const res = (await query.execute()).results.bindings
  const patient = mapBindingsToValues(res)[0]
  return patient as Patient
}

const fetchClinicalDocuments = async (fiscalCode: string) => {
  const query = createStardogQuery(`
    SELECT
      ?id ?documentType ?body ?languageCode ?realmCode ?confidentialityCode ?version
      (CONCAT(?patientName, " ", ?patientSurname) AS ?patient)
      (CONCAT(?authorName, " ", ?authorSurname) AS ?humanAuthor)
      ?deviceAuthor ?organization
    FROM <https://fse.ontology/>
    WHERE {
      ?documentType rdfs:subClassOf fse:clinicalDocument .
      ?id
        a ?documentType ;
        fse:body ?body ;
        fse:languageCode ?languageCode ;
        fse:realmCode ?realmCode ;
        fse:versionNumber ?version ;
        fse:confidentialityCode ?confidentialityCode ;
        fse:refersTo <tag:stardog:api:#${fiscalCode}> .
      <tag:stardog:api:#${fiscalCode}>
        foaf:firstName ?patientName ;
        foaf:lastName ?patientSurname .
      OPTIONAL {
        ?id fse:hasHumanAuthor ?ha .
        ?ha
          foaf:firstName ?authorName ;
          foaf:lastName ?authorSurname .
      }
      OPTIONAL {
        ?id fse:hasDeviceAuthor ?da .
        ?da fse:hasIdentifier ?deviceAuthor .
      }
      OPTIONAL {
        ?id fse:hasCustodian ?o .
        ?o org:identifier ?organization .
      }
      FILTER(?documentType NOT IN (fse:clinicalDocument))
    }
  `)
  const res = (await query.execute()).results.bindings
  const documents = mapBindingsToValues(res)
  return documents as ClinicalDocument[]
}

const usePatientStore = (fiscalCode: string) => {
  const [patient] = createResource<Patient>(() => fetchPatient(fiscalCode))
  const [documents] = createResource<ClinicalDocument[]>(() => fetchClinicalDocuments(fiscalCode))
  return { patient, documents }
}

export default usePatientStore