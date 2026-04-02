//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
(() => {
  const questionsElement = document.getElementById("questions");
  const submitBtn = document.getElementById("submit");
  const scoreElement = document.getElementById("score");

  // Load saved answers (sessionStorage)
  let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

  // Load saved score (localStorage)
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreElement.textContent = `Your score is ${savedScore} out of 5.`;
  }

  function renderQuestions() {
    questionsElement.innerHTML = "";

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const div = document.createElement("div");

      const questionText = document.createElement("p");
      questionText.textContent = q.question;
      div.appendChild(questionText);

      for (let j = 0; j < q.choices.length; j++) {
        const choice = q.choices[j];

        const input = document.createElement("input");
        input.type = "radio";
        input.name = `question-${i}`;
        input.value = choice;

        // Restore checked state
        if (userAnswers[i] === choice) {
          input.checked = true;
        }

        // Save on change
        input.addEventListener("change", () => {
          userAnswers[i] = choice;
          sessionStorage.setItem("progress", JSON.stringify(userAnswers));
        });

        const label = document.createTextNode(choice);

        div.appendChild(input);
        div.appendChild(label);
      }

      questionsElement.appendChild(div);
    }
  }

  // Submit logic
  submitBtn.addEventListener("click", () => {
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].answer) {
        score++;
      }
    }

    scoreElement.textContent = `Your score is ${score} out of 5.`;

    // Save score to localStorage
    localStorage.setItem("score", score);
  });

  renderQuestions();
})();
