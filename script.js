
console.log('Hello World');

let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'images/maxresdefault.jpg',
        name : 'Gonna Act Like That',
        artist : 'Tyrese Gibson',
        music : 'music/Tyrese - How You Gonna Act Like That (Video).mp3'
    },
    {
        img : 'images/Mario-let_me_love_you.jpg',
        name : 'let_me_love_you',
        artist : 'Mario',
        music : 'music/Mario - Let Me Love You (Official Video).mp3'
    },
    {
        img : 'images/Still.jpg',
        name : 'Still',
        artist : 'Tamia',
        music : 'music/Tamia - Still 2004.mp3'
    },
    {
        img : 'images/a92bf27c423644c9ef77a00b155796ff.jpg',
        name : 'Ocean Eyes',
        artist : 'Billie Eilish',
        music : 'music/Billie Eilish - Ocean Eyes (Official Music Video).mp3'
    },
    {
        img : 'images/2e671371-62fc-4ed7-8e02-2caaa3e4c952_mq.jpg',
        name : 'Made to love you ',
        artist : 'Gerail Levert',
        music : 'music/Gerald Levert - Made To Love Ya.mp3'
    },
    {
        img : 'images/download.jpg',
        name : 'Love On The Brain  ',
        artist : 'Rihanna',
        music : 'music/Love On The Brain.mp3'
    },
    {
        img : 'images/ab67616d0000b27337ecfc76967b5ac1c90cf70c.jpg',
        name : 'Goodness Of God - Hillsong  ',
        artist : 'Bethel Music',
        music : 'music/Goodness Of God (Lyrics) _ Bethel Music.mp3'
    },
    {
        img : 'images/uMp7JWpe_400x400.jpg',
        name : 'Grace To Grace - Hillsong ',
        artist : 'Taya Smith ft Bethel Music',
        music : 'music/Grace To Grace - Hillsong Worship.mp3'
    },
    {
        img : 'images/548777--12c3f380-9641-418a-96a5-acfc60c504cb-poster.jpg',
        name : 'New Wine - Hillsong  ',
        artist : 'Bethel Music',
        music : 'music/New Wine - Hillsong Worship.mp3'
    },
    {
        img : 'images/246810121416.jpg',
        name : 'Oceans (Where Feet May Fail) Hillsong ',
        artist : 'Taya Smith',
        music : 'music/Oceans (Where Feet May Fail) - Hillsong UNITED - Live in Israel.mp3'
    },
    {
        img : 'images/images.jpg',
        name : 'Through It All - Hillsong  ',
        artist : 'Hillsong',
        music : 'music/Through It All - Hillsong Worship.mp3'
    },
    {
        img : 'images/1234567890.jpg',
        name : 'Whole Heart - Hillsong  ',
        artist : 'Taya Smith',
        music : 'music/Whole Heart (Hold Me Now) [Live] - Hillsong UNITED.mp3'
    },
    {
        img : 'images/Amaz.jpg',
        name : 'Amazulu  ',
        artist : 'Amanda Black',
        music : 'music/mp3juices.vin - Amanda Black Amazulu (192kbps).mp3'
    },
    {
        img : 'images/so-will-i-100-billion-x.jpg',
        name : 'So Will i (1000 Billion X)',
        artist : 'Taya Smith',
        music : 'music/So Will I (100 Billion X) - Hillsong Worship.mp3'
    },
    {
        img : 'images/12.jpg',
        name : 'One',
        artist : 'Tyrese Gibson',
        music : 'music/Tyrese - One (VIDEO).mp3'
    },
    {
        img : 'images/1.jpg',
        name : 'imali ',
        artist : 'Shwi nomtekhala',
        music : 'music/Shwi noMtekhala - Imali.mp3'
    },
    {
        img : 'images/2.jpg',
        name : 'Jack ',
        artist : 'Nasty C',
        music : 'music/Nasty C - Jack.mp3'
    },
    
    
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = [x];
            a += y;
        }
        return a;
    }
    
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}