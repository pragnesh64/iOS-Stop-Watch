var timeBegan = null;
var timeStopped = null;
var stoppedDuration = 0;
var startInterval = null;
var flag = false;

const timeContainer = document.getElementsByClassName("timer-container")[0];
timeContainer.addEventListener("click", function() {
  if (!flag) {
    startTimer();
    flag = true;
  } else {
    stopTimer();
    flag = false;
  }
});

function startTimer() {
  if (timeBegan === null)
    timeBegan = new Date();

  if (timeStopped !== null)
    stoppedDuration += (new Date() - timeStopped);

  startInterval = setInterval(clockRunning, 10);
}

function stopTimer() {
  timeStopped = new Date();
  clearInterval(startInterval);
}

function clockRunning() {
  var currentTime = new Date();
  var timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);

  var minutes = timeElapsed.getUTCMinutes();
  var seconds = timeElapsed.getUTCSeconds();
  var milliseconds = timeElapsed.getUTCMilliseconds();

  milliseconds = Math.floor(milliseconds / 10);

  document.getElementById("timer-display").innerHTML =
    (minutes < 10 ? '0' + minutes : minutes) + ":" +
    (seconds < 10 ? '0' + seconds : seconds) + ":" +
    (milliseconds < 10 ? '0' + milliseconds : milliseconds);
}
