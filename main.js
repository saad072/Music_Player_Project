let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration"); 
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    img: "assets/images/1.jpg",
    name: "Unknown",
    artist: "-",
    music: "assets/music/1.mp3",
  },
  {
    img: "assets/images/2.jpg",
    name: "Everybody Knows",
    artist: "Leonard Cohen",
    music: "assets/music/2.mp3",
  },
  {
    img: "assets/images/3.jpg",
    name: "Extreme Ways",
    artist: "Moby",
    music: "assets/music/3.mp3",
  },
  {
    img: "assets/images/4.jpg",
    name: "Butterflies",
    artist: "Sia",
    music: "assets/music/4.mp3",
  },
  {
    img: "assets/images/5.jpg",
    name: "Haggard Final Victory",
    artist: "Unknown",
    music: "assets/music/5.mp3",
  },
  {
    img: "assets/images/6.jpg",
    name: "Genius",
    artist: "LSD",
    music: "assets/music/6.mp3",
  },
  {
    img: "assets/images/7.jpg",
    name: "The Comeback Kid",
    artist: "Lindi Ortega",
    music: "assets/music/7.mp3",
  },
  {
    img: "assets/images/8.jpg",
    name: "Overdose",
    artist: "Grandson",
    music: "assets/music/8.mp3",
  },
  {
    img: "assets/images/9.jpg",
    name: "Human",
    artist: "Rag'nBone Man",
    music: "assets/music/9.mp3",
  },
  {
    img: "assets/images/10.jpg",
    name: "Solitude",
    artist: "Lucafrancini",
    music: "assets/music/10.mp3",
  },
  {
    img: "assets/images/11.jpg",
    name: "Ethereal Vistas",
    artist: "Denys Brodovskyi",
    music: "assets/music/11.mp3",
  },
  {
    img: "assets/images/12.jpg",
    name: "NightFall Future",
    artist: "SoulProd Music",
    music: "assets/music/12.mp3",
  },
  {
    img: "assets/images/13.jpg",
    name: "Titanium",
    artist: "AlisiaBeats",
    music: "assets/music/13.mp3",
  },
  {
    img: "assets/images/14.jpg",
    name: "Movement",
    artist: "Hozier",
    music: "assets/music/14.mp3",
  },
  {
    img: "assets/images/15.jpg",
    name: "Unforgettable",
    artist: "French Montana",
    music: "assets/music/15.mp3",
  },
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;

  now_playing.textContent =
    "Playing music " + (track_index + 1) + " of " + music_list.length;
  updateTimer = setInterval(setUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekTo = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekTo;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );

    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      (curr_track.duration - durationMinutes * 60)
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
