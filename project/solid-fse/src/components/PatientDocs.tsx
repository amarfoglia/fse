import { Component, createMemo, For, Match, Resource, Switch } from "solid-js"
import { ClinicalDocument } from "../models/ClinicalDocument"
import formatDocumentType from "../utils/formatDocumentType"

const DocumentCard: Component<{ document: ClinicalDocument }> = (props) => {
  const document = createMemo(() => props.document)

  return (
    <div class="flex gap-6 p-4 rounded-lg border-2 border-gray-600">
      <div class="
        avatar flex-shrink-0
        w-12 h-12 rounded-full
        flex justify-center items-center
        bg-blue-400 text-gray-700 text-2xl
      "><i class="mdi mdi-file-document-outline"></i></div>
      <div class="flex flex-col flex-grow">
        <h2 class="text-xl mb-4">{formatDocumentType(document().documentType)}</h2>
        <div class="flex flex-wrap gap-4 text-sm text-gray-400">
          <p><i class="mdi mdi-key mr-2"></i>{document().id}</p>
          {document().humanAuthor && <p><i class="mdi mdi-account-circle mr-2"></i>{document().humanAuthor}</p>}
          {document().organization && <p><i class="mdi mdi-domain mr-2"></i>{document().organization}</p>}
          <p><i class="mdi mdi-calendar mr-2"></i>01/01/2021</p>
        </div>
        <div class="divider my-4"></div>
        <p class="line-clamp-2">{document().body}</p>
      </div>
    </div>
  )
}

const PatientDocs: Component<{ documents: Resource<ClinicalDocument[]> }> = (props) => {
  return (
    <Switch fallback={
      <div class="flex flex-col gap-6">
        <h1 class="text-3xl">Documenti</h1>
        <For each={props.documents()}>{ document =>
          <DocumentCard document={document}/>
        }</For>
      </div>
    }>
      <Match when={props.documents.error}>
        <p class="text-center">Si è verificato un errore.</p>
      </Match>
      <Match when={props.documents.loading}>
        <p class="text-center">Caricamento...</p>
      </Match>
      <Match when={props.documents()?.length == 0}>
        <p class="text-center">Nessun documento.</p>
      </Match>
    </Switch>
  )
}

export default PatientDocs