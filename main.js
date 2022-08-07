const questionBank = {
  100: [],
  200: [],
  400: [],
  600: [],
  800: [],
};
let activeQuestion = null;
let userAnswer = "";
let userScore = 0;
let lastQuestionAnswer = null;
let activeSquare = null;

function addSquares() {
  for (var i = 1; i < 26; i++) {
    if (i === 1 || i === 6 || i === 11 || i === 16 || i === 21) {
      document.getElementsByClassName("container-fluid")[0].innerHTML +=
        "<div class='square'>$100</div>";
    }
    if (i == 2 || i == 7 || i == 12 || i == 17 || i == 22) {
      document.getElementsByClassName("container-fluid")[0].innerHTML +=
        "<div class='square'>$200</div>";
    }
    if (i == 3 || i == 8 || i == 13 || i == 18 || i == 23) {
      document.getElementsByClassName("container-fluid")[0].innerHTML +=
        "<div class='square'>$400</div>";
    }
    if (i == 4 || i == 9 || i == 14 || i == 19 || i == 24) {
      document.getElementsByClassName("container-fluid")[0].innerHTML +=
        "<div class='square'>$600</div>";
    }
    if (i == 5 || i == 10 || i == 15 || i == 20 || i == 25) {
      document.getElementsByClassName("container-fluid")[0].innerHTML +=
        "<div class='square'>$800</div>";
    }
  }
}
addSquares();

function addClickEventListener() {
  var squares = document.getElementsByClassName("square");
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function () {
      getQuestion(this.innerHTML);
    });
    squares[i].id = `square${i}`;
    document
      .getElementById("answer-submit")
      .addEventListener("click", checkAnswer);
  }
}
addClickEventListener();
function showScore() {
  document.getElementById("user-score").innerHTML = `Score : ${userScore}`;
}
showScore();
async function getData() {
  let res = await fetch("jeopardy.json");
  let data = await res.json();
  return data;
}

const data = getData().then((data) => {
  [...data].forEach((element) => {
    if (element.value === "$100") {
      element.value = 100;
      questionBank[100].push(element);
    }
    if (element.value === "$200") {
      element.value = 200;
      questionBank[200].push(element);
    }
    if (element.value === "$400") {
      element.value = 400;
      questionBank[400].push(element);
    }
    if (element.value === "$600") {
      element.value = 600;
      questionBank[600].push(element);
    }
    if (element.value === "$800") {
      element.value = 800;
      questionBank[800].push(element);
    }
  });
});

function getQuestion(value) {
  if (value === "$100") {
    getRandomQuestion(questionBank[100]);
    activeSquare = this.event.target.id;
    document.getElementById(activeSquare).style.backgroundColor = "yellow";
    document.getElementById(activeSquare).style.color = "black";
    document.getElementById("answer").innerHTML = "";
  }
  if (value === "$200") {
    getRandomQuestion(questionBank[200]);
    activeSquare = this.event.target.id;
    document.getElementById(activeSquare).style.backgroundColor = "yellow";
    document.getElementById(activeSquare).style.color = "black";
    document.getElementById("answer").innerHTML = "";
  }
  if (value === "$400") {
    getRandomQuestion(questionBank[400]);
    activeSquare = this.event.target.id;
    document.getElementById(activeSquare).style.backgroundColor = "yellow";
    document.getElementById(activeSquare).style.color = "black";
    document.getElementById("answer").innerHTML = "";
  }
  if (value === "$600") {
    getRandomQuestion(questionBank[600]);
    activeSquare = this.event.target.id;
    document.getElementById(activeSquare).style.backgroundColor = "yellow";
    document.getElementById(activeSquare).style.color = "black";
    document.getElementById("answer").innerHTML = "";
  }
  if (value === "$800") {
    getRandomQuestion(questionBank[800]);
    activeSquare = this.event.target.id;
    document.getElementById(activeSquare).style.backgroundColor = "yellow";
    document.getElementById(activeSquare).style.color = "black";
    document.getElementById("answer").innerHTML = "";
  }
}

function getRandomQuestion(array) {
  if (activeQuestion === null) {
    const random = Math.floor(Math.random() * array.length);
    const question = array[random];
    activeQuestion = question;
  }
  document.getElementById(
    "question-category"
  ).innerHTML = `CATEGORY: ${activeQuestion.category}`;
  document.getElementById("question").innerHTML = activeQuestion.question;
}
function checkAnswer(event) {
  event.preventDefault();
  userAnswer = document.getElementById("answer-input").value;
  document.getElementById("answer-input").value = "";
  if (userAnswer.toLowerCase() === activeQuestion.answer.toLowerCase()) {
    document.getElementById("question-category").innerHTML = "";
    document.getElementById("question").innerHTML =
      "Please select another question";
    document
      .getElementById(activeSquare)
      .removeEventListener("click", getQuestion);
    document.getElementById(activeSquare).style.backgroundColor = "grey";
    document.getElementById(activeSquare).style.color = "green";
    document.getElementById("answer").innerHTML = "Correct!";
    userScore += activeQuestion.value;
    activeQuestion = null;
    document.getElementById("user-score").innerHTML = `Score: ${userScore}`;
  } else {
    document
      .getElementById(activeSquare)
      .removeEventListener("click", getQuestion);
    document.getElementById(activeSquare).style.backgroundColor = "grey";
    document.getElementById(activeSquare).style.color = "red";
    userScore -= activeQuestion.value;
    document.getElementById("question-category").innerHTML = "";
    document.getElementById("question").innerHTML =
      "Please select another question";
    lastQuestionAnswer = activeQuestion.answer;
    activeQuestion = null;
    document.getElementById("answer").innerHTML = `Incorrect!
    The correct answer is ${lastQuestionAnswer}`;
    document.getElementById("user-score").innerHTML = `Score: ${userScore}`;
  }
}
