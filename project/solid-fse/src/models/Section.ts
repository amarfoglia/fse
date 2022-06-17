import { ClinicalDocument, LOINC_code } from "./ClinicalDocument"
import { OperatingProcedure, Observation } from "./OperatingProcedure"
import { HealthWorker } from "./Person"
import { SubstanceAdministration } from "./SubstanceAdministration"

interface Section {
  title: string
  body?: string
  code: string
  isPartOf?: ClinicalDocument
}


// PSS - Summary Health Profile
interface Immunizations extends Section {
  administrations: SubstanceAdministration[]
}

interface Alerts extends Section {
  startAt: string
  endAt: string
  adverseReaction: AdverseReaction
  agent: Agent
  allergy: Allergy
}

interface HistoryOfDiseases extends Section {
  disease: Disease[]
}

interface HistoryOfPregnancies extends Section {
  pregnancies: Pregnancy[]
}

interface Medications extends Section {
  therapies: Therapy[]
}

// RML - Medicine Laboratory Report
interface Specialty extends Section {
  test: Test
}

// RSA - Outpatient Specialist Report
interface Service extends Section {
  procedures: OperatingProcedure[]
}

interface osReport extends Section {}

// VPS - First Aid Report
interface ModeOfTransport extends Section {
  vehicle: string
}

interface Triage extends Section {
  effectiveTime: string
  statusCode: string
  performers: HealthWorker[]
}

interface Discharge extends Section {
  effectiveTime: string
  statusCode: string
  performer: HealthWorker
  transfer: string // Organization
}

interface ModeOfTransport extends Section {
  vehicle: string
  missionManager: HealthWorker
}

interface ReasonForVisit extends Section {
  mainProblem: Observation
}

// VAC - Immunization
interface ImmunizationCard extends Section {
  administration: SubstanceAdministration
}

// DE - Discharge Letter
interface DsExemption extends Section {}

// P - Prescription
interface Prescriptions extends Section {}

// LDO - Hospital Discharge Letter
interface DischargeDiagnosis extends Section {}
interface ReasonForAdmission extends Section {}
interface Progression extends Section {}

// RAD - Radiology Report
interface RadReport extends Section {}
interface PerformedExam extends Section {}

interface Pregnancy {
  result: string
  startedAt: string
  endAt: string
}

interface Therapy {
  statusCode: string
  start: string
  end: string
  dailyQuantity: number
  administrations: SubstanceAdministration[]
}

interface Allergy {
  name: string
  description: string
}

interface Agent {
  name: string
  description: string
}

interface AdverseReaction {
  name: string
  description: string
}

interface Disease {
  name: string
  description: string
}

interface Test {
  name: string
  method: string
  material: string
  result: string
  unit: string
  latestVersion?: string
}

export { Section, OperatingProcedure, ImmunizationCard, Specialty, Test }