var Portfolio = require("../main/javascript/portfolio.js").Portfolio
var assert = require("assert")


describe("Portfolio", function() {
  it("should count and withdraw stocks", function() {
    var p = new Portfolio({
        principal: 10, 
        stockAllocation: 1,
        bondAllocation: 0
    })

    assert.equal(p.total(), 10)
    p.withdrawStocks(10)
    assert.equal(p.total(), 0)
  })

  it("should count and withdraw bonds", function() {
    var p = new Portfolio({
        principal: 10, 
        stockAllocation: 0.5,
        bondAllocation: 0.5
    })

    assert.equal(p.total(), 10)
    p.withdrawBonds(5)
    assert.equal(p.total(), 5)
  })

  it("should compound stocks and bonds", function() {
    var p = new Portfolio({
        principal: 10, 
        stockAllocation: 0.6,
        bondAllocation: 0.4
    })

    p.compoundStocks(0.5)
    assert.equal(p.total(), 13) 

    p.compoundBonds(0.2)
    assert.equal(p.total(), 13.80)
  })


  it("should compound multiple times", function() {
    var p = new Portfolio({
        principal: 10, 
        stockAllocation: 1,
        bondAllocation: 0
    })

    for (var i = 0; i < 10; i++) {
      p.compoundStocks(0.07)
    }

    var expectedFutureValue = 10 * Math.pow(1 + 0.07, 10)
    assert.equal(Math.round(p.total()), Math.round(expectedFutureValue))
  })

})
