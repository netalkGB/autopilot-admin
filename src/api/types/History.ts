export default interface History {
  id: string
  scheduleId: string
  date: Date
  result: 'success' | 'failed'
}
