var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = []

var userClickedPattern = [];

var level = 0;

var started = false;


$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    $("#"+userChosenColour).fadeOut(100).fadeIn(100)

    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$("body").on("keydown", function(){
    if(!started){
        $("#level-title").text("Level "+level)

        nextSequence();
        started = true;

    }
});


function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber]; 
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100)

    playSound(randomChosenColour);

}

function playSound(name){
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass(pressed);
}

function checkAnswer(currentLevel){


    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if(gamePattern.length === userClickedPattern.length){

            setTimeout(function(){
                nextSequence()
                userClickedPattern = [];
            },1000);
        }
    }else{
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
            userClickedPattern = [];
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started  = false;
}