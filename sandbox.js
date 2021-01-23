// DOM references

const timer = document.querySelector('.timer_text');
const lap = document.querySelector('.lap');
const stop = document.querySelector('.stop');
const list = document.querySelector('.list-container');

// Variables

let timer_minutes;
let timer_seconds;
let timer_milli_seconds;
let interval;
let lap_no = 0;

// functions

// Buttons

lap.addEventListener('click', () => {
    if(lap.firstElementChild.firstElementChild.innerHTML.trim() === 'Lap') {
        lap_time = displayTime();
        lap_no++;
        let found = false;
        list_children = list.querySelectorAll('.list-item');
        for(let i = 0 ; i < list_children.length ; i++) {
            const curr = list_children[i].firstElementChild;
            if(curr.innerHTML.trim() === '') {
                curr.innerHTML = `Lap ${lap_no}`;
                curr.nextElementSibling.innerHTML = lap_time;
                found = true;
                break;
            }
        }
        if(!found) {
            const html = `
                <li class="list-item">
                    <span class="lap_no">Lap ${lap_no}</span>
                    <span>${lap_time}</span>
                </li>
            `;
            list.innerHTML += html;
        }
    }
    else {
        init();
        stop.firstElementChild.firstElementChild.innerHTML = 'Start';
        stop.style.border = "8px double rgba(8, 251, 205, 0.7)";
        stop.firstElementChild.style.background = "rgba(8, 251, 205, 0.69)";
        stop.firstElementChild.firstElementChild.style.color = "rgba(8, 251, 205, 1)";
        lap.firstElementChild.firstElementChild.innerHTML = 'Lap';
        lap.style.border = "8px double #353535";
        lap.firstElementChild.style.background = "#353535";
    }
});

stop.addEventListener('click', ()=> {
    if(stop.firstElementChild.firstElementChild.innerHTML.trim() === 'Start') {
        interval = setInterval(() => {
            timer_milli_seconds = Math.floor(timer_milli_seconds + 1) % 100;
            timer_seconds += Math.floor((timer_milli_seconds + 1) / 100);
            timer_minutes += Math.floor((timer_seconds) / 60);
            timer_seconds = timer_seconds % 60;
            displayTime();
        },1);
        stop.firstElementChild.firstElementChild.innerHTML = 'Stop';
        stop.style.border = "8px double #351614";
        stop.firstElementChild.style.background = "#351614";
        stop.firstElementChild.firstElementChild.style.color = "rgba(255, 0, 0, 0.85)";   
    }
    else{
        clearInterval(interval);
        lap.firstElementChild.firstElementChild.innerHTML = 'Reset';
        lap.style.border = "8px double rgba(254, 253, 117 ,0.69)";
        lap.firstElementChild.style.background = "rgba(254, 253, 117 ,0.69)";
    }
});

// To display time

function displayTime() {
    timer.innerHTML = `${timer_minutes < 10 ? "0" + timer_minutes : timer_minutes}:${timer_seconds < 10 ? "0" + timer_seconds : timer_seconds}:${timer_milli_seconds < 10 ? "0" + timer_milli_seconds : timer_milli_seconds}`;
    return timer.innerHTML;
}

// Initalize the application

function init() {
    timer_minutes = 0;
    timer_seconds = 0;
    timer_milli_seconds = 0;
    lap_no = 0;
    displayTime();
    list.innerHTML =`
        <li class="list-item">
            <span class="lap_no"> </span>
            <span> </span>
        </li>
        <li class="list-item">
            <span class="lap_no"> </span>
            <span> </span>
        </li>
        <li class="list-item">
            <span class="lap_no"> </span>
            <span> </span>
        </li>
        <li class="list-item">
            <span class="lap_no"> </span>
            <span> </span>
        </li>
        <li class="list-item">
            <span class="lap_no"> </span>
            <span> </span>
        </li>
    `;
}

init();