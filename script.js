console.log("Welcome to Spotify");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let currentTimeDisplay = document.getElementById('currentTime');
let totalTimeDisplay = document.getElementById('totalDuration');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Christina Perri - A Thousand Years", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Until I Found You - Stephen Sanchez ft. Em Beihold", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Ellie Goulding - Love Me Like You Do", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Ruth B. - Dandelions", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Camila Cabello - Havana ft. Young Thug", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Billie Eilish - BLUE", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Fantasize - Ariana Grande", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Unholy - Sam Smith ft. Kim Petras", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "RAYE - Escapism ft. 070 Shake", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Shinchan", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];

// Update song items with details
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
    
    // Debugging: Check the current classes of masterPlay
    console.log('Current masterPlay classes:', masterPlay.classList);
});

// Listen to time update events
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    // Update current time display
    let currentMinutes = Math.floor(audioElement.currentTime / 60);
    let currentSeconds = Math.floor(audioElement.currentTime % 60);
    let totalMinutes = Math.floor(audioElement.duration / 60);
    let totalSeconds = Math.floor(audioElement.duration % 60);

    currentTimeDisplay.innerText = `${String(currentMinutes).padStart(2, '0')}:${String(currentSeconds).padStart(2, '0')}`;
    totalTimeDisplay.innerText = `${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`;
});

myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Previous and Next button functionality
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? songs.length - 1 : songIndex - 1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
