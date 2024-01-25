export default interface Schedule {
  id: string
  url: string
  name: string
  schedule: 'every30minutes' | 'every1hour'
}
