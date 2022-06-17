import { OperatingProcedure } from "./OperatingProcedure"

interface SubstanceAdministration extends OperatingProcedure {
  effectiveTime: number
  via: string
  doseQuantity: number
  unit: string
  approchSiteCode: string
  consumable?: Drug
  boosters: Booster[]
  preventedDisease?: Disease
  participant?: string
}

interface Booster {
  boosterNumber: number
  statusCode: string
  nextBooster?: number
  code: string
}

interface Disease {
  name: string
}

interface Drug {
  name: string
  description: string
}

export { SubstanceAdministration, Booster }