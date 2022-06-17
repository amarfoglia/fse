import { createResource } from "solid-js"
import { ImmunizationCard, Section, Specialty } from "../models/Section"
import createStardogQuery from "./createStardogQuery"

const fetchImmunizationCards = async (documentId: string): Promise<ImmunizationCard[]> => {
  const query = createStardogQuery(``)
  //const res = (await query.execute()).results.bindings
  const sections = [{
    title: "Scheda di singola vaccinazione",
    body: "...",
    code: "11369-6",
    administration: {
      effectiveTime: 1655203450,
      via: "iniezione",
      approchSiteCode: "avambraccio",
      doseQuantity: 12,
      unit: "mg",
      consumable: {
        name: "Drug X",
        description: "..."
      },
      preventedDisease: {
        name: "Morbillo"
      },
      boosters: [{
        boosterNumber: 1,
        statusCode: "completed",
        code: "12345"
      },
      {
        boosterNumber: 2,
        statusCode: "cancelled",
        code: "12345"
      },
      ]
    }
  }]
  return sections
}

const fetchSpecialties = async (documentId: string): Promise<Specialty[]> => {
  const query = createStardogQuery(``)
  //const res = (await query.execute()).results.bindings
  const sections = [{
    title: "Esame di specialità",
    code: "11369-6",
    test: {
      name: "Esame del sangue",
      method: "iniezione",
      material: "sangue",
      result: "non si segnalano problematiche",
      unit: "mg",
      latestVersion: "stardog#self"
    }
  },
  {
    title: "Esame di specialità 2",
    code: "11369-6",
    test: {
      name: "Esame del sangue",
      method: "iniezione",
      material: "sangue",
      result: "non si segnalano problematiche",
      unit: "mg"
    }
  }]
  return sections
}

const useDocumentStore = (documentId: string) => {
  const [immunizationCards] = createResource<ImmunizationCard[]>(() => fetchImmunizationCards(documentId))
  const [specialties] = createResource<Specialty[]>(() => fetchSpecialties(documentId))

  return { immunizationCards, specialties }
}

export default useDocumentStore