import { createResource } from "solid-js"
import { Section } from "../models/Section"
import createStardogQuery from "./createStardogQuery"

const fetchSections = async (documentId: string): Promise<Section[]> => {
  const query = createStardogQuery(``)
  //const res = (await query.execute()).results.bindings
  const sections = [{
    title: "Work in progress...",
    text: "..."
  }]
  return sections
}

const useDocumentStore = (documentId: string) => {
  const [sections] = createResource<Section[]>(() => fetchSections(documentId))
  return { sections }
}

export default useDocumentStore