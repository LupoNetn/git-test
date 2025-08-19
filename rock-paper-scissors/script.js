// Computer picks a choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

const computerChoice = getComputerChoice();
console.log(computerChoice);

//Human picks a choice
function getHumanChoice() {
  const humanChoice = prompt("What's your move?");
  return humanChoice;
}

const humanChoice = getHumanChoice();
console.log(humanChoice);

let humanScore = 0;
let computerScore = 0

function humanVsComputer(humanChoice, computerChoice) {
   
  if (humanChoice === computerChoice) {
    return `It's a tie! Both chose ${humanChoice}`;
  }

  if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++
    return `You win! ${humanChoice} beats ${computerChoice}`;
  } else {
    computerScore++
    return `Computer wins! ${computerChoice} beats ${humanChoice}`;
  }
}

for (let index = 0; index < 5; index++) {
   const gamePlay = humanVsComputer(humanChoice,computerChoice)
   console.log(gamePlay);
   console.log(`human score: ${humanScore}, computer score: ${computerScore}`)


    
}

// const gamePlay = humanVsComputer(humanChoice, computerChoice);
// console.log(gamePlay);
// console.log(`human score: ${humanScore}, computer score: ${computerScore}`)

