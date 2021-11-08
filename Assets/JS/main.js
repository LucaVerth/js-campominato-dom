const play = document.querySelector('#play');
play.addEventListener('click', function(){
  gameStart();
});


function gameStart() {
  const gameLvl = parseInt(document.getElementById('lvlSelect').value);
  const gameGrid = [100, 81, 49];

  let cellNum;
  let cellRow;
  switch (gameLvl) {
    case 1:
      cellNum = gameGrid[0];
      cellRow = 10;
      break;  
    case 2:
      cellNum = gameGrid[1];
      cellRow = 9;
      break;  
    case 3:
      cellNum = gameGrid[2];
      cellRow = 7;
      break;  
  }
  console.log(cellNum);
  console.log(cellRow);

  const bombsNumber = 16;
  const bombs = bombsGenerator();
  console.log(bombs);
  let tryNum = 0;
  const attemptNumber = [];
  const maxTryNumber = cellNum - bombsNumber;
  let msg = '';
  
  

  document.querySelector('.box').innerHTML = '';
  gridGenerator();
  
  function gridGenerator(){
    const grid = document.createElement('div');
    grid.className = 'grid';
    for (let i = 1; i < (cellNum + 1); i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.innerHTML = `<span>${i}</span>`;
      const cellSq = `calc(100% / ${cellRow})`;
      cell.style.width = cellSq;
      cell.style.height = cellSq;
      cell.addEventListener('click', clickEvent);
      grid.append(cell);
    }
    document.querySelector('.box').append(grid);
  }

  function clickEvent(event) {
    console.log('Clicked');
    const clickedCell = parseInt(event.target.innerText);

    if(bombs.includes(clickedCell)){
      gameOver();
    }else{
      if (!attemptNumber.includes(clickedCell)){
        tryNum++;
        attemptNumber.push(clickedCell);
        this.classList.add('clickable');
        if(tryNum === maxTryNumber){
          gameOver();
        }
      }
    }
  }

  function gameOver(){
    const allCells = document.getElementsByClassName('cell');
    for(let i=0; i<allCells.length; i++){
      if (bombs.includes(i + 1)){
        allCells[i].classList.add('bomb')
      }
      allCells[i].removeEventListener('click', clickEvent);
    }

    msg = `Hai perso! Hai fatto ${tryNum} tentativi`;

    const output = document.createElement('div');
    output.innerHTML = `<h5>${msg}</h5>`;
    document.querySelector('.box').append(output);
  }

  

  function bombsGenerator(){
    const bombs = [];
    while (bombs.length < bombsNumber) {
      const bomb = randomGeneratorInt(1, cellNum);
      if (!bombs.includes(bomb)) bombs.push(bomb);
    }
    return bombs;
  }

}

function randomGeneratorInt(min, max) {
  return Math.floor(Math.random () * (max - min + 1) + min);
}