export const isToday = (timestamp: number) => {
  const today = new Date()
  return today.setHours(0, 0, 0, 0) == new Date(timestamp).setHours(0, 0, 0, 0)
}

export const displayDate = (timestamp?: number) => {
  if (!timestamp) return 'N/A'

  let displayDate = new Date(timestamp).toLocaleString()
  if (isToday(timestamp)) {
    displayDate = new Date(timestamp).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  return displayDate
}
