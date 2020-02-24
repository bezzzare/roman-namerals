const FROM_ROMAN_MAP = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
  X: 10,
  XX: 20,
  XXX: 30,
  XL: 40,
  L: 50,
  LX: 60,
  LXX: 70,
  LXXX: 80,
  XC: 90,
  C: 100,
  CC: 200,
  CCC: 300,
  CD: 400,
  D: 500,
  DC: 600,
  DCC: 700,
  DCCC: 800,
  CM: 900,
  M: 1000,
  MM: 2000,
  MMM: 3000
}

const TO_ROMAN_MAP = Object.entries(FROM_ROMAN_MAP).reduce((accum, [key, value]) => {
  accum[value] = key
  return accum
}, {})

const toRoman = (num) => {
  const strNum = num.toString()
  let output = ''
  for (let i = 0; i < strNum.length; i++) {
    const rank = strNum.length - (i + 1)
    const value = Number(strNum[i]) * Math.pow(10, rank)

    if (!value) continue
    output += TO_ROMAN_MAP[value]
  }
  return output
}

const fromRoman = (romanNumber) => {
  if (!romanNumber) return 0
  const romanChars = romanNumber.split('')
  const groups = [1000, 100, 10, 1]

  let startGroupIndex = 0
  let output = 0
  for (let g of groups) {
    let endGroupIndex = romanChars.findIndex(char => FROM_ROMAN_MAP[char] < g)
    endGroupIndex = endGroupIndex === -1 ? romanNumber.length : endGroupIndex
    const romanGroup = romanChars.slice(startGroupIndex, endGroupIndex).join('')

    if (!romanGroup) continue
    if (!FROM_ROMAN_MAP[romanGroup]) return -1
    output += FROM_ROMAN_MAP[romanGroup]
    startGroupIndex = endGroupIndex
  }
  return output
}

export default { toRoman, fromRoman }
