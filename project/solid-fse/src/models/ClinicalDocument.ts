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
}