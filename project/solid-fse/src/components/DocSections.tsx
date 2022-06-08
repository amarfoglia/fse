import { Link, useLocation, useNavigate } from "solid-app-router"
import { Component, createMemo, For, Match, Resource, Switch } from "solid-js"
import useDocumentStore from "../hooks/useDocumentStore"
import { ClinicalDocument } from "../models/ClinicalDocument"
import { Section } from "../models/Section"

const DocSections: Component<{ document: ClinicalDocument; goBack: () => void }> = (props) => {
  const { sections } = useDocumentStore(props.document.id)

  function renderSection(section: Section) {
    return (
      <><h2>{section.title}</h2><p>{section.text}</p></>
    )
  }

  return (
    <div class="flex gap-12">
      <div class="flex flex-col gap-4">
        <For each={sections()}>{ section =>
          renderSection(section)
        }</For>
      </div>
      <button class="btn mt-6 mx-auto px-10" onClick={props.goBack}>Indietro</button>
    </div>
  )
}

export default DocSections