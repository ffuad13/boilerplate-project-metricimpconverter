const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
	test("Whole number input", ()=> {
		assert.strictEqual(convertHandler.getNum('13kg'), 13, "Correctly read a whole number input.")
	})

	test("Decimal number input", () => {
		assert.strictEqual(convertHandler.getNum('1.3lbs'), 1.3, "Correctly read a decimal number input")
	})

	test("Fractional input", () => {
		assert.strictEqual(convertHandler.getNum('13/2kg'), 6.5, "Correctly read a fractional input")
	})

	test("Fractional input with a decimal", () => {
		assert.strictEqual(convertHandler.getNum("1.5/0.5kg"), 3, "Correctly read a fractional input with a decimal")
	})

	test("Error on a double-fraction", ()=> {
		assert.strictEqual(convertHandler.getNum("1/3/5kg"), "invalid number", "Return an error on a double-fraction")
	})

	test("No numeric input", ()=> {
		assert.strictEqual(convertHandler.getNum("kg"), 1, 'Correctly default to a numerical input of 1 when no numerical input is provided')
	})

	test("Each valid input unit", () => {
		assert.strictEqual(convertHandler.getUnit("13gal"), 'gal', "Correctly read gal")
		assert.strictEqual(convertHandler.getUnit("13L"), 'L', "Correctly read L")
		assert.strictEqual(convertHandler.getUnit("13mi"), 'mi', "Correctly read mi")
		assert.strictEqual(convertHandler.getUnit("13km"), 'km', "Correctly read km")
		assert.strictEqual(convertHandler.getUnit("13lbs"), 'lbs', "Correctly read lbs")
		assert.strictEqual(convertHandler.getUnit("13kg"), 'kg', "Correctly read kg")
	})

	test("Error for an invalid input unit", ()=> {
		assert.strictEqual(convertHandler.getUnit('13not'), "invalid unit", "Correctly return an error for an invalid input unit")
	})

	test("Return unit for each valid input unit", ()=> {
		assert.strictEqual(convertHandler.getReturnUnit("gal"), 'L', "Correctly return L from gal")
		assert.strictEqual(convertHandler.getReturnUnit("L"), 'gal', "Correctly return gal from L")
		assert.strictEqual(convertHandler.getReturnUnit("km"), 'mi', "Correctly return mi from km")
		assert.strictEqual(convertHandler.getReturnUnit("mi"), 'km', "Correctly return km from mi")
		assert.strictEqual(convertHandler.getReturnUnit("kg"), 'lbs', "Correctly return lbs from kg")
		assert.strictEqual(convertHandler.getReturnUnit("lbs"), 'kg', "Correctly return kg from lbs")
	})

	test('Spelled-out string unit for each valid input unit', ()=> {
		assert.strictEqual(convertHandler.spellOutUnit("GAL"), 'gal', "Correctly return gal from GAL")
		assert.strictEqual(convertHandler.spellOutUnit("l"), 'L', "Correctly return L from l")
		assert.strictEqual(convertHandler.spellOutUnit("MI"), 'mi', "Correctly return mi from mi")
		assert.strictEqual(convertHandler.spellOutUnit("KM"), 'km', "Correctly return km from KM")
		assert.strictEqual(convertHandler.spellOutUnit("KG"), 'kg', "Correctly return kg from KG")
		assert.strictEqual(convertHandler.spellOutUnit("LBS"), 'lbs', "Correctly return lbs from LBS")
	})

	test('Convert gal to L', ()=> {
		assert.strictEqual(convertHandler.convert(3, "gal"), 11.35623, "Correctly convert 3gal to 11.35623L")
	})
	test('Convert L to gal', ()=> {
		assert.strictEqual(convertHandler.convert(3, "L"), 0.79252, "Correctly convert 3L to 0.79252gal")
	})
	test('Convert mi to km', ()=> {
		assert.strictEqual(convertHandler.convert(3, "mi"), 4.82802, "Correctly convert 3mi to 4.82802km")
	})
	test('Convert km to mi', ()=> {
		assert.strictEqual(convertHandler.convert(3, "km"), 1.86412, "Correctly convert 3km to 1.86412mi")
	})
	test('Convert lbs to kg', ()=> {
		assert.strictEqual(convertHandler.convert(3, "lbs"), 1.36078, "Correctly convert 3lbs to 1.36078kg")
	})
	test('Convert kg to lbs', ()=> {
		assert.strictEqual(convertHandler.convert(3, "kg"), 6.61387, "Correctly convert 3kg to 6.61387lbs")
	})
});