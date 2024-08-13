let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

function formatTime(time) {
    const date = new Date(time);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = Math.floor(date.getUTCMilliseconds() / 100);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${milliseconds}`;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startPause() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 100);
        startPauseBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(timerInterval);
        startPauseBtn.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = '00:00:00.0';
    startPauseBtn.textContent = 'Start';
    running = false;
    laps.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = formatTime(elapsedTime);
        const li = document.createElement('li');
        li.textContent = lapTime;
        laps.appendChild(li);
    }
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
