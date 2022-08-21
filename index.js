numbers = document.querySelectorAll(".numbers");
operators = document.querySelectorAll(".operators");
console.log(numbers);

var previousNumber = '';
var currentNumber = '';
var ecuation = '';
var ok;
var data;
var dot = 0;
var signs = ["+", "-", "*", "/", "="];
for (var i = 0; i < numbers.length; i++)
  numbers[i].addEventListener("click", function() {
    data = this.innerHTML;
    ok = 0;
    if (data === ".")
      {if (dot === 0) {appendNumber(data);dot = 1;}}
    else if (data !== '=') appendNumber(data);
  })


for (var i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", function() {
    dot = 0;
    if (this.innerHTML === "RESET")
      {reset();
       ok = 0;
      }
    else if (this.innerHTML === "=")
      {result();
       ok = 0;
      }
    else if (this.innerHTML === "DEL")
      {del();
       ok = 0;
      }
    else if(ok === 0)
      {appendNumber(this.innerHTML)
      ok = 1;
    }
  })
}


function appendNumber(x) {
  if (x === "x") x = "*";
  ecuation = ecuation + x;

  console.log(ecuation);
  document.querySelector(".display h2").innerHTML = ecuation;
}

var numbersArray = [];
var signsArray = [];
var total;

function del()
{
  ecuation = ecuation.slice(0, -1);
  if (ecuation.length != 0)
    document.querySelector(".display h2").innerHTML = ecuation;
  else
    document.querySelector(".display h2").innerHTML = "0";
}


function result() {
  ecuation = ecuation + "=";
  let signPos = 0;
  for (let j = 0; j < ecuation.length; j++) {
    for (let k = 0; k < signs.length; k++) {
      if (ecuation[j] === signs[k]) {
        previousNumber = currentNumber;
        currentNumber = Number(ecuation.slice(signPos, j));
        signPos = j + 1;
        numbersArray.push(currentNumber);
        if (signsArray.length !== 0) {

          if (signsArray[signsArray.length - 1] === "*" || signsArray[signsArray.length - 1] === "/") {
            numbersArray.pop();
            numbersArray.pop();
            if (signsArray[signsArray.length - 1] === "*") {
              numbersArray.push(previousNumber * currentNumber);
              currentNumber = previousNumber * currentNumber;
            } else {
              numbersArray.push(previousNumber / currentNumber);
              currentNumber = previousNumber / currentNumber;
            }
            signsArray.pop();
          }
        }
        signsArray.push(signs[k]);
      }
    }
  }
  signsArray.pop();
  console.log(numbersArray);
  total = numbersArray[0];
  for (let j = 0; j < signsArray.length; j++) {
    if (signsArray[j] === '+')
      total = total + numbersArray[j + 1];
    else total = total - numbersArray[j + 1];
  }
  reset();
  ecuation = total;
  document.querySelector(".display h2").innerHTML = total;
}

function reset() {
  numbersArray = [];
  signsArray = [];
  ecuation = ' ';
  document.querySelector(".display h2").innerHTML = "0";
}
