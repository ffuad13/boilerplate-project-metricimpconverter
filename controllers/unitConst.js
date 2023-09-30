const mi2Km = 1.60934
const lbs2Kg = 0.453592
const gal2L = 3.78541
const units = {
  gal: "L",
  L: "gal",
  mi: "km",
  km: "mi",
  lbs: "kg",
  kg: "lbs",
}
const convertRate = {
  gal: gal2L,
  L: 1 / gal2L,
  mi: mi2Km,
  km: 1 / mi2Km,
  lbs: lbs2Kg,
  kg: 1 / lbs2Kg,
}
const unitNames = {
  gal: "gallons",
  L: "liters",
  mi: "miles",
  km: "kilometers",
  lbs: "pounds",
  kg: "kilograms",
}

module.exports = {units, convertRate, unitNames}