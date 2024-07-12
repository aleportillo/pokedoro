let isPomodoroActive = false;
const sessionMinutes = 25;
const shortBreakMinutes = 5;
const longBreakMinutes = 15;

let activeTimer = sessionMinutes;
let activeSession = sessionMinutes;
let counterSessions = 0;
let seconds = 0;


const playButton = document.querySelector('#btn-play');
const restartButton = document.querySelector('#btn-restart');
const timerHTML = document.querySelector('.pokemon__pomodoro-time');
const timerOverlay = document.querySelector('.pokemon__pomodoro-time--overlay');

const playButtonIcon = playButton.children[0];

const formatTime = (time) => { return time.toString().padStart(2, '0') };

playButton.addEventListener('click', () => {
    console.log('here')
    if (isPomodoroActive) pauseSession();
    else startSession();
    
    isPomodoroActive = !isPomodoroActive;
   
});

restartButton.addEventListener('click', () => clean());

const pauseSession = () => {
    clearInterval(timer);
    playButtonIcon.src ="./assets/icons/play.svg";
}

const startSession = () => {
    
    playButtonIcon.src ="./assets/icons/pause.svg";
    
    const updateTimer = () => {
        if (activeTimer === 0 && seconds === 0) {
            clearInterval(timer);
            completeSession();
        } else if (seconds === 0) {
            activeTimer--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateUI();
    };
    
    const updateUI = () => {
        const height = (activeTimer * 100) / activeSession;
        console.log('height', height);
        timerOverlay.style.height = `${height}%`;
    
        const formattedTime = `${formatTime(activeTimer)}:${formatTime(seconds)}`;
        timerHTML.innerHTML = formattedTime;
        timerOverlay.innerHTML = formattedTime;
    };
    
    timer = setInterval(updateTimer, 1000);
}

const completeSession = async () => {
    await createCard();
    if(activeSession === 25) {
        counterSessions++;
        activeSession = counterSessions === 4 ? longBreakMinutes : shortBreakMinutes;
    } else {
        activeSession = sessionMinutes;
    }
    
    if(counterSessions === 4) counterSessions = 0;
    
    clean();
    await getPokemonData();
}

const createCard = () =>{
    
    const img = document.createElement('img');
    img.src =`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${globalPokemon.number}.png`;
    
    img.src = globalPokemon.gif;
    
    const imgContainer = document.createElement('span');
    imgContainer.classList.add('history__item-icon');
    imgContainer.appendChild(img);
    
    const label = document.createElement('span');
    label.innerHTML= activeSession === 25 ? 'Complete: Pomodoro' : activeSession === 5 ? 'Complete: Short Break' : 'Complete: Long Break';
    label.classList.add('history__item-text');
    
    const card = document.createElement('div');
    card.classList.add('history__item');
    card.appendChild(imgContainer);
    card.appendChild(label);
    card.style.setProperty('--card-color', globalPokemon.color);
    
    const container = document.querySelector('.history');
    container.insertBefore(card, container.firstChild);
}

const clean = () => {
    isPomodoroActive = false;
    activeTimer = activeSession;
    seconds = 0;
    clearInterval(timer);
    
    playButtonIcon.src ="./assets/icons/play.svg";
    timerOverlay.style.height = `100%`;
    
    const formattedTime = `${formatTime(activeTimer)}:${formatTime(seconds)}`;
    timerHTML.innerHTML = formattedTime;
    timerOverlay.innerHTML = formattedTime;
}