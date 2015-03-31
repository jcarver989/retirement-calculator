var Options = require("./options.js").Options
var Simulator = require("./simulator.js").Simulator
var returns = require("./dataSet.js")

exports.run = function(options, trials) {
  var succeeded = 0
  var failed = 0

  var results = new Simulator(options, returns)
    .run(trials)
    .sort(function(a, b) { return a[a.length-1] - b[b.length-1] })

  console.log("[")
  results.forEach(function(yearlyResults) {
      var endValue = yearlyResults[yearlyResults.length-1]
      if (endValue < 0) {
        failed += 1 
      } else {
        succeeded += 1
      }
      console.log(Math.round(endValue) + ",")
  })

  console.log("]")

  console.log(succeeded / (succeeded + failed)) 

  function commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}


exports.run(new Options(), 5000)
