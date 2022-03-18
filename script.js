//Code

let grid = document.querySelector('.gameBox');
let playerIndex = 351; //Starting position of player
let blasterIndex = playerIndex - 19; // Spot where fired shot will move
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

let deadBaddies = [];
let leftSide = spots[0] % 19 === 0;
let rightSide = spots[10] % 19 === 18;
let dirCount = 1;
document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft' && playerIndex > 342) {
    allDivs[playerIndex].classList.remove('playerUn');
    playerIndex--;
    allDivs[playerIndex].classList.add('playerUn');
  } else if (e.code === 'ArrowRight' && playerIndex < 360) {
    allDivs[playerIndex].classList.remove('playerUn');
    playerIndex++;
    allDivs[playerIndex].classList.add('playerUn');
  } else if (e.code === 'Space' || e.code === 'ArrowUp') {
    shootEmDown();
  }
})

function moveBaddies() {
  makeEm();

  //Move down when right edge hit
  if (spots[10] % 19 === 18 && moveDownRight) {
    for (let i = 0; i < spots.length; i++) {
      allDivs[spots[i]].classList.remove('nondescriptLifeform');
      spots[i] += 20;
      dirCount = 2;
      makeEm();
      moveDownRight = false;
    }
  }

  //move down when left edge hit
  if (spots[0] % 19 === 0 && moveDownLeft) {
    for (let i = 0; i < spots.length; i++) {
      allDivs[spots[i]].classList.remove('nondescriptLifeform');
      spots[i] += 18;
      makeEm();
      moveDownLeft = false;
      dirCount = 1;
    }
  }

  //determines movement direction of baddies
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

  //Game Over if player hit
  if (allDivs[playerIndex].classList.contains('playerUn' && 'nondescriptLifeform')) {
    console.log('Game Over');
    clearInterval(runGame);
  }
}

function shootEmDown() {
  let laserId = setInterval(moveBlaster, 500)
  let currentBlaster = playerIndex;
  function moveBlaster() {
    allDivs[currentBlaster].classList.remove('pewpew');
    currentBlaster -= 19;
    allDivs[currentBlaster].classList.add('pewpew');

    if (allDivs[currentBlaster].classList.contains('pewpew' && 'nondescriptLifeform')) {
      allDivs[currentBlaster].classList.add('death');
      allDivs[currentBlaster].classList.remove('pewpew');
      allDivs[currentBlaster].classList.remove('nondescriptLifeform');
    }
  }
}

let runGame = setInterval(moveBaddies, 500);
