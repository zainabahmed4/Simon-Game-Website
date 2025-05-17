var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Detect keypress to start the game
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//Generate the next sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    //Display a random color to add to the sequence:
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//Detect button clicks
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    //Sound + Animation upon click
    playSound(userChosenColour);
    animatePress(userChosenColour);

    //Different animation if wrong click
    checkAnswer(userClickedPattern.length - 1);
});

//Check the user's answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence(); //If everything right, continue with the game
            }, 1000);
        }
    } else { //Wrong click
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver(); //Reset game
    }
}

//Play sound for the chosen button color
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.volume = 0.3; // Set volume to 50%
    audio.play();
}

//Animate button press using CSS class
function animatePress(currentColor) {
    var button = $("#" + currentColor);

    // Add a flash effect by toggling visibility
    button.fadeOut(100).fadeIn(100);

    // Add the pressed class for a color change effect
    button.addClass("pressed");
    setTimeout(function() {
        button.removeClass("pressed");
    }, 100);
}

//Resets the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}