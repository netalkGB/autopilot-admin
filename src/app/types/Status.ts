export default interface Status {
  name: string
  date: Date
  result: 'success' | 'failed'
}
