//code

let grid = document.querySelector('.gameBox');
let playerIndex = 351;

for (let i = 0; i < 380; i++) {
  let boxes = document.createElement('div');
  grid.append(boxes);
}

let allDivs = document.querySelectorAll('.gameBox div');

allDivs[playerIndex].classList.add('playerUn');
let spots = [
  4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
]

for (let i = 0; i < spots.length; i++) {
  allDivs[spots[i]].classList.add('nondescriptLifeform');
}



