window.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const quizContainer = document.querySelector(".quiz-container");
  const nextButton = document.getElementById("next");
  nextButton.addEventListener("click", nextQuestion);


  const quizDataFase1 = [
    { question: "Qual é o maior planeta do Sistema Solar?", options: ["A) Terra", "B) Júpiter", "C) Saturno", "D) Netuno", "E) Vênus"], correct: 1 },
    { question: "Qual fase da Lua é completamente visível da Terra?", options: ["A) Nova", "B) Crescente", "C) Cheia", "D) Minguante", "E) Eclipse"], correct: 2 },
    { question: "O que é um satélite natural?", options: ["A) TV", "B) Internet", "C) Lua", "D) GPS", "E) Estrela"], correct: 2 },
    { question: "Qual movimento da Terra causa o dia e a noite?", options: ["A) Translação", "B) Rotação", "C) Revolução", "D) Inversão", "E) Inclinação"], correct: 1 },
    { question: "Qual instrumento é usado para observar planetas e estrelas?", options: ["A) Microscópio", "B) Binóculo", "C) Telescópio", "D) Bússola", "E) Termômetro"], correct: 2 },
    { question: "O que é o Sistema Solar?", options: ["A) Uma estrela", "B) Um planeta", "C) Um conjunto de planetas e outros corpos celestes", "D) Uma galáxia", "E) Um cometa"], correct: 2 },
    { question: "O que são cometas?", options: ["A) Planetas com cauda", "B) Estrelas em movimento", "C) Corpos rochosos no espaço", "D) Corpos gelados que orbitam o Sol", "E) Satélites artificiais"], correct: 3 },
    { question: "Qual é o nome da nossa galáxia?", options: ["A) Andrômeda", "B) Via Láctea", "C) Órion", "D) Cinturão de Kuiper", "E) Cassiopeia"], correct: 1 },
    { question: "Quantas luas tem o planeta Marte?", options: ["A) Nenhuma", "B) Uma", "C) Duas", "D) Três", "E) Quatro"], correct: 2 },
    { question: "Qual planeta é conhecido como o 'Planeta Vermelho'?", options: ["A) Vênus", "B) Marte", "C) Júpiter", "D) Saturno", "E) Urano"], correct: 1 }
  ];

  const quizDataFase2 = [
    { question: "O Sol é uma...", options: ["A) Estrela", "B) Galáxia", "C) Lua", "D) Nebulosa", "E) Constelação"], correct: 0 },
    { question: "Qual planeta tem os anéis mais visíveis?", options: ["A) Terra", "B) Vênus", "C) Saturno", "D) Marte", "E) Netuno"], correct: 2 },
    { question: "Qual planeta é o mais próximo do Sol?", options: ["A) Marte", "B) Terra", "C) Vênus", "D) Mercúrio", "E) Júpiter"], correct: 3 },
    { question: "Qual desses não é um planeta anão?", options: ["A) Ceres", "B) Plutão", "C) Éris", "D) Júpiter", "E) Haumea"], correct: 3 },
    { question: "Como se chama o caminho que um planeta faz ao redor do Sol?", options: ["A) Rotação", "B) Translação", "C) Órbita", "D) Periélio", "E) Eclipse"], correct: 2 },
    { question: "Qual é o maior satélite natural da Terra?", options: ["A) Phobos", "B) Europa", "C) Lua", "D) Ganimedes", "E) Titã"], correct: 2 },
    { question: "Qual é o 8º planeta a partir do Sol?", options: ["A) Urano", "B) Netuno", "C) Saturno", "D) Júpiter", "E) Plutão"], correct: 1 },
    { question: "Qual corpo celeste possui cauda visível ao se aproximar do Sol?", options: ["A) Asteroide", "B) Satélite", "C) Cometa", "D) Planeta", "E) Estrela"], correct: 2 },
    { question: "A Terra leva quanto tempo para dar uma volta completa em torno do Sol?", options: ["A) 24 horas", "B) 30 dias", "C) 6 meses", "D) 365 dias", "E) 12 horas"], correct: 3 },
    { question: "Qual dessas estrelas é a mais próxima da Terra?", options: ["A) Polaris", "B) Sirius", "C) Proxima Centauri", "D) Alfa Centauri", "E) Sol"], correct: 4 }
  ];

  let current = 0;
  let score = 0;
  let fase = 1;
  let quizData = quizDataFase1;

    startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
  });

  function loadQuestion() {
    const q = quizData[current];
    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const resultEl = document.getElementById("result");

    questionEl.textContent = q.question;
    answersEl.innerHTML = "";
    resultEl.textContent = "";

    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.classList.add("quiz-option");
      btn.onclick = () => checkAnswer(idx);
      answersEl.appendChild(btn);
    });

    const total = quizDataFase1.length + quizDataFase2.length;
    const currentQuestionNumber = fase === 1 ? current + 1 : current + quizDataFase1.length + 1;
    const progress = (currentQuestionNumber / total) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;
  }

  function checkAnswer(index) {
    const resultEl = document.getElementById("result");
    const buttons = document.querySelectorAll(".quiz-option");

    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === quizData[current].correct) {
        btn.classList.add("correct-answer");
      } else if (i === index) {
        btn.classList.add("wrong-answer");
      }
    });

    if (index === quizData[current].correct) {
      resultEl.textContent = "✅ Acertou! Muito bem!";
      resultEl.className = "result correct";
      score++;
    } else {
      resultEl.textContent = "❌ Ops! Resposta errada.";
      resultEl.className = "result wrong";
    }

    current++;

    if (current < quizData.length) {
      nextButton.style.display = "inline-block";
    } else {
      if (fase === 1) {
        fase = 2;
        quizData = quizDataFase2;
        current = 0;

        setTimeout(() => {
          document.getElementById("fase-titulo").textContent = "🚀 Fase 2 - Vamos continuar!";
          loadQuestion();
          nextButton.style.display = "inline-block";
        }, 1500);
      } else {
        setTimeout(() => {
          document.getElementById("quiz").innerHTML = `
            <h2>🎉 Parabéns! Você acertou ${score} de ${quizDataFase1.length + quizDataFase2.length} perguntas! Boa viagem cósmica Giulia! 🚀🔭💫</h2>
          `;
        }, 1000);
      }
    }
  }

  function nextQuestion() {
    nextButton.style.display = "none";
    loadQuestion();
  }
});

const musica = document.getElementById("musica-fundo");
const musicToggleBtn = document.getElementById("music-toggle");

musicToggleBtn.addEventListener("click", () => {
  if (musica.paused) {
    musica.play();  // Toca a música
    musicToggleBtn.textContent = "🔊 Música";  // Altera o texto do botão para "Música"
  } else {
    musica.pause();  // Pausa a música
    musicToggleBtn.textContent = "🔇 Música";  // Altera o texto do botão para "Música"
  }
});

