const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById("finalScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () =>{
    saveScoreBtn.disabled = !username.value;
    console.log(username.value);
});

saveHighScore = e => {
    e.preventDefault();

    const score ={
        score: mostRecentScore,
        name: username.value
    };
    // Create and put all the scores into the array
    highScores.push(score);
    // Put b before a in the array, if b is higher than a 
    highScores.sort((a,b) => b.score - a.score);
    // Remove al the scores that are out of the top 5
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
    console.log(highScores);
};