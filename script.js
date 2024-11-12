var timeBegan = null;
var timeStopped = null;
var stoppedDuration = 0;
var startInterval = null;
var flag = false;

const timerDisplay = document.getElementById("timer-display");
const startStopButton = document.getElementById("start-stop-button");
const resetButton = document.getElementById("reset-button");
const clearButton = document.getElementById("clearData");
const recordList = document.getElementById("record-list");

startStopButton.addEventListener("click", function () {
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

resetButton.addEventListener("click", resetTimer);
clearButton.addEventListener("click", clearRecords);

function startTimer() {
  if (timeBegan === null) timeBegan = new Date();
  if (timeStopped !== null) stoppedDuration += new Date() - timeStopped;
  startInterval = setInterval(clockRunning, 10);

  // Display the start time as a new record item
  const startTime = timeBegan.toLocaleTimeString();
  displayStartRecord(startTime);
}

function stopTimer() {
  timeStopped = new Date();
  clearInterval(startInterval);

  const startTime = timeBegan.toLocaleTimeString();
  const stopTime = timeStopped.toLocaleTimeString();
  const duration = timerDisplay.textContent;

  const date = new Date().toLocaleDateString();

  // Store in localStorage by date
  let records = JSON.parse(localStorage.getItem("timerRecords")) || {};
  if (!records[date]) records[date] = [];
  records[date].push({ startTime, stopTime, duration });
  localStorage.setItem("timerRecords", JSON.stringify(records));

  displayStopRecord(stopTime, duration); // Display stop time and duration
}

function clockRunning() {
  const currentTime = new Date();
  const timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);

  const hours = timeElapsed.getUTCHours();
  const minutes = timeElapsed.getUTCMinutes();
  const seconds = timeElapsed.getUTCSeconds();

  timerDisplay.innerHTML =
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
}

function displayStartRecord(startTime) {
  // Create a new record item for each start time
  const recordItem = document.createElement("div");
  recordItem.className = "record-item";
  recordItem.innerHTML = `<strong>Start:</strong> ${startTime}`;
  recordList.appendChild(recordItem);

  // Temporarily save the record item as the last record to update with stop time and duration
  recordList.lastRecord = recordItem;
}

function displayStopRecord(stopTime, duration) {
  // Update the last record with stop time and duration
  const lastRecord = recordList.lastRecord;
  if (lastRecord) {
    lastRecord.innerHTML += ` &nbsp; <strong>Stop:</strong> ${stopTime} &nbsp; <strong>Duration:</strong> ${duration}`;
  }
}

function resetTimer() {
  clearInterval(startInterval);
  timeBegan = null;
  timeStopped = null;
  stoppedDuration = 0;
  flag = false;
  timerDisplay.textContent = "00:00:00";
  startStopButton.textContent = "Start";
}

function clearRecords() {
  localStorage.removeItem("timerRecords");
  recordList.innerHTML = "";
}

// Load records from localStorage on page load
window.onload = function () {
  displayStoredRecords();
};

function displayStoredRecords() {
  recordList.innerHTML = "";
  const records = JSON.parse(localStorage.getItem("timerRecords")) || {};

  for (const date in records) {
    const dateHeader = document.createElement("h3");
    dateHeader.className = "record-date";
    dateHeader.textContent = date;
    recordList.appendChild(dateHeader);

    records[date].forEach((record) => {
      const recordItem = document.createElement("div");
      recordItem.className = "record-item";
      recordItem.innerHTML = `
        <strong>Start:</strong> ${record.startTime} &nbsp; 
        <strong>Stop:</strong> ${record.stopTime} &nbsp; 
        <strong>Duration:</strong> ${record.duration}
      `;
      recordList.appendChild(recordItem);
    });
  }
}
