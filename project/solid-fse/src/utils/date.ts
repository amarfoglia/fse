const timestampToDate = (timestamp: number) => {
  const d = new Date(timestamp);
  return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()
}

const dateToString = (date: Date) => {
  const d = date == null ? new Date() : date
  return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()
}

export { timestampToDate, dateToString }