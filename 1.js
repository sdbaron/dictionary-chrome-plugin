// "Счет №0003" -> "Счет №0004"
// "AB12C999" -> "AB12C000"
// "ABC" -> "ABC"
// "199" -> "200"

function inc(s) {
  var arr = s.split("")
  const len = arr.length
  if (!len) return s

  for (let i = len - 1; i >= 0; i--) {
    let v = parseInt(arr[i], 10) + 1
    arr[i] = v % 10
    if (isNaN(v) || v < 9) break
  }
  return arr.join("")
}

let res = inc("AB12C999")
res = inc("№0003")
res = inc("199")
console.log(res)
