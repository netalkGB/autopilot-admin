export default interface Feed {
  id?: string
  name: string
  url: string
  schedule: 'every30minutes' | 'every1hour'
}
