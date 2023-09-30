const { units, convertRate, unitNames } = require('./unitConst')

function GetCharIndex(input) {
  const regEx = /[a-zA-Z]/
  return input.split("").findIndex((char) => regEx.test(char))
}

function ConvertHandler() {
  this.getNum = function(input) {
    const msg = "invalid number"
    const charIndex = GetCharIndex(input)
    if (charIndex === 0) return 1

    let strQty
    charIndex < 0 ? strQty = input.slice(0) : strQty = input.slice(0, charIndex)

    const arrQty = strQty.split("/")
    if (arrQty.length === 1) {
      const qty = arrQty[0]
      if (qty == "") return msg
      return isNaN(+qty) ? msg : +qty
    }
    if (arrQty.length === 2) {
      if (arrQty.some((num) => num === "")) return msg
      const [numerator, denominator] = arrQty
      return isNaN(+numerator) || isNaN(+denominator) ? msg : +numerator / +denominator
    }

    return msg
  };

  this.getUnit = function(input) {
    const charIndex = GetCharIndex(input)
    if (charIndex < 0) return "invalid unit"

    const unit = input.slice(charIndex)
    return this.spellOutUnit(unit)
  };

  this.getReturnUnit = function(initUnit) {
    return units[initUnit]
  };

  this.spellOutUnit = function(unit) {
    if (unit === 'L' || unit === 'l') return 'L'
    const unitLow = unit.toLowerCase()
    if (units.hasOwnProperty(unitLow)) return unitLow
    return "invalid unit"
  };

  this.convert = function(initNum, initUnit) {
    return Math.round(convertRate[initUnit] * initNum * 1e5) / 1e5
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${unitNames[initUnit]} converts to ${returnNum} ${unitNames[returnUnit]}`
  };

}

module.exports = ConvertHandler;
