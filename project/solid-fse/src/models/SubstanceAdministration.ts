import { LOINC_code } from "./ClinicalDocument"
import { OperatingProcedure } from "./OperatingProcedure"

interface SubstanceAdministration extends OperatingProcedure {
  effectiveTime: string
  routeCode: string
  via: string
  approachSiteCode: string
  doseQuantity: number
  boosterOf?: Booster
  preventedDisease?: Disease
  consumable: Drug
  participant?: string
}

interface Booster {
  boosterNumber: number
  statusCode: string
  nextBooster: string
  code: LOINC_code
}

interface Disease {
  name: string
}

interface Drug {
  name: string
  description: string
}

export { SubstanceAdministration, Booster }