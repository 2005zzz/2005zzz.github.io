const questions = [
    {
        question: "你喜歡獨處嗎？",
        choices: ["不喜歡", "還好", "喜歡"],
        scores: [3, 2, 1],
    },
    {
        question: "對新事物的接受程度如何？",
        choices: ["非常開放", "有點開放", "不太開放"],
        scores: [3, 2, 1],
    },
    {
        question: "你覺得自己是一個外向的人嗎？",
        choices: ["偏外向", "我也不知道", "偏內向"],
        scores: [3, 2, 1],
    },
    {
        question: "覺得累了選擇最佳的充電方式是什麼？",
        choices: ["找朋友出門玩", "我都行", "在家休息"],
        scores: [3, 2, 1],
    }
    ,
    {
        question: "面對陌生人時，你會有什麼樣的反應？",
        choices: ["易開啟話題聊天","需一些時間適應","通常我不會主動"],
        scores: [3, 2, 1],
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const resultElement = document.getElementById("result");
const restartButton = document.getElementById("restart-btn");
const quizContainer = document.getElementById("quiz-container");

// 載入當前問題
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = ""; // 清空舊的選項
       
    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", () => selectChoice(index)); // 設定按鈕的點擊事件
        choicesElement.appendChild(button);
    });
}

// 處理選擇
function selectChoice(choiceIndex) {
    totalScore += questions[currentQuestionIndex].scores[choiceIndex]; // 計算分數
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // 載入下一題
    } else {
        showResult(); // 顯示結果
    }
}

// 根據分數返回描述
function getResultDescription(score) {
    if (score >= 12) {
        return "你比較外向，可能是e人喔！";
    } else if (score >= 9) {
        return "你是外向與內向之間的人，可e可i~";
    } else {
        return "你比較內向，大概率是i人喔！";
    }
}

// 顯示測驗結果
function showResult() {
    quizContainer.style.display = "none"; // 隱藏測驗容器
    resultContainer.style.display = "block"; // 顯示結果容器
    const description = getResultDescription(totalScore); // 獲取描述
    resultElement.textContent = `${description}`; // 顯示分數和描述
}

// 事件監聽
restartButton.addEventListener("click", () => {
    totalScore = 0; // 重置分數
    currentQuestionIndex = 0; // 重置問題索引
    quizContainer.style.display = "block"; // 顯示測驗容器
    resultContainer.style.display = "none"; // 隱藏結果容器
    loadQuestion(); // 載入第一題
});

// 初始化測驗
loadQuestion();
