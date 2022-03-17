//Code

let grid = document.querySelector('.gameBox');
let playerIndex = 351; //Starting position of player
let blasterIndex; //Spot where fired shot will move
let moveDownRight = true;
let moveDownLeft = true;

for (let i = 0; i < 380; i++) {
  let boxes = document.createElement('div');
  grid.append(boxes);
  //boxes.innerHTML = `${i}`;
}

let allDivs = document.querySelectorAll('.gameBox div');

allDivs[playerIndex].classList.add('playerUn');
let spots = [ //Positions within allDivs that I want the aliens to start at. 11x5.
  4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
  80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90
]
function makeEm() {
  for (let i = 0; i < spots.length; i++) {
    allDivs[spots[i]].classList.add('nondescriptLifeform');
  }
}

let leftSide = spots[0] % 19 === 0;
let rightSide = spots[10] % 19 === 18;
let dirCount = 1;

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 37 && playerIndex > 342) {
    allDivs[playerIndex].classList.remove('playerUn');
    playerIndex--;
    allDivs[playerIndex].classList.add('playerUn');
  } else if (e.keyCode === 39 && playerIndex < 360) {
    allDivs[playerIndex].classList.remove('playerUn');
    playerIndex++;
    allDivs[playerIndex].classList.add('playerUn');
  }
})

// function moveBaddies() {
//   //console.log(spots[0]);
//   while (allDivs[0] != 0) {
//     if (allDivs[0] % 19 != 0) {
//       for (let i = 0; i < spots.length; i++) {
//         spots[i]--;
//       }
//     }
//   }
// }

//setInterval(moveBaddies, 1000);

function moveBaddies() {
  makeEm();

  if (spots[10] % 19 === 18 && moveDownRight) {
    for (let i = 0; i < spots.length; i++) {
      allDivs[spots[i]].classList.remove('nondescriptLifeform');
      spots[i] += 20;
      dirCount = 2;
      makeEm();
      moveDownRight = false;
    }
  }

  if (spots[0] % 19 === 0 && moveDownLeft) {
    for (let i = 0; i < spots.length; i++) {
      allDivs[spots[i]].classList.remove('nondescriptLifeform');
      spots[i] += 18;
      makeEm();
      moveDownLeft = false;
      dirCount = 1;
    }
  }

  for (let i = 0; i < spots.length; i++) {
    allDivs[spots[i]].classList.remove('nondescriptLifeform');
    if (dirCount === 1) {
      spots[i]++;
      makeEm();
    }
    if (dirCount === 2) {
      spots[i]--;
      makeEm();
    }
    if (spots[9] % 19 === 17) {
      moveDownLeft = true;
    }
    if (spots[0] % 19 === 1) {
      moveDownRight = true;
    }
  }
}

setInterval(moveBaddies, 500);
