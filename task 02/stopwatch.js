let startTime;
let running = false;
let laps = [];
let lapId = 1;
let intervalId; // To store the interval ID for clearing later

function startStop() {
  const startStopBtn = document.getElementById("startStop");

  if (!running) {
    startStopBtn.textContent = "Stop";
    startStopBtn.style.backgroundColor = "red";
    if (!startTime) {
      startTime = new Date().getTime();
    }
    intervalId = setInterval(updateDisplay, 100); // Update the display every 100 milliseconds
    running = true;
  } else {
    startStopBtn.textContent = "Start";
    startStopBtn.style.backgroundColor = "";
    clearInterval(intervalId); // Clear the interval when stopping
    running = false;
  }
}


function recordLap() {
  if (running) {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);

    const lapList = document.getElementById("laps");
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapId}: ${formattedTime}`;
    lapList.appendChild(lapItem);

    laps.push(formattedTime);
    lapId++;
  }
}

function reset() {
  const startStopBtn = document.getElementById("startStop");
  startStopBtn.textContent = "Start";
  startStopBtn.style.backgroundColor = "";
  running = false;
  laps = [];
  lapId = 1;
  startTime = 0; // Reset startTime to 0
  updateDisplay();
  clearLaps();
}


function updateDisplay() {
  const currentTime = running ? new Date().getTime() : startTime;
  const elapsedTime = currentTime - startTime;
  const formattedTime = formatTime(elapsedTime);
  document.getElementById("display").textContent = formattedTime;
}

function clearLaps() {
  const lapList = document.getElementById("laps");
  lapList.innerHTML = "";
}

function formatTime(time) {
  const date = new Date(time);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const milliseconds = Math.floor(time % 1000);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}
