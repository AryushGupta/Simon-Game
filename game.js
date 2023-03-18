const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStart = true;

$(document).on('keypress', function (e) {
    if (e && gameStart) {
        $("h1").text(`Level ${level}`);
        nextSequence();
        gameStart = false;
    }
});

$(".btn").click(() => {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

const checkAnswer = (currentLevel) => {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            level += 1;
            $("h1").text(`Level ${level}`);
            setTimeout(nextSequence, 1000);
        }
    } else {
        $("h1").text(`Game Over, Press Any Key to Restart`);
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200)
        playSound("wrong");
        startOver();
    }
}

const nextSequence = () => {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColours = buttonColours[randomNumber];
    gamePattern.push(randomChosenColours);
    $(`#${randomChosenColours}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColours);
}

const playSound = (colourName) => {
    $(`#${colourName}`).fadeIn(100).fadeOut(100).fadeIn(100);
    let audio = new Audio("sounds/" + colourName + ".mp3");
    audio.play();
}

const animatePress = (currentColour) => {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}


// Restart Game
const startOver = () => {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStart = true;
}