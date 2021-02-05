setTimeout(() => {


    const btnStart = document.getElementById('start');
    const btnReset = document.getElementById('reset');
    const msg1 = "You all will have to distribute 4 letters among yourself. Your time starts in 3.. 2.. 1..";
    const msg2 = "Hunt them down!";
    const msg = document.getElementById('msg');
    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 10;
    const ALERT_THRESHOLD = 5;

    const COLOR_CODES = {
        info: {
            color: "green"
        },
        warning: {
            color: "orange",
            threshold: WARNING_THRESHOLD
        },
        alert: {
            color: "red",
            threshold: ALERT_THRESHOLD
        }
    };


    let TIME_LIMIT = 3;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;


    const l1 = document.getElementById('lt1');

    const l2 = document.getElementById('lt2');
    const l3 = document.getElementById('lt3');
    const l4 = document.getElementById('lt4');

    btnStart.addEventListener('click', (event) => {

        if (event.target.value === 'start') {

            setAlphas();

            startTimer();
            event.target.value = 'disabled';
            btnStart.textContent = 'Stop';
            btnStart.style.visibility = 'hidden';
        }
        else if (event.target.value === 'stop') {

            onTimesUp();
            alert(`Score: ${timeLeft}`);
            reset();

        }
        else {

            console.log(event.target.value);
        }

    });

    btnReset.addEventListener('click', (event) => {

        reset();

    });




    document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
        timeLeft
    )}</span>
</div>
`;

    function setAlphas() {

        l1.textContent = getRandomAlpha();
        l2.textContent = getRandomAlpha();
        l3.textContent = getRandomAlpha();
        l4.textContent = getRandomAlpha();

    }


    function reset() {

        onTimesUp();
        l1.textContent = '?';
        l2.textContent = '?';
        l3.textContent = '?';
        l4.textContent = '?';

        timeLeft = 3;
        TIME_LIMIT = 3;
        timePassed = 0;
        document.getElementById("base-timer-label").innerHTML = formatTime(
            timeLeft
        );
        setCircleDasharray();
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(COLOR_CODES.warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(COLOR_CODES.alert.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(COLOR_CODES.info.color);

        btnStart.style.visibility = 'visible';
        btnStart.value = 'start';
        btnStart.textContent = 'Start';
        msg.textContent = msg1;
    }

    function getRandomAlpha() {

        let characters = 'AFGHEDUVWOPKLMNIJBRSTC';
        let charactersLength = characters.length;
        return characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    function onTimesUp() {
        clearInterval(timerInterval);
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            document.getElementById("base-timer-label").innerHTML = formatTime(
                timeLeft
            );
            setCircleDasharray();
            setRemainingPathColor(timeLeft);

            if (timeLeft === 0) {

                if (btnStart.value === 'disabled') {
                    TIME_LIMIT = 120;
                    timeLeft = TIME_LIMIT;
                    timePassed = 0;
                    btnStart.value = 'stop';
                    btnStart.style.visibility = 'visible';
                    msg.textContent = msg2;
                    document
                        .getElementById("base-timer-path-remaining")
                        .classList.remove(COLOR_CODES.warning.color);
                    document
                        .getElementById("base-timer-path-remaining")
                        .classList.remove(COLOR_CODES.alert.color);
                    document
                        .getElementById("base-timer-path-remaining")
                        .classList.add(COLOR_CODES.info.color);
                }
                else {
                    onTimesUp();
                }
            }
        }, 1000);
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    function setRemainingPathColor(timeLeft) {
        const { alert, warning, info } = COLOR_CODES;
        if (timeLeft <= alert.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(warning.color);
        }
    }

    function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    }


}, 0);