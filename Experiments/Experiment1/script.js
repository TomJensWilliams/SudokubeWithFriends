let leftButton = document.querySelector('#leftButton');
let rightButton = document.querySelector('#rightButton');
let leftSquare = document.querySelector('#leftSquare');
let rightSquare = document.querySelector('#rightSquare');

leftButton.addEventListener('click', () => {
  console.log('Left Clicked');
  leftSquare.classList.remove('turnedAway');
  leftSquare.classList.add('turnedToward');
  rightSquare.classList.remove('turnedToward');
  rightSquare.classList.add('turnedAway');
});

rightButton.addEventListener('click', () => {
  console.log('Right Clicked');
  leftSquare.classList.remove('turnedToward');
  leftSquare.classList.add('turnedAway');
  rightSquare.classList.remove('turnedAway');
  rightSquare.classList.add('turnedToward');
});
