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

var item1 = new Item("The center of the Earth is very hot.", true, "According to <a href=\"https://www.scientificamerican.com/article/why-is-the-earths-core-so/\" target=\"_blank\">Scientific American</a>: \“There are three main sources of heat in the deep earth: (1) heat from when the planet formed and accreted, which has not yet been lost; (2) frictional heating, caused by denser core material sinking to the center of the planet; and (3) heat from the decay of radioactive elements.\”");
var item2 = new Item("The continents have been moving their location for millions of years and will continue to move.", true, "According to a report by <a href=\"https://learningenglish.voanews.com/a/earths-continents-and-ocean-floors-are-always-moving/1886773.html\" target=\"_blank\">VOA</a>, \“Scientists found that the surface of our planet is always in motion. Continents move about the Earth like huge ships at sea, floating on pieces of the Earth’s outer skin, or crust. New crust is created as melted rock pushes up from inside the planet. Old crust is destroyed as it moves toward the hot rock and melts.\”");
var item3 = new Item("The Sun goes around the Earth.", false, "The website <a href=\"https://sciencing.com/earth-rotates-around-sun-8501366.html\" target=\"_blank\">Sciencing</a> states that, \“The Earth actually revolves around, or orbits, the sun. One revolution around the sun takes the Earth about 365 days, or one year. Forces at work in the solar system keep the Earth, as well as the other planets, locked into predictable orbits around the sun.\”");
var item4 = new Item("All radioactivity is man-made.", false, "<a href=\"https://www.planete-energies.com/en/medias/close/radioactivity-natural-or-man-made-phenomenon\" target=\"_blank\">Planete-Energies</a> explains that, \“The decay of unstable atoms releases radiation, a phenomenon called radioactivity. As unstable atoms exist in all matter, we are surrounded by natural radiation. Radiation can also come from man-made sources, through military, medical or industrial applications.\”");
var item5 = new Item("Electrons are smaller than atoms.", true, "<a href=\"http://www.chem4kids.com/files/atom_structure.html\" target=\"_blank\">Chem4Kids</a> states that, \“Electrons are the smallest of the three particles that make up atoms. Electrons are found in shells or orbitals that surround the nucleus of an atom. Protons and neutrons are found in the nucleus. They group together in the center of the atom.\”");
var item6 = new Item("Lasers work by focusing sound waves.", false, "As the name—Light Amplification by Stimulated Emission of Radiation—suggests, lasers focus light waves.");
var item7 = new Item("The universe began with a huge explosion.", true, "According to <a href=\"https://www.livescience.com/32278-was-the-big-bang-really-an-explosion.html\" target=\"_blank\">Live Science</a>: \“The Big Bang is science’s best explanation for how the universe began. According to the theory, the universe started out much hotter and much denser than it is today, and expanded and cooled over time.\”");
var item8 = new Item("It is the father's gene that decides whether the baby is a boy or girl.", true, "<a href=\"https://genetics.thetech.org/ask-a-geneticist/which-parent-decides-whether-baby-will-be-boy-or-girl\" target=\"_blank\">The Tech</a> explains that, \“What we can say is that dad's sperm determines whether a baby will be a boy or a girl. About half of his sperm will make a boy and half a girl.\”");
var item9 = new Item("Antibiotics kill viruses as well as bacteria.", false, "\“Antibiotics cannot kill viruses because bacteria and viruses have different mechanisms and machinery to survive and replicate,\” says the website <a href=\"https://www.drugs.com/article/antibiotics-and-viruses.html\" target=\"_blank\">Drugs.com</a>.");
var item10 = new Item("Human beings, as we know them today, developed from earlier species of animals.", true, "The theory of evolution is the best known explanation today for the development of modern humans.");

var quiz = [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10];

// Initiates index.html with the introduction
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
        var line1 = "The <strong><a href=\"https://www.nsf.gov/statistics/2018/nsb20181/report/sections/science-and-technology-public-attitudes-and-understanding/public-knowledge-about-s-t#understanding-scientific-terms-and-concepts\" target=\"_blank\">National Science Foundation</a></strong> polls Americans every two years to see how the U.S. is doing in science and engineering.";
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

$(this).on("click", "#startbutton", function() {
    startQuiz();
});

// Generates the appropriate elements on the index.html page depending on page's purpose
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
    btn.attr("id", "startbutton");
    var p4 = $("<p>").attr("id", "citation");
    p4.html("This quiz was inspired by the article by <a href=\"https://www.businessinsider.com/science-questions-quiz-public-knowledge-education-2018-5\" target=\"_blank\">Mosher and Cheng (2018, May 27), \"Each year the government asks 10 simple questions to test the public's knowledge of science. Can you correctly answer them all?\"</a>");
    $("#stats").append(p1, p2, p3, d, btn, "<hr>", p4);
}

});