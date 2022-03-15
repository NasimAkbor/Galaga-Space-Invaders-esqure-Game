//code

let grid = document.querySelector('.gameBox');
let playerIndex = 12;

for (let i = 0; i < 380; i++) {
  let boxes = document.createElement('div');
  grid.append(boxes);
}

let allDivs = document.querySelectorAll('.gameBox div')
