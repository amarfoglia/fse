import { Observation } from "./OperatingProcedure"
import { Section } from "./Section"
import { SubstanceAdministration } from "./SubstanceAdministration"

export interface ClinicalDocument {
  id: string
  documentType: string
  // timestamp: string
  version: number
  languageCode: string
  realmCode: string
  confidentialityCode: string
  body: string
  humanAuthor?: string
  deviceAuthor?: string
  organization?: string
  code?: LOINC_code
  sections?: Section[]
  inFulfillmentOf?: Prescription
}

export interface LOINC_code {
  value: string
  description: string
}


// Prescription
interface Prescription extends ClinicalDocument {
  priority: string
}

interface Pharma extends Prescription {
  administrations: SubstanceAdministration[]
}

interface Specialist extends Prescription {
  observations: Observation[]
}

interface Admission extends Prescription {}

interface TransportRequest extends Prescription {}