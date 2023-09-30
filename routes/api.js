'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const msg = ['invalid input', 'invalid number', 'invalid unit']
    const {input} = req.query
    if (!input) return res.send(msg[0])

    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)

    if (initNum === msg[1] && initUnit === msg[2]) return res.send(`${msg[1]} and unit`)
    if (initNum === msg[1]) return res.send(msg[1])
    if (initUnit === msg[2]) return res.send(msg[2])

    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const returnNum = convertHandler.convert(initNum, initUnit)
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

    res.json({initNum, initUnit, returnNum, returnUnit, string})
  })
};
