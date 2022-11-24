// let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// let obj = arr.map((value, index) => {
//   return { key: "index_" + index, value: value };
// });
// console.log(obj);

// let sum = obj.reduce((a, b) => a + b.value, 0);

// console.log(sum);

// let filter = obj.filter((o) => {
//   return o.value > 2 && o.value < 7;
// });

// console.log(filter);

// let allFunction = arr
//   .filter((value) => value > 2 && value < 7)
//   .map((v,i)=> ({"key":i,"value":v}));

// console.log(allFunction);

async function f1(txt) {
  return new Promise((resole) => {
    setTimeout(() => {
      resole("text is " + txt);
    }, 2000);
  });
}

function f2(txt) {
  console.log(txt + " leading text added!");
}

console.log("Start!")
f1("hijj").then(f2).then(()=>console.log("done!"));
