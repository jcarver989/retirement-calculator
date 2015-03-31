function Portfolio(options) { 
  var stockValue = options.principal * options.stockAllocation
  var bondValue = options.principal * options.bondAllocation
  this.withdrawStocks  = function(amount) { stockValue -= amount }
  this.withdrawBonds   = function(amount) { bondValue -= amount }
  this.compoundStocks  = function(rate)   { stockValue *= (1 + rate) }
  this.compoundBonds   = function(rate)   { bondValue *= (1 + rate) }
  this.total           = function()       { return stockValue + bondValue }
}

exports.Portfolio = Portfolio
