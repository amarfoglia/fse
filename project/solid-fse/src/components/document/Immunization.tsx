import { Component, createMemo, For, JSXElement } from "solid-js"
import useDocumentStore from "../../hooks/useDocumentStore"
import { ClinicalDocument } from "../../models/ClinicalDocument"
import { ImmunizationCard } from "../../models/Section"
import { Booster, SubstanceAdministration } from "../../models/SubstanceAdministration"
import { timestampToDate } from "../../utils/date"
import FallbackWrapper from "../FallBackWrapper"

interface DocProps {
  card: ImmunizationCard
}


const checkBoosterDate = (booster: Booster) =>
  booster?.nextBooster ? timestampToDate(booster.nextBooster) : "N/D"

const BoosterBox: Component<{booster: Booster}> = (props) => (
  <>
  <div class="divider my-4"></div>
  <h3 class="text-base mb-2">Richiamo #{props.booster.boosterNumber}</h3>
  <div class="flex flex-wrap gap-4 text-sm text-gray-400">
    <p><i class="mdi mdi-key mr-2"></i>{props.booster.code}</p>
    <p><i class="mdi mdi-checkbox-multiple-blank-circle-outline mr-2"></i>{props.booster.statusCode}</p>
    <p><i class="mdi mdi-skip-next mr-2"></i>{checkBoosterDate(props.booster)}</p>
  </div>
  </>
)

const renderAdministration = (administration: SubstanceAdministration): JSXElement => {
  const boosters = administration.boosters
  return (
    <>
      <div class="flex flex-wrap gap-4 text-sm text-gray-400">
        {<p><i class="mdi mdi-svg mr-2"></i>{administration.preventedDisease?.name}</p>}
        {<p><i class="mdi mdi-human mr-2"></i>{administration.via}</p>}
        {<p><i class="mdi mdi-pill mr-2"></i>{administration.consumable.name + ' (' + administration.doseQuantity + ' ' + administration.unit + ')'}</p>}
        <p><i class="mdi mdi-calendar mr-2"></i>{timestampToDate(administration.effectiveTime)}</p>
      </div>
      <For each={boosters}>{ b =>
        <BoosterBox booster={b}/>
      }</For>
    </>
  )
}

const ImmunizationBox: Component<DocProps> = (props) => {
  const card = createMemo(() => props.card)
  
  return (
    <div class="flex gap-6 p-4 rounded-lg border-2 border-gray-600">
      <div class="
        avatar flex-shrink-0
        w-12 h-12 rounded-full
        flex justify-center items-center
        bg-blue-400 text-gray-700 text-2xl
      "><i class="mdi mdi-needle"></i></div>
      <div class="flex flex-col flex-grow">
        <h2 class="text-xl mb-2">
          {card().title}
        </h2>
        <p class="line-clamp-2 mb-4">{card().body}</p>
        {renderAdministration(card().administration)}
      </div>
    </div>
  )
}

interface Props {
  document: ClinicalDocument
}

const renderContent = (cards: ImmunizationCard[]) => (
  <For each={cards}>{ card =>
    <ImmunizationBox card={card}/>
  }</For>
)

const Immunization: Component<Props> = (props) => {
  const { immunizationCards } = useDocumentStore(props.document.id)

  return (
    <FallbackWrapper 
        reasonForEmpty="Nessuna vaccinazione." 
        renderContent={() => renderContent(immunizationCards())} 
        title="Vaccinazioni"
        error={immunizationCards?.error}
        loading={immunizationCards?.loading}
        empty={immunizationCards()?.length == 0}
    />
  )
}

export default Immunization