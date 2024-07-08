export function getFormOfAddress(sex: 'male' | 'female') {
  if (sex === 'male') return 'Mr.'
  if (sex === 'female') return 'Mrs.'
  return ''
}
