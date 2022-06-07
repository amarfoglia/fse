const formatDocumentType = (documentType: string) => {
  const formatted = documentType.split("/").slice(-1)[0].replace(/([A-Z])/g, " $1")
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export default formatDocumentType