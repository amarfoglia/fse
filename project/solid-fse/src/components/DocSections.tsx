import { Component, For } from "solid-js"
import { ClinicalDocument } from "../models/ClinicalDocument"
import formatDocumentType from "../utils/formatDocumentType"
import Immunization from "./document/Immunization"
import SpecialtyCard from "./document/SpecialtyCard"

const DocSections: Component<{ document: ClinicalDocument; goBack: () => void }> = (props) => {

  const renderDocumentContent = (document: ClinicalDocument) => {
    const type = formatDocumentType(document.documentType)
    switch(type) {
      case "Laboratory Medicine Report": return <SpecialtyCard document={document} />
      case "Immunization": return <Immunization document={document} />
      default: return <p>Work in progress...</p>
    }
  }

  return (
    <div class="gap-12">
      <div class="flex flex-col gap-4">
        {renderDocumentContent(props.document)}
      </div>
      <div class="grid justify-end">
        <button class="btn mt-6 mx-auto px-10" onClick={props.goBack}>Indietro</button>
      </div>
    </div>
  )
}

export default DocSections