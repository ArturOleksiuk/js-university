//1.2.3
let car1 = new Object();
car1.color = "black";
car1.maxSpeed = 140;
car1.driver = new Object();
car1.driver.name = "Oleksiuk Artur";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";
car1.tuning = true;
car1["number of accidents"] = 0;
//1.2.4
let car2 = {
  color: "blue",
  maxSpeed: 200,
  driver: {
    name: "Oleksiuk Artur",
    category: "B",
    "personal limitations": null,
  },
  tuning: false,
  "number of accidents": 2,
};
//1.2.5
car1.drive = function () {
  console.log("I am not driving at night");
};
car1.drive();
//1.2.6
car2.drive = function () {
  console.log("I can drive anytime");
};
car2.drive();
//1.2.7
function Truck(color, weight, avgSpeed, brand, model) {
  this.color = color;
  this.weight = weight;
  this.avgSpeed = avgSpeed;
  this.brand = brand;
  this.model = model;
  this.trip = function(){
    if(!this.driver){
      console.log("No driver assigned");
    }
    else{
      let nightDriving = this.driver.nightDriving === true ? "drives at night" : "does not drive at night";
      console.log(`Driver ${this.driver.name} ${nightDriving} and has ${this.driver.experience} years of experience`);
    }
  };
}
//1.2.8
Truck.prototype.AssignDriver = function (name, nightDriving, experience) {
  this.driver = {
    name: name,
    nightDriving: nightDriving,
    experience: experience,
  };
};
//1.2.10
let truck1 = new Truck("blue", 7000, 120, "Volvo", "FH16");
let truck2 = new Truck("red", 6000, 130, "Marcedes", "Actros");
truck1.AssignDriver("John Moncler", true, 2);
truck2.AssignDriver("Alex Louren", false, 4);
truck1.trip();
truck2.trip();
//1.2.13
class Square{
  constructor(a){
    this.a = a;
  }
  static help(){
    console.log("Квадрат — це чотирикутник, у якого всі сторони рівні.");
    console.log("У квадрата всі кути прямі (по 90 градусів).");
    console.log("Площа квадрата обчислюється як квадрат його сторони (a * a).");
    console.log("Периметр квадрата обчислюється як сума всіх його сторін (4 * a).");
  }
  length(){
    console.log(`Cума довжин сторін квадрата: ${this.a * 4}`);
  }
  square(){
    console.log(`Площа квадрата: ${this.a ** 2}`);
  }
  info() {
    console.log("Квадрат:");
    console.log("Довжини всіх 4 сторін: " + (this.a * 4));
    console.log("Величини всіх 4 кутів: 90 градусів");
    console.log("Сума довжин сторін: " + (4 * this.a));
    console.log("Площа: " + (this.a ** 2));
  }
}
class Rectangle extends Square{
  constructor(a, b){
    super(a);
    this.b = b;
  }
  static help() {
    console.log("Прямокутник — це чотирикутник, у якого протилежні сторони рівні.");
    console.log("У прямокутника всі кути прямі (по 90 градусів).");
    console.log("Площа прямокутника обчислюється як добуток довжин двох сторін (a * b).");
    console.log("Периметр прямокутника обчислюється як сума всіх його сторін (2 * (a + b)).");
  }
  length() {
    console.log(`Сума довжин всіх сторін прямокутника: ${2 * (this.a + this.b)}`);
  }
  square(){
    console.log(`Площа прямокутника: ${this.a * this.b}`);
  }
  info() {
    console.log("Прямокутник:");
    console.log("Довжини 2 сторін: " + this.a + " і " + this.b);
    console.log("Величини всіх 4 кутів: 90 градусів");
    console.log("Сума довжин сторін: " + (2 * (this.a + this.b)));
    console.log("Площа: " + (this.a * this.b));
  }
}
//1.2.18-1.2.19
class Rhombus extends Square{
  constructor(a, alpha, beta){
    super(a);
    this.alpha = alpha;
    this.beta = beta;
  }
  static help() {
    console.log("Ромб — це чотирикутник, у якого всі сторони рівні.");
    console.log("У ромба два однакових кути: тупий і гострий.");
    console.log("Площа ромба обчислюється як добуток сторони на висоту (a * h).");
    console.log("Периметр ромба обчислюється як сума всіх його сторін (4 * a).");
  }
  length() {
    console.log(`Сума довжин всіх сторін ромба: ${4 * this.a}`);
  }
  square() {
    let h = this.a * Math.sin(this.beta * Math.PI / 180);
    console.log(`Площа ромба: ${this.a * h}`);
  }
  info() {
    console.log("Ромб:");
    console.log("Довжини всіх 4 сторін: " + this.a + " (кожна зі сторін)");
    console.log("Тупий кут: " + this.alpha + " градусів");
    console.log("Гострий кут: " + this.beta + " градусів");
    console.log("Сума довжин сторін: " + (4 * this.a));
    let h = this.a * Math.sin(this.beta * Math.PI / 180);
    console.log("Площа: " + (this.a * h));
  }
  get alpha() {
    return this._alpha;
  }
  set alpha(value) {
    if (value <= 0 || value >= 180) {
      console.log("Тупий кут повинен бути між 0 і 180 градусами.");
    } else {
      this._alpha = value;
    }
  }
  get beta() {
    return this._beta;
  }
  set beta(value) {
    if (value <= 0 || value >= 90) {
      console.log("Гострий кут повинен бути між 0 і 90 градусами.");
    } else {
      this._beta = value;
    }
  }
}
//1.2.20-1.2.21
class Parallelogram extends Rectangle{
  constructor(a, b, alpha, beta) {
    super(a, b);
    this.alpha = alpha; 
    this.beta = beta;  
  }
  static help() {
    console.log("Паралелограм — це чотирикутник, у якого протилежні сторони рівні.");
    console.log("У паралелограма два однакових кути: тупий і гострий.");
    console.log("Площа паралелограма обчислюється як добуток його сторони на висоту (a * h).");
    console.log("Периметр паралелограма обчислюється як сума всіх його сторін (2 * (a + b)).");
  }
  length() {
    console.log(`Сума довжин всіх сторін паралелограма: " ${2 * (this.a + this.b)}`);
  }
  square() {
    let h = this.b * Math.sin(this.alpha * Math.PI / 180);
    console.log("Площа паралелограма: " + (this.a * h));
  }
  info() {
    console.log("Паралелограм:");
    console.log("Довжини сторін: " + this.a + " і " + this.b);
    console.log("Тупий кут: " + this.alpha + " градусів");
    console.log("Гострий кут: " + this.beta + " градусів");
    console.log("Сума довжин сторін: " + (2 * (this.a + this.b)));
    let h = this.b * Math.sin(this.alpha * Math.PI / 180);
    console.log("Площа: " + (this.a * h));
  }
}
//1.2.23
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();
//1.2.24
let square = new Square(5);
let rectangle = new Rectangle(6, 4);
let rhombus = new Rhombus(6, 120, 60);
let parallelogram = new Parallelogram(6, 4, 120, 60);
square.info();
rectangle.info();
rhombus.info();
parallelogram.info();
//1.2.25
function Triangular(a = 3, b = 4, c = 5){
  return { a, b, c };
}
//1.2.26
const triangle1 = Triangular(6, 8, 10);  
const triangle2 = Triangular(7, 24, 25);
const triangle3 = Triangular(); 
console.log(triangle1);
console.log(triangle2);  
console.log(triangle3);
//1.2.27
function PiMultiplier(number){
  return function(){
    return Math.PI * number;
  }
}
//1.2.28
const firstFunc = PiMultiplier(2);
const secondFunc = PiMultiplier(2/3);
const thirdFunc = PiMultiplier(1/2);
console.log(firstFunc());
console.log(secondFunc());
console.log(thirdFunc());
//1.2.29
function Painter(color){
  return function(obj){
    if(obj.hasOwnProperty('type')){
      console.log(`Color : ${color} and type: ${obj.type}`)
    }
    else{
      console.log("No 'type' property occurred!");
    }
  }
}
//1.2.30
const PaintBlue = Painter('Blue');
const PaintRed = Painter('Red');
const PaintYellow = Painter('Yellow');
//1.2.31
const obj1 = { maxSpeed: 280, type: 'Truck', color: 'magenta', loadCapacity: 2400 };
const obj2 = { maxSpeed: 180, type: 'Sportcar', color: 'purple', avgSpeed: 90 };
const obj3 = { color: 'magenta', isCar: true };

console.log("Painting obj1:");
PaintBlue(obj1);  
PaintRed(obj1);   
PaintYellow(obj1); 

console.log("\nPainting obj2:");
PaintBlue(obj2);  
PaintRed(obj2);  
PaintYellow(obj2); 

console.log("\nPainting obj3:");
PaintBlue(obj3);  
PaintRed(obj3);  
PaintYellow(obj3); 