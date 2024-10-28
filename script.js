var timeBegan = null;
var timeStopped = null;
var stoppedDuration = 0;
var startInterval = null;
var flag = false;

const timerDisplay = document.getElementById("timer-display");
const startStopButton = document.getElementById("start-stop-button");
const clearButton = document.getElementById("clearData");
const recordList = document.getElementById("record-list");

startStopButton.addEventListener("click", function() {
  if (!flag) {
    startTimer();
    startStopButton.textContent = "Stop";
    flag = true;
  } else {
    stopTimer();
    startStopButton.textContent = "Start";
    flag = false;
  }
});

clearButton.addEventListener("click", clearRecords);

function startTimer() {
  if (timeBegan === null) timeBegan = new Date();

  if (timeStopped !== null) stoppedDuration += (new Date() - timeStopped);

  startInterval = setInterval(clockRunning, 10);
}

function stopTimer() {
  timeStopped = new Date();
  clearInterval(startInterval);

  const startTime = timeBegan.toLocaleTimeString();
  const stopTime = timeStopped.toLocaleTimeString();
  const duration = timerDisplay.textContent;

  // Store record in localStorage
  let records = JSON.parse(localStorage.getItem("timerRecords")) || [];
  records.push({ startTime, stopTime, duration });
  localStorage.setItem("timerRecords", JSON.stringify(records));

  // Display record on screen
  displayRecords();
}

function clockRunning() {
  var currentTime = new Date();
  var timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);

  var minutes = timeElapsed.getUTCMinutes();
  var seconds = timeElapsed.getUTCSeconds();
  var milliseconds = timeElapsed.getUTCMilliseconds();

  milliseconds = Math.floor(milliseconds / 10);

  timerDisplay.innerHTML =
    (minutes < 10 ? '0' + minutes : minutes) + ":" +
    (seconds < 10 ? '0' + seconds : seconds) + ":" +
    (milliseconds < 10 ? '0' + milliseconds : milliseconds);
}

function displayRecords() {
  recordList.innerHTML = ""; // Clear existing records

  let records = JSON.parse(localStorage.getItem("timerRecords")) || [];
  records.forEach(record => {
    const listItem = document.createElement("li");
    listItem.textContent = `Start: ${record.startTime}, Stop: ${record.stopTime}, Duration: ${record.duration}`;
    recordList.appendChild(listItem);
  });
}

// Clear records from localStorage and the display
function clearRecords() {
  localStorage.removeItem("timerRecords"); // Clear localStorage
  recordList.innerHTML = ""; // Clear displayed records
}

// Load records on page load
window.onload = displayRecords;
