var Portfolio = require("./portfolio.js").Portfolio

function Simulator(options, returns) {
  this.run = function(simulations) {
    var results = []
    for (var i = 0; i < simulations; i++) {
      results.push(runSimulation())
    }

    return results
  }

 function runSimulation() {
    var yearlyResults = []
    var investments = new Portfolio(options)
    var monthlyWithdrawal = (options.withdrawalRate * options.principal) / 12.0
    var withdrawStock = monthlyWithdrawal * options.stockAllocation
    var withdrawBond =  monthlyWithdrawal * options.bondAllocation

    for (var i = 0; i < options.years; i++) {
      if (investments.total() < 0) { return yearlyResults }
      // Adjust to "real" dollar returns so we can assume a constant withdrawal 
      var monthlyReturns = returns.randomInflationAdjustedMonthlyReturns()
      for (var j = 0; j < 12; j++) {
        investments.withdrawStocks(withdrawStock)
        investments.withdrawBonds(withdrawBond)
        investments.compoundStocks(monthlyReturns[0])
        investments.compoundBonds(monthlyReturns[1])
      }

      yearlyResults.push(investments.total())
    }

    return yearlyResults
  }
}

exports.Simulator = Simulator
