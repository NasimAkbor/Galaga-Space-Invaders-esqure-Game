//Code

//Elements needed
let grid = document.querySelector('.gameBox');
let start = document.querySelector('#start-screen');
let startBtn = document.querySelector('.start');
let end = document.querySelector('#game-over');
let win = document.querySelector('#winner');
let result = document.querySelector('.scoreNum');
let score = parseInt(result.innerText);
let playerIndex = 351; //Starting position of player
let blasterIndex = playerIndex - 19; // Spot where fired shot will start
let moveDownRight = true;
let moveDownLeft = true;
let deadBaddies = [];

//Fill game play area with divs
for (let i = 0; i < 380; i++) {
  let boxes = document.createElement('div');
  grid.append(boxes);
  //boxes.innerHTML = `${i}`;
}

let allDivs = document.querySelectorAll('.gameBox div');

let spots = [ //Positions within allDivs that I want the aliens to start at. 11x5.
  4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
  80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90
]

//Function to draw in the aliens.
function makeEm() {
  for (let i = 0; i < spots.length; i++) {
    if (!deadBaddies.includes(i))
      allDivs[spots[i]].classList.add('nondescriptLifeform');
  }
  allDivs[playerIndex].classList.add('playerUn');
}

let dirCount; //Determines direction of alien movement.
let rand = Math.random() < 0.5 ? dirCount = 1 : dirCount = 2;

//Controls for Player One. 
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
    e.preventDefault();
    shootEmDown();
  }
})

//Function that determines alien movement.
function moveBaddies() {
  makeEm();

  //Move down when right edge hit
  if (spots[10] % 19 === 18 && moveDownRight) {
    for (let i = 0; i < spots.length; i++) {
      allDivs[spots[i]].classList.remove('nondescriptLifeform');
      spots[i] += 20;
      dirCount = 2;
      checkBottomEnd();
      makeEm();
      moveDownRight = false;
    }
  }

  //move down when left edge hit
  if (spots[0] % 19 === 0 && moveDownLeft) {
    for (let i = 0; i < spots.length; i++) {
      allDivs[spots[i]].classList.remove('nondescriptLifeform');
      spots[i] += 18;
      checkBottomEnd();
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

  //Game Over if player hit by alien.
  if (allDivs[playerIndex].classList.contains('playerUn' && 'nondescriptLifeform')) {
    clearInterval(runGame);
    grid.style.display = 'none';
    end.style.display = 'flex';
  }
  //Game Over if aliens hit bottom of screen.
  function checkBottomEnd() {
    for (let i = 0; i < spots.length; i++) {
      if ((spots[i] + 19) > 380 && allDivs[spots[i]].classList.contains('nondescriptLifeform')) {
        clearInterval(runGame);
        grid.style.display = 'none';
        end.style.display = 'flex';
      }
    }
  }

  //Win screen if all aliens removed.
  if (deadBaddies.length === spots.length) {
    grid.style.display = 'none';
    win.style.display = 'flex';
    clearInterval(runGame);
  }

}

//function for creating and moving the blaster.
function shootEmDown() {

  let shootingInterval = setInterval(moveBlaster, 300)
  let currentBlaster = playerIndex;
  function moveBlaster() {
    allDivs[currentBlaster].classList.remove('pewpew');
    currentBlaster -= 19;
    allDivs[currentBlaster].classList.add('pewpew');
    if ((currentBlaster - 19) < 0) { //Removes blaster after it hits the top
      clearInterval(shootingInterval);
      setTimeout(() => allDivs[currentBlaster].classList.remove('pewpew'), 50)
    }
    //When blaster hits an alien it removes the alien&blaster
    if (allDivs[currentBlaster].classList.contains('pewpew' && 'nondescriptLifeform')) {
      allDivs[currentBlaster].classList.add('death');
      allDivs[currentBlaster].classList.remove('pewpew');
      allDivs[currentBlaster].classList.remove('nondescriptLifeform');
      score += 10; //10 pts per alien killed
      result.innerText = score;

      clearInterval(shootingInterval); //Stops blaster from continuing.
      setTimeout(() => allDivs[currentBlaster].classList.remove('death'), 100) //Removes death mark.

      let newDeath = spots.indexOf(currentBlaster);
      deadBaddies.push(newDeath);
    }
  }
}

function startGame() {
  start.style.display = 'none';
  grid.style.display = 'flex';
  runGame = setInterval(moveBaddies, 250);
}

startBtn.addEventListener('click', startGame);
