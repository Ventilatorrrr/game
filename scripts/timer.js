function startTimer(id, duration)
{
    const timerEl = document.getElementById(id);
    let time = duration;

    const interval = setInterval(() => {
        const minutes = String(Math.floor(time / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        timerEl.textContent = `${minutes}:${seconds}`;

        if (--time < 0) clearInterval(interval);
    }, 1000);
}