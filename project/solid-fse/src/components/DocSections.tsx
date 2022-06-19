import { Component, For } from "solid-js"
import { ClinicalDocument } from "../models/ClinicalDocument"
import formatDocumentType from "../utils/formatDocumentType"
import Immunization from "./document/Immunization"
import PSS from "./document/PSS"
import SpecialtyCard from "./document/SpecialtyCard"

const DocSections: Component<{ document: ClinicalDocument; goBack: () => void }> = (props) => {

  const renderDocumentContent = (document: ClinicalDocument) => {
    const type = formatDocumentType(document.documentType)
    switch(type) {
      case "Referto di Radiologia": return <></>
      case "Vaccinazioni": return <Immunization document={document} />
      case "Verbale di Pronto Soccorso": return <></>
      case "Referto di Specialistica Ambulatoriale": return <></>
      case "Documento di Esenzione": return <></>
      case "Lettera di Dimissione Ospedaliera": return <></>
      case "Prescrizione": return <></>
      case "Referto di Medicina di Laboratorio": return <SpecialtyCard document={document} />
      case "Profilo Sanitario Sintetico": return <PSS document={document} />
      case "Prescrizione Farmaceutica": return <></>
      case "Prescrizione Specialistica": return <></>
      case "Prescrizione di Ricovero": return <></>
      case "Prescrizione di Trasporto": return <></>
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