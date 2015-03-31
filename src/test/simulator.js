 var Simulator = require("../main/javascript/simulator.js").Simulator
 var assert = require("assert")    

 function StubReturns(stockReturn, bondReturn) {
  this.randomInflationAdjustedMonthlyReturns = function() { 
    return [round(stockReturn), round(bondReturn)]
  }
 }


function round(n) {
  return Math.round(n * 10000) / 10000
}

 describe("Simulator", function() {
   it("should compound over time", function() {
     var stockReturn = 0.07 / 12
     var bondReturn = 0.03 / 12

     var s = new Simulator({
       principal: 10,
       stockAllocation: 0.5,
       bondAllocation: 0.5,
       withdrawalRate: 0,
       years: 3
     }, new StubReturns(stockReturn, bondReturn))

    var results = s.run(1)[0].map(round)
     assert.deepEqual(results, [10.5114,11.0532,11.6275])
   })

   it("should compound over time and withdraw", function() {
     var stockReturn = 0.07 / 12
     var bondReturn = 0.03 / 12

     var s = new Simulator({
       principal: 10,
       stockAllocation: 0.5,
       bondAllocation: 0.5,
       withdrawalRate: 0.04,
       years: 3 
     }, new StubReturns(stockReturn, bondReturn))

     var results = s.run(3).map(function(d) { return d.map(round) })
     assert.deepEqual(results[0], [10.1004,10.2102,10.33])
     assert.deepEqual(results[1], [10.1004,10.2102,10.33])
     assert.deepEqual(results[2], [10.1004,10.2102,10.33])
   })
 })
