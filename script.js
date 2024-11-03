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
    },
    {
        question: "面對陌生人時，你會有什麼樣的反應？",
        choices: ["易開啟話題聊天", "需一些時間適應", "通常我不會主動"],
        scores: [3, 2, 1],
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;

$(document).ready(function () {
    const $question = $("#question");
    const $choices = $("#choices");
    const $nextButton = $("#next-btn");
    const $resultContainer = $("#result-container");
    const $result = $("#result");
    const $restartButton = $("#restart-btn");
    const $quizContainer = $("#quiz-container");

    // 新增返回上一題按鈕
    const $prevButton = $("<button>").text("返回上一題").css({
        backgroundColor: "white",
        color: "black",
        border: "1px solid black",
        padding: "10px",
        margin: "10px 0" // 上下間距
    }).hide(); // 初始隱藏

    // 載入當前問題
    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        $question.text(currentQuestion.question);
        $choices.empty(); // 清空舊的選項

        currentQuestion.choices.forEach((choice, index) => {
            const $button = $("<button>").text(choice);
            $button.on("click", function () {
                $choices.find("button").removeClass("selected");
                $(this).addClass("selected animate"); // 加上選擇效果
                selectChoice(index);
            });
            $choices.append($button);
        });

        // 滑動顯示問題
        $quizContainer.slideDown(); 

        // 根據當前問題顯示或隱藏返回按鈕
        $prevButton.toggle(currentQuestionIndex > 0);
    }

    // 處理選擇
    function selectChoice(choiceIndex) {
        totalScore += questions[currentQuestionIndex].scores[choiceIndex];
        currentQuestionIndex++;

        // 淡出當前問題
        $quizContainer.fadeOut(function () {
            if (currentQuestionIndex < questions.length) {
                loadQuestion(); // 載入下一題
            } else {
                showResult(); // 顯示結果
            }
        });
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
        const description = getResultDescription(totalScore);
        $result.text(description);

        $resultContainer.fadeIn();
        // 滾動至結果區域
        $("html, body").animate({
            scrollTop: $resultContainer.offset().top
        }, 1000); 
    }

    // 返回上一題
    $prevButton.on("click", function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            totalScore -= questions[currentQuestionIndex].scores.find((score, index) => {
                return $choices.children().eq(index).hasClass("selected");
            }) || 0; // 從總分中扣除選中的分數
            loadQuestion();
        }
    });

    // 重啟測驗
    $restartButton.on("click", function () {
        totalScore = 0;
        currentQuestionIndex = 0;
        $resultContainer.fadeOut(function () {
            loadQuestion(); // 載入第一題
        });
    });

    // 初始化測驗
    loadQuestion();

    // 加入返回上一題按鈕到選項區
    $choices.after($prevButton);

    // 按鈕點擊效果
    $(document).on("mousedown", "button", function() {
        $(this).addClass("clicked");
    }).on("mouseup", "button", function() {
        $(this).removeClass("clicked");
    });
});
