for ( let i = 0; i < 100; i++) {
if (i % 15 == 0 && i != 0) {
    console.log (`${i} es parte de los multiplos de 5 y 3 = FIZZBUZZ`) }
else if (i % 5 == 0 && i != 0) {
console.log (`${i} es parte de los multiplos de 5 = BUZZ`)
}
else if (i % 3 ==0 && i != 0 ){
    console.log (`${i} es parte de los multiplos de 3 = FIZZ`) }
}