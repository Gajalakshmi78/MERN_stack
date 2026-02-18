let name = "Gajalakshmi";
let age = 21;
let isStudent = true;

console.log(name);
console.log(age);
console.log(isStudent);

let a = 5;
let b = 10;

a = a + b;
b = a - b;
a = a - b;

console.log(a, b);

let x = 10;
let y = x;
y = 20;
console.log(x);

const pi = 3.14;
const radius = 5;
const area = pi * radius * radius;

let num1 = 10;
let num2 = 3;

console.log(num1 + num2); // Sum
console.log(num1 - num2); // Difference
console.log(num1 * num2); // Product
console.log(num1 / num2); // Quotient
console.log(num1 % num2); // Remainder

console.log(5 + "5");   // "55"
console.log(5 - "2");   // 3
console.log(true + 1);  // 2

let num = 80;

if (num > 100) {
    console.log("Greater than 100");
} else if (num === 100) {
    console.log("Equal to 100");
} else {
    console.log("Less than 100");
}

5 == "5";   // true (value only)
5 === "5";  // false (value + type)

let personage = 25;

if (personage >= 18 && age <= 60) {
    console.log("Eligible");
} else {
    console.log("Not Eligible");
}

let number = 7;

if (number % 2 === 0)
    console.log("Even");
else
    console.log("Odd");

let n = 15;

if (n % 3 === 0 && n % 5 === 0)
    console.log("FizzBuzz");
else if (n % 3 === 0)
    console.log("Fizz");
else if (n % 5 === 0)
    console.log("Buzz");
else
    console.log(n);

let day = 3;

switch (day) {
    case 1: console.log("Monday"); break;
    case 2: console.log("Tuesday"); break;
    case 3: console.log("Wednesday"); break;
    case 4: console.log("Thursday"); break;
    case 5: console.log("Friday"); break;
    case 6: console.log("Saturday"); break;
    case 7: console.log("Sunday"); break;
    default: console.log("Invalid day");
}

// 1 to 20
for (let i = 1; i <= 20; i++) {
    console.log(i);
}

// Even numbers
for (let i = 2; i <= 20; i += 2) {
    console.log(i);
}

let N = 5;
let sum = 0;
let i = 1;

while (i <= N) {
    sum += i;
    i++;
}

console.log(sum);

for (let i = 1; i <= 10; i++) {
    if (i === 5) continue;
    if (i === 8) break;
    console.log(i);
}


const add = (a, b) => a + b;

function isPrime(n) {
    if (n <= 1) return false;

    for (let i = 2; i < n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function test() {
    return;
    console.log("Hello");
}
test();

function largest(arr) {
    return Math.max(...arr);
}

function calculateGrade(marks) {
    if (marks >= 90) return "A";
    else if (marks >= 75) return "B";
    else if (marks >= 50) return "C";
    else return "Fail";
}

let marks = 82;
let grade = calculateGrade(marks);

console.log("Marks:", marks);
console.log("Grade:", grade);
