const minutesInput = document.getElementById("minutes-input");
const startBtn = document.getElementById("start-btn");
const countdownDisplay = document.getElementById("countdown-display");
const message = document.getElementById("message");

let countdownInterval;

startBtn.addEventListener('click', () => {
   const minutes = parseInt(minutesInput.value.trim());

   if (isNaN(minutes) || minutes <= 0) {
      message.textContent = 'Please enter a valid number of minutes.';
      return;
   }

   message.textContent = '';

   const endTime = Date.now() + minutes * 60 * 1000;

   startCountdown(endTime)
});

function startCountdown(endTime) {
   clearInterval(countdownInterval);

   countdownInterval = setInterval(() => {
      const now = Date.now();
      const remainingTime = endTime - now;

      if (remainingTime <= 0) {
         clearInterval(countdownInterval);
         countdownDisplay.textContent = '00:00:00';
         message.textContent = "Time's up!";
         return;
      }

      updateDisplay(remainingTime);
   }, 1000)
}

function updateDisplay(remainingTime) {
   const totalSeconds = Math.floor(remainingTime / 1000);
   const hours = Math.floor(totalSeconds / 3600);
   const minutes = Math.floor((totalSeconds % 3600) / 60);
   const seconds = totalSeconds % 60;

   countdownDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
   return number < 10 ? '0' + number : number
}