let leftButton = document.querySelector('#leftButton');
let rightButton = document.querySelector('#rightButton');
let upButton = document.querySelector('#upButton');
let downButton = document.querySelector('#downButton');
let theCube = document.querySelector('#cube');
let firstSide = document.querySelector('#firstSide');
let secondSide = document.querySelector('#secondSide');
let thirdSide = document.querySelector('#thirdSide');
let fourthSide = document.querySelector('#fourthSide');
let fifthSide = document.querySelector('#fifthSide');
let sixthSide = document.querySelector('#sixthSide');
let sidesArray = [
  null,
  firstSide,
  secondSide,
  thirdSide,
  fourthSide,
  fifthSide,
  sixthSide,
];
let leftRight = true;

function Cube() {
  this.front = 1;
  this.left = 2;
  this.right = 3;
  this.top = 4;
  this.bottom = 5;
  this.back = 6;
  //
  this.turnLeft = function () {
    [this.front, this.left, this.right, this.top, this.bottom, this.back] = [
      this.right,
      this.front,
      this.back,
      this.top,
      this.bottom,
      this.left,
    ];
  };
  this.turnRight = function () {
    [this.front, this.left, this.right, this.top, this.bottom, this.back] = [
      this.left,
      this.back,
      this.front,
      this.top,
      this.bottom,
      this.right,
    ];
  };
  this.turnUp = function () {
    [this.front, this.left, this.right, this.top, this.bottom, this.back] = [
      this.bottom,
      this.left,
      this.right,
      this.front,
      this.back,
      this.top,
    ];
  };
  this.turnDown = function () {
    [this.front, this.left, this.right, this.top, this.bottom, this.back] = [
      this.top,
      this.left,
      this.right,
      this.back,
      this.front,
      this.bottom,
    ];
  };
  //
  this.printCube = function () {
    console.log(`
      +-+
      |${this.top}|
    +-+-+-+
    |${this.left}|${this.front}|${this.right}|
    +-+-+-+
      |${this.bottom}|
      +-+
      |${this.back}|
      +-+
    
    `);
  };
}

let myCube = new Cube();
myCube.printCube();

leftButton.addEventListener('click', () => {
  buttonsOnOff();
  console.log('Left Clicked');
  //
  if (!leftRight) {
    leftRight = true;
    theCube.classList.toggle('updown');
    theCube.classList.toggle('leftright');
  }
  //
  theCube.insertBefore(
    sidesArray[myCube.right],
    theCube.children[0].nextSibling
  );
  sidesArray[myCube.front].classList.toggle('turningHorizontallyAway');
  sidesArray[myCube.front].classList.toggle('full');
  sidesArray[myCube.right].classList.toggle('shown');
  sidesArray[myCube.right].classList.toggle('turningHorizontallyToward');
  window.setTimeout(() => {
    sidesArray[myCube.front].classList.toggle('shown');
    sidesArray[myCube.right].classList.toggle('full');
    sidesArray[myCube.front].classList.toggle('turningHorizontallyAway');
    sidesArray[myCube.right].classList.toggle('turningHorizontallyToward');
    theCube.append(sidesArray[myCube.front]);
    //
    myCube.turnLeft();
    myCube.printCube();
    buttonsOnOff();
  }, 3000);
});

rightButton.addEventListener('click', () => {
  buttonsOnOff();
  console.log('Right Clicked');
  //
  if (!leftRight) {
    leftRight = true;
    theCube.classList.toggle('updown');
    theCube.classList.toggle('leftright');
  }
  //
  theCube.insertBefore(sidesArray[myCube.left], theCube.children[0]);
  sidesArray[myCube.front].classList.toggle('turningHorizontallyAway');
  sidesArray[myCube.front].classList.toggle('full');
  sidesArray[myCube.left].classList.toggle('shown');
  sidesArray[myCube.left].classList.toggle('turningHorizontallyToward');
  window.setTimeout(() => {
    sidesArray[myCube.front].classList.toggle('shown');
    sidesArray[myCube.left].classList.toggle('full');
    sidesArray[myCube.front].classList.toggle('turningHorizontallyAway');
    sidesArray[myCube.left].classList.toggle('turningHorizontallyToward');
    theCube.append(sidesArray[myCube.front]);
    myCube.turnRight();
    myCube.printCube();
    buttonsOnOff();
  }, 3000);
});

upButton.addEventListener('click', () => {
  buttonsOnOff();
  console.log('Up Clicked');
  //
  if (leftRight) {
    leftRight = false;
    theCube.classList.toggle('updown');
    theCube.classList.toggle('leftright');
  }
  //
  theCube.insertBefore(
    sidesArray[myCube.bottom],
    theCube.children[0].nextSibling
  );
  sidesArray[myCube.front].classList.toggle('turningVerticallyAway');
  sidesArray[myCube.front].classList.toggle('full');
  sidesArray[myCube.bottom].classList.toggle('shown');
  sidesArray[myCube.bottom].classList.toggle('turningVerticallyToward');
  window.setTimeout(() => {
    sidesArray[myCube.front].classList.toggle('shown');
    sidesArray[myCube.bottom].classList.toggle('full');
    sidesArray[myCube.front].classList.toggle('turningVerticallyAway');
    sidesArray[myCube.bottom].classList.toggle('turningVerticallyToward');
    theCube.append(sidesArray[myCube.front]);
    //
    myCube.turnUp();
    myCube.printCube();
    buttonsOnOff();
  }, 3000);
});

downButton.addEventListener('click', () => {
  buttonsOnOff();
  console.log('Down Clicked');
  //
  if (leftRight) {
    leftRight = false;
    theCube.classList.toggle('updown');
    theCube.classList.toggle('leftright');
  }
  //
  theCube.insertBefore(sidesArray[myCube.top], theCube.children[0]);
  sidesArray[myCube.front].classList.toggle('turningVerticallyAway');
  sidesArray[myCube.front].classList.toggle('full');
  sidesArray[myCube.top].classList.toggle('shown');
  sidesArray[myCube.top].classList.toggle('turningVerticallyToward');
  window.setTimeout(() => {
    sidesArray[myCube.front].classList.toggle('shown');
    sidesArray[myCube.top].classList.toggle('full');
    sidesArray[myCube.front].classList.toggle('turningVerticallyAway');
    sidesArray[myCube.top].classList.toggle('turningVerticallyToward');
    theCube.append(sidesArray[myCube.front]);
    //
    myCube.turnDown();
    myCube.printCube();
    buttonsOnOff();
  }, 3000);
});

function buttonsOnOff() {
  leftButton.classList.toggle('pointerEventsNone');
  rightButton.classList.toggle('pointerEventsNone');
  upButton.classList.toggle('pointerEventsNone');
  downButton.classList.toggle('pointerEventsNone');
}
