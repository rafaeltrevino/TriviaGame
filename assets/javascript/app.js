$(document).ready(function() {

var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;
// Tracks the index of each question item
var questionCounter = 0;
var timer = 30;

// Creates an object for each quiz item
function Item(question, answer, explanation) {
    this.question = question;
    this.answer = answer;
    this.explanation = explanation;
}

var item1 = new Item("The center of the Earth is very hot.", true, "Scientists estimate that Earth's core is more than 10,000 degrees Fahrenheit — nearly the temperature found on the surface of the Sun.");
var item2 = new Item("The continents have been moving their location for millions of years and will continue to move.", true, "Plate tectonics is the science of how continent-size slabs of crust form Earth's outermost layer and constantly move and regenerate. Most move less than a couple inches per year, according to Pacific Northwest Seismic Network, though the process may be essential to making a rocky planet habitable to life.");
var item3 = new Item("The Sun goes around the Earth.", false, "We know this is true on a basic level because we can see the position of the stars change over time. The space age has also required us to intimately understand this fact — and acknowledge our puny existence in the cosmos viastunning pictures of Earth from afar.");
var item4 = new Item("All radioactivity is man-made.", false, "Natural radiation is everywhere, especially in space. Small amounts are present in soil, water, and vegetation. Even a portion of the potassium found in bananas is radioactive.");
var item5 = new Item("Electrons are smaller than atoms.", true, "Electrons are much less massive than the protons and neutrons that make up the cores of atoms.");
var item6 = new Item("Lasers work by focusing sound waves.", false, "Lasers concentrate light waves, not sound waves.");
var item7 = new Item("The universe began with a huge explosion.", true, "This is the best theory that we have as to how the universe began: a point of infinite density at the beginning of the universe began to expand and created the galaxies, planets, and stars that we see — still in motion — today. People call this \"the Big Bang.\"");
var item8 = new Item("It is the father's gene that decides whether the baby is a boy or girl.", true, "Sex is determined by two chromosomes, and sperm carries one of them: either an X (female) chromosome or a Y (male) chromosome. Whichever sperm makes it to the egg first to join an X chromosome in the mother's egg determines the baby's sex. (XX is a girl and XY is a boy, anatomically speaking.)");
var item9 = new Item("Antibiotics kill viruses as well as bacteria.", false, "Antibiotics only kill bacteria, not viruses.");
var item10 = new Item("Human beings, as we know them today, developed from earlier species of animals.", true, "Fossils in the ground, genetic studies, and other research over the past century has shown again and again that evolution not only gave rise to species like humans, but will continue to shape the forms of our descendants.");

var quiz = [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10];

// Populates index.html with the introduction
function intro() {

    setTimeout(function() {
        $("#logo").empty();
        var i = $("<img>");
        i.addClass("uk-align-center");
        i.attr("src", "./assets/images/science.png");
        i.attr("alt", "Science logo");
        $("#logo").append(i);
        $("#logo").addClass("flip animated");
    }, 2000);

    setTimeout(function() {
        var line1 = "According to <a href=\"https://www.businessinsider.com/science-questions-quiz-public-knowledge-education-2018-5\">Business Insider</a>, the <strong>National Science Foundation</strong> polls Americans every two years to see how the U.S. is doing in science and engineering.";
        var d = $("<div>");
        d.addClass("uk-width-1-3@s uk-align-center uk-animation-slide-right");
        d.attr("id", "intro");
        d.html(line1);
        $("#maingrid").append(d);
    }, 0)

    setTimeout(function() {
        var line2 = "Take this short quiz to see how you compare to the national average.";
        var d = $("<div>").addClass("uk-animation-slide-right introP");
        d.html(line2);
        $("#intro").append("<br>").append("<br>");
        $("#intro").append(d);
    }, 500);

    setTimeout(function() {
        var line3 = "There are ten questions. Good luck!";
        var d = $("<div>").addClass("uk-animation-slide-right introP");
        d.html(line3);
        $("#intro").append("<br>");
        $("#intro").append(d);
    }, 1000);
    
    setTimeout(function() {
        var btn = $("<button>").text("Start");
        btn.addClass("uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom");
        btn.attr("id", "startbutton");
        var d = $("<div>").addClass("uk-animation-slide-right introP");
        d.append(btn);
        $("#intro").append("<br>");
        $("#intro").append(d);
    }, 1500);
};

intro();

$(this).on("click", "#startbutton", function() {
    startQuiz();
});

function startQuiz() {
    correctCounter = 0;
    incorrectCounter = 0;
    unansweredCounter = 0;
    questionCounter = 0;
    $("#maingrid").empty()
    $("#logo").removeClass("flip animated");
    startTimer("#timer");
    nextQuestion();
}

// Populates index.html with the appropriate elements depending on page's purpose
function createQuizLayout(layout) {
    switch (layout) {
        case "question":
            var quizDiv = $("<div>").addClass("uk-width-1-3@s uk-align-center").attr("id", "quizDiv");
            var tDiv = $("<div>").addClass("timer").attr("id", "timer").html("Time remaining: " + "<strong>30</strong>");
            var infoDiv = $("<div>").addClass("info").attr("id", "question");
            var aDiv = $("<div>").addClass("useranswer uk-align-center").attr("id", "useranswer");
            var btnTrue = $("<input>").attr({type: "button", name: "trueButton", value: true}).addClass("uk-button uk-button-default uk-width-1-2 btnanswer").text("True");
            var btnFalse = $("<input>").attr({type: "button", name: "falseButton", value: false}).addClass("uk-button uk-button-default uk-width-1-2 btnanswer").text("False");
            aDiv.append(btnTrue, "<span>", btnFalse);
            quizDiv.append(tDiv, "<hr>");
            quizDiv.append(infoDiv);
            quizDiv.append(aDiv);
            // Data-status keeps track of page type in order to alternate appropriately
            $("#maingrid").append(quizDiv).attr("data-status", "question");
            break;
        case "answer":
            var quizDiv = $("<div>").addClass("uk-width-1-3@s uk-align-center").attr("id", "quizDiv");
            var tDiv = $("<div>").addClass("timer").attr("id", "timer").html("Time remaining: " + "<strong>10</strong>");
            var infoDiv = $("<div>").addClass("info").attr("id", "info");
            var explainDiv = $("<div>").addClass("explanation").attr("id", "explanation");
            quizDiv.append(tDiv, "<hr>");
            quizDiv.append(infoDiv);
            quizDiv.append(explainDiv);
            $("#maingrid").append(quizDiv).attr("data-status", "answer");
            break;
        case "stats":
            var quizDiv = $("<div>").addClass("uk-width-1-3@s uk-align-center").attr("id", "quizDiv");
            var infoDiv = $("<div>").addClass("info").attr("id", "info");
            var statsDiv = $("<div>").addClass("stats").attr("id", "stats");
            quizDiv.append(tDiv, "<hr>");
            quizDiv.append(infoDiv);
            quizDiv.append(statsDiv);
            $("#maingrid").append(quizDiv).attr("data-status", "stats");
            break;
        default: 
            $("#maingrid").empty()
    }
}

function startTimer(timerDiv) {
    var intervalID;
    var page = $("#maingrid").attr("data-status");
    timer--;
    if (timer <= 0) {
        if (page == "question") {
            showAnswer("timeout");
        } else if (page == "answer") {
            nextQuestion();
        } 
    } else {
        $(timerDiv).html("Time remaining: " + "<strong>" + timer + "</strong>");
    }
    intervalID = setTimeout(function() {startTimer(timerDiv)}, 1000);
}

function nextQuestion() {
    $("#maingrid").empty();
    $("#logo").removeClass("rotateIn hinge rollOut animated fast");
    $("#maingrid").attr("data-status", "question");
    createQuizLayout("question");
    timer = 30;
    if (questionCounter == 10) {
        showStats();
    } else {
        var q = quiz[questionCounter].question;
        $("#question").text(q);
    } 
}

function showAnswer(userAnswer) {
    $("#maingrid").empty();
    $("#maingrid").attr("data-status", "answer");
    createQuizLayout("answer");
    timer = 10;
    var correctAnswer = quiz[questionCounter].answer;
    if (userAnswer == correctAnswer) {
        // Do if correct answer
        correctCounter++;
        var info = "<strong>Correct!</strong>";
        $("#logo").addClass("rotateIn animated fast");
    } else if (userAnswer == "timeout") {
        // Do if unanswered
        unansweredCounter++;
        var info = "<strong>Time's up</strong>";
        $("#logo").addClass("rollOut animated");
    } else if (userAnswer != correctAnswer) {
        // Do if incorrect answer
        incorrectCounter++;
        var info = "<strong>Nice try, but incorrect.</strong>";
        $("#logo").addClass("hinge animated");
    }
    $("#info").html(info);
    $("#explanation").html(quiz[questionCounter].explanation);
    questionCounter++;
}

$(this).on("click", ".btnanswer", function() {
    // Converts the button value to a format readable by the showAnswer function
    var userAnswer;
    if (this.value == "true") {
        userAnswer = true;
    } else if (this.value == "false") {
        userAnswer = false;
    }
    showAnswer(userAnswer);
});

function showStats() {
    $("#maingrid").empty();
    $("#maingrid").attr("data-status", "stats");
    createQuizLayout("stats");
    $("#info").html("<strong>Your stats</strong>");
    var percent = (correctCounter / 10) * 100;
    var compare;
    var p1 = $("<p>");
    p1.html("<strong>" + correctCounter +"</strong> - Correct answers");
    var p2 = $("<p>");
    p2.html("<strong>" + incorrectCounter +"</strong> - Incorrect answers");
    var p3 = $("<p>");
    p3.html("<strong>" + unansweredCounter +"</strong> - Unanswered");
    var d = $("<div>").addClass("info").attr("id", "info");
    if (percent > 60) {
        compare = "greater than";
    } else if (percent < 60) {
        compare = "less than";
    } else if (percent == 60) {
        compare = "the same as";
    }
    d.html("Your percentage correct is <strong>" + percent + "%</strong>, which is " + compare + " the U.S. average of 60%.");
    var btn = $("<button>").text("Take quiz again");
    btn.addClass("uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom");
    btn.attr("id", "startoverbutton");
    var p4 = $("<p>").attr("id", "citation");
    // Contact Business Insider for permission to include this project in my portfolio?
    p4.html("This quiz was created for educational purposes. The questions and answers have been reproduced from the article by <a href=\"https://www.businessinsider.com/science-questions-quiz-public-knowledge-education-2018-5\">Mosher and Cheng (2018, May 27), \"Each year the government asks 10 simple questions to test the public's knowledge of science. Can you correctly answer them all?\"</a>");
    $("#stats").append(p1, p2, p3, d, btn, "<hr>", p4);
}

$(this).on("click", "#startoverbutton", function() {
    startQuiz();
});

});