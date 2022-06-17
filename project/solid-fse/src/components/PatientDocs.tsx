import { Link, useLocation, useNavigate } from "solid-app-router"
import { Component, createMemo, For, Match, Resource, Switch } from "solid-js"
import { ClinicalDocument } from "../models/ClinicalDocument"
import { dateToString } from "../utils/date"
import formatDocumentType from "../utils/formatDocumentType"
import FallbackWrapper from "./FallBackWrapper"

interface DocProps {
  document: ClinicalDocument
  onClick: (doc: ClinicalDocument) => void
}

const ConfidentialTooltip: Component<{ confidentialityLevel: string }> = (props) => {
  const getColor = (level: string) => {
    switch(level) {
      case "N (normal)": return "blue"
      case "R (restricted)": return "yellow"
      case "V (very restricted)": return "red"
      default: return "white"
    }
  }
  return (
    <i class={'text-'+getColor(props.confidentialityLevel)+'-400 mdi mdi-alert-circle tooltip'}>
      <span class="tooltiptext bg-blue-400 text-gray-700">{props.confidentialityLevel}</span>
    </i>
  )
}

const DocumentCard: Component<DocProps> = (props) => {
  const document = createMemo(() => props.document)
  
  return (
    <Link
      href="#"
      class="no-underline flex items-center gap-6 hover:bg-gray-700 transition-colors"
      onClick={() => props.onClick(props.document)}
    >
      <div class="flex gap-6 p-4 rounded-lg border-2 border-gray-600">
        <div class="
          avatar flex-shrink-0
          w-12 h-12 rounded-full
          flex justify-center items-center
          bg-blue-400 text-gray-700 text-2xl
        "><i class="mdi mdi-file-document-outline"></i></div>
        <div class="flex flex-col flex-grow">
          <div class="flex flex-wrap gap-4 items-baseline mb-4 justify-between">
            <h2 class="text-xl">
              {formatDocumentType(document().documentType)}
            </h2>
            <ConfidentialTooltip confidentialityLevel={document().confidentialityCode} />
          </div>
          <div class="flex flex-wrap gap-4 text-sm text-gray-400">
            <p><i class="mdi mdi-key mr-2"></i>{document().id}</p>
            {document().humanAuthor && <p><i class="mdi mdi-account-circle mr-2"></i>{document().humanAuthor}</p>}
            {document().organization && <p><i class="mdi mdi-domain mr-2"></i>{document().organization}</p>}
            <p><i class="mdi mdi-calendar mr-2"></i>{dateToString(document().createdAt)}</p>
            <p class="tooltip">
              <i class="mdi mdi-pen mr-2"></i>{document().signatory}
              <span class="tooltiptext bg-blue-400 text-gray-700">{dateToString(document().signTime)}</span>
            </p>
            <p><i class="mdi mdi-link-variant mr-2">{document().inFulfillmentOf}</i></p>
          </div>
          <div class="divider my-4"></div>
          <p class="line-clamp-2">{document().body}</p>
        </div>
      </div>
    </Link>

  )
}

interface Props {
  documents: Resource<ClinicalDocument[]>
  onDocumentClick: (doc: ClinicalDocument) => void
}

const renderContent = (documents: ClinicalDocument[], onClick: (doc: ClinicalDocument) => void) => (
  <For each={documents}>{ document =>
    <DocumentCard document={document} onClick={onClick}/>
  }</For>
)

const PatientDocs: Component<Props> = (props) => {
  return (
    <FallbackWrapper 
        reasonForEmpty="Nessun documento." 
        renderContent={() => renderContent(props.documents(), props.onDocumentClick)} 
        title="Documenti"
        error={props.documents.error}
        loading={props.documents.loading}
        empty={props.documents()?.length == 0}
    />
  )
}

export default PatientDocs