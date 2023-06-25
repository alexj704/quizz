const responses = ["c", "a", "b", "a", "c"];
const emojis = ["✔️", "✨", "👀", "😭", "👎"];

const form = document.querySelector("form");
const questions = document.querySelectorAll(".question-container");
const resultText = document.querySelector(".result");
let userResponses = [];
let score = 0;

function getResponses() {
  userResponses = [];
  const formData = new FormData(form);
  for (let pair of formData.entries()) {
    userResponses.push([pair[1]]);
  }
}

function getScore() {
  score = 0;
  for (let i = 0; i < userResponses.length; i++) {
    if (userResponses[i][0] === responses[i]) {
      score++;
      userResponses[i].push(+1);
    } else {
      userResponses[i].push(-1);
    }
  }
  displayResponse();
  resultText.textContent = `Votre score est de ${score}`;
}

function displayResponse() {
  for (let i = 0; i < userResponses.length; i++) {
    if (userResponses[i][1] === 1) {
      questions[i].classList.add("good");
    } else if (userResponses[i][1] === -1) {
      questions[i].classList.add("bad");
    }
  }
}

form.addEventListener("change", (event) => {
  const question = event.target.closest(".question-container");
  question.classList.remove("good", "bad");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getResponses();
  getScore();
});
