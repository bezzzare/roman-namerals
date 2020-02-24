import RomanNumerals from './RomanNumerals.js'

const numberInput = document.getElementById('number-input')
const romanInput = document.getElementById('roman-input')

const isAllowedControlKey = ({ code, metaKey }) =>
  ['Tab', 'Backspace', 'ArrowRight', 'ArrowLeft'].includes(code) || (metaKey && code !== 'KeyV')

const insertIntoString = (str, position, value) =>
  [str.slice(0, position), value, str.slice(position)].join('')

numberInput.addEventListener('keydown', e => {
  if (isAllowedControlKey(e)) return
  if (!e.key.match(/[0-9]/)) {
    e.preventDefault()
    return
  }

  const cursorPosition = e.srcElement.selectionStart
  const previousValue = e.srcElement.value
  const newValue = insertIntoString(previousValue, cursorPosition, e.key)

  if (Number(newValue, 10) > 3999) e.preventDefault()
})

romanInput.addEventListener('keydown', e => {
  if (isAllowedControlKey(e)) return
  if (!/[ivxlcdm]/i.test(e.key)) {
    e.preventDefault()
    return
  }

  const cursorPosition = e.srcElement.selectionStart
  const previousValue = e.srcElement.value
  const newValue = insertIntoString(previousValue, cursorPosition, e.key).toUpperCase()

  const romanNumber = RomanNumerals.fromRoman(newValue)
  if (romanNumber === -1 || romanNumber > 3999) {
    e.preventDefault()
  }
})

numberInput.addEventListener('input', ({ srcElement: { value: inputString } }) => {
  const romanNumber = RomanNumerals.toRoman(Number(inputString))
  romanInput.value = romanNumber
})

romanInput.addEventListener('input', ({ srcElement: { value: inputString } }) => {
  const number = RomanNumerals.fromRoman(inputString.toUpperCase())
  numberInput.value = number || ''
})
