const songs = [
    { title: "Shadmehr Aghili-Hesse khoobie", src: "src/audio/Shadmehr Aghili - Hesse Khoobie.mp3", cover: "src/image/shadmehr.jfif" },
    { title: "Mohsen Yeganeh - Behet Ghol Midam", src: "src/audio/Mohsen Yeganeh - Behet Ghol Midam.mp3", cover: "src/image/mohsen.jpg" },
    { title: "Alireza Ghorbani-Parvaze Ghoha", src: "src/audio/Alireza Ghorbani-Parvaze Ghoha.mp3.mp3", cover: "src/image/Alireza.jpg" },
    { title: "Arman Garshasbi - Az To Goftam", src: "src/audio/Arman Garshasbi - Az To Goftam 2(320).mp3", cover: "src/image/arman.jfif" }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const cover = document.getElementById("coverImage");
const title = document.getElementById("songTitle");
const coverSection = document.getElementById("coverSection");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const volumeControl = document.getElementById("volumeControl");
const playlist = document.getElementById("playlist");

let songIndex = 0;
let isPlaying = false;

/* ******** Load Song ******** */
function loadSong(index) {
    // const song = songs[index];
    title.textContent = songs[index].title;
    cover.src = songs[index].cover;
    audio.src = songs[index].src;

    highlightActiveSong();
}

/* ******** Play / Pause ******** */
function togglePlay() {
    isPlaying ? pauseSong() : playSong();
}

function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.textContent = "⏸";
    coverSection.classList.add("playing");
}

function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.textContent = "▶";
    coverSection.classList.remove("playing");
}

/* ******** Next / Prev ******** */
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    // 

    loadSong(songIndex);
    playSong();
}
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    // 
    loadSong(songIndex);
    playSong();
}

/* ******** Progress & Time ******** */
audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100 || 0;
    progressBar.value = progress;

    const format = t => {
        const m = Math.floor(t / 60), s = Math.floor(t % 60);
        return `${m}:${s < 10 ? "0" + s : s}`;
    };
    currentTimeEl.textContent = (formataudio.currentTime);
    totalTimeEl.textContent = format(audio.duration || 0);
});

progressBar.addEventListener("input", e => {
    audio.currentTime = (e.target.value / 100) * audio.duration;
});

/* ******** Volume ******** */
volumeControl.addEventListener("input", e => {
    audio.volume = e.target.value;
});

/* ******** Playlist ******** */
function buildPlaylist() {
    playlist.innerHTML = "";
    songs.forEach((song, index) => {
        const item = document.createElement("div");
        item.className = "song-item";
        item.innerHTML = `<span>${song.title}</span><span>▶</span>`;
        item.addEventListener("click", () => {
            songIndex = index;
            loadSong(songIndex);
            playSong();
        });
        playlist.appendChild(item);
    });
}

function highlightActiveSong() {
    document.querySelectorAll(".song-item").forEach((el, idx) => {
        el.classList.toggle("active", idx === songIndex);
    });
}

/* ******** Event Listeners ******** */
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audio.addEventListener("ended", nextSong);

/* ******** Initialize ******** */
buildPlaylist();
loadSong(songIndex);