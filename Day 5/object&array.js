// ===============================
// OBJECTS
// ===============================

const user = {
  name: "Sam",
  age: 27,
  isAdmin: false,
  address: {
    city: "Chennai",
    pincode: 600001
  },
  greet() {
    return "Hello " + this.name;
  }
};

console.log(user.name);              // Sam
console.log(user["age"]);            // 27
console.log(user.address.city);      // Chennai
console.log(user.greet());           // Hello Sam

// Add / Modify
user.city = "Bangalore";
user.age = 28;

// Delete
delete user.isAdmin;

// ===============================
// OBJECT DESTRUCTURING
// ===============================

const { name, age } = user;
console.log(name, age);              // Sam 28

const { address: { pincode } } = user;
console.log(pincode);                // 600001

// Default value
const { role = "user" } = user;
console.log(role);                   // user

// ===============================
// ARRAYS
// ===============================

const numbers = [1, 2, 3, 4, 5];

// Array destructuring
const [first, second] = numbers;
console.log(first, second);          // 1 2

// ===============================
// ARRAY METHODS
// ===============================

// map() → returns new array
const doubled = numbers.map(n => n * 2);
console.log(doubled);                // [2,4,6,8,10]

// filter() → returns new array
const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log(evenNumbers);            // [2,4]

// reduce() → returns single value
const sum = numbers.reduce((total, n) => total + n, 0);
console.log(sum);                    // 15

// forEach() → no return
numbers.forEach(n => {
  console.log("Number:", n);
});

// find()
const users = [
  { id: 1, name: "Sam" },
  { id: 2, name: "Ravi" }
];

const foundUser = users.find(u => u.id === 2);
console.log(foundUser);              // { id: 2, name: "Ravi" }

// some()
console.log(numbers.some(n => n > 4));   // true

// every()
console.log(numbers.every(n => n > 0));  // true

// sort()
const marks = [50, 10, 40, 20];
marks.sort((a, b) => a - b);
console.log(marks);                  // [10,20,40,50]

// ===============================
// REAL MERN STYLE EXAMPLE
// ===============================

const cart = [
  { product: "Phone", price: 20000 },
  { product: "Headset", price: 2000 }
];

const totalPrice = cart.reduce((total, item) => total + item.price, 0);
console.log("Total Price:", totalPrice); // 22000
