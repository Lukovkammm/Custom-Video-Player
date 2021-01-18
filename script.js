const video = document.querySelector('video');
const controls = document.querySelector('.video__controls');
const progress = controls.querySelector('.progress');
const progressBar = controls.querySelector('.progress__filled');


function playSwitcher() {
    const switcher = video.paused ? video.play() : video.pause();
    const icon = video.paused ? '\u23F5' : '\u23F8';
    document.querySelector('.play-button').textContent = icon;
}

function skip(timeSkip) {
    video.currentTime += parseFloat(timeSkip);
}

function changeRange(range) {
    video[range.name] = range.value;
}

function videoProgress() {
    const percent = (video.currentTime * 100) / video.duration;
    progressBar.style.width = `${percent}%`;
}

function rewindVideo(e) {
     let rewind = (video.duration * e.offsetX) / progress.offsetWidth;
     video.currentTime = rewind;
}

video.addEventListener('click', playSwitcher);
controls.addEventListener('click', (e) => {
    if (e.target.classList.contains('play-button')) {
        const playButton = e.target;
        playSwitcher();
    } else if(e.target.classList.contains('skip-button')) {
        let timeSkip = e.target.dataset.skip;
        skip(timeSkip)
    } 
});

controls.addEventListener('change', (e) => {
   controls.addEventListener('mousemove', () => {
    const range = e.target;
    if ( range.type === 'range') {
        changeRange(range);
    };  
   })  
});
video.addEventListener('timeupdate', videoProgress);

let mousedown = false;
progress.addEventListener('click', rewindVideo);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && rewindVideo(e));