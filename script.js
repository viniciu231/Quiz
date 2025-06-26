const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result-container");
const scoreEl = document.getElementById("score");
const trophyContainer = document.getElementById("trophy-container");
const gallery = document.getElementById("gallery");
const questionImage = document.getElementById("question-image");

const cuteMessages = [
  "Você me conhece melhor que ninguém 😍",
  "Tô sorrindo só de lembrar de você 💘",
  "Esse quiz é pouco pro tanto que eu te amo 💖"
];

const questions = [
  {
    question: "Quem é mais ciumento?",
    correct: "Ana Clara",
    escapeAna: false,
    img: "imgs/pergunta1.jpg"
  },
  {
    question: "Quem manda mais mensagem de bom dia?",
    correct: "Vinicius",
    escapeAna: false,
    img: "imgs/pergunta2.jpg"
  },
  {
    question: "Quem ama mais?",
    correct: "Vinicius",
    escapeAna: true,
    img: "imgs/pergunta3.jpg"
  }
];

let currentQuestion = 0;
let score = 0;

function moveAnaButtonRandomly(button) {
  const parent = button.parentElement;
  const maxX = parent.clientWidth * 0.8;
  const maxY = parent.clientHeight * 0.8;
  const randomX = Math.floor(Math.random() * maxX * 2 - maxX);
  const randomY = Math.floor(Math.random() * maxY * 2 - maxY);
  button.style.transform = `translate(${randomX}px, ${randomY}px) scale(1.08)`;
  button.style.transition = 'transform 0.5s ease-in-out';
}

function resetAnaButtonPosition(button) {
  button.style.transform = 'translate(0, 0)';
  button.style.transition = '';
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  if (q.img) {
    questionImage.src = q.img;
    questionImage.style.display = "block";
  } else {
    questionImage.style.display = "none";
  }

  if (currentQuestion > 0) {
    const msg = document.createElement("p");
    msg.textContent = cuteMessages[currentQuestion - 1] || "";
    msg.classList.add("fade-text");
    answersEl.appendChild(msg);
  }

  const anaBtn = document.createElement("button");
  anaBtn.textContent = "Ana Clara";
  anaBtn.classList.add("ana-clara");
  resetAnaButtonPosition(anaBtn);

  const viniciusBtn = document.createElement("button");
  viniciusBtn.textContent = "Vinicius";

  if (q.escapeAna) {
    anaBtn.addEventListener("click", () => {
      moveAnaButtonRandomly(anaBtn);
    });
  } else {
    anaBtn.addEventListener("click", () => {
      selectAnswer(anaBtn);
    });
  }

  viniciusBtn.addEventListener("click", () => {
    selectAnswer(viniciusBtn);
  });

  answersEl.appendChild(anaBtn);
  answersEl.appendChild(viniciusBtn);

  nextButton.style.display = "none";
}

function selectAnswer(selectedBtn) {
  const q = questions[currentQuestion];
  if (answersEl.classList.contains("answered")) return;
  answersEl.classList.add("answered");

  Array.from(answersEl.querySelectorAll("button")).forEach(button => {
    button.disabled = true;
    if (button.textContent === q.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("wrong");
    }
  });

  if (selectedBtn.textContent === q.correct) {
    score++;
  }

  nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    answersEl.classList.remove("answered");
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.querySelector(".quiz-container").style.display = "none";
  resultContainer.classList.add("visible");

  scoreEl.innerHTML = `<h2>Você acertou ${score} de ${questions.length}!</h2>`;

  if (score === questions.length) {
    trophyContainer.style.display = "block";
    gallery.style.display = "block";
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  } else {
    trophyContainer.style.display = "none";
    gallery.style.display = "block";
  }
  document.getElementById("love-letter").style.display = "block";

}

showQuestion();

// Slideshow automático
const slideshowImage = document.getElementById("slideshow-image");
const slideshowImages = [
  "imgs/foto1.jpg", "imgs/foto2.jpg", "imgs/foto3.jpg",
  "imgs/foto4.jpg", "imgs/foto5.jpg", "imgs/foto6.jpg", "imgs/foto7.jpg"
];
let currentSlideIndex = 0;
setInterval(() => {
  currentSlideIndex = (currentSlideIndex + 1) % slideshowImages.length;
  slideshowImage.src = slideshowImages[currentSlideIndex];
}, 3000);

// Música
document.getElementById("music-toggle").addEventListener("click", () => {
  const music = document.getElementById("bg-music");
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
});
