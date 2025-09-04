
function capital(str) {
   const strArr = str.split('')[0].toUpperCase()
   const remaining = str.split('').slice(1).join('')
   return strArr + remaining
  
}

function reverse(str) {
   const strArr = str.split('').reverse().join('')
   return strArr
}

const calculate = {
   add(a,b) {
      return a + b
   },
   subtract(a,b) {
      return a - b
   },
   divide(a,b) {
      return a / b
   },
   multiply(a,b) {
      return a * b
   }
}

function analyze(arr) {
return { 
    avg: arr.reduce((prev,curr) => prev + curr,0) / arr.length,
    min: arr.reduce((prev,curr) => prev < curr ? prev : curr),
    max: arr.reduce((prev,curr) => prev > curr ? prev : curr),
    length: arr.length
}
}

module.exports = {
   capital,
   reverse,
   calculate,
   analyze
}

capital('tobi')