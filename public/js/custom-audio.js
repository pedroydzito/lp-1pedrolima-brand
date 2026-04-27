document.addEventListener("DOMContentLoaded", function () {
    // Disable the Sonaar player instantiation if there is any remaining inline script
    window.setIronAudioplayers = function () { };

    const audioMapping = {
        'Linkin-Park-BURN-IT-DOWN.mp3': 'BURN IT DOWN - Linkin Park.mp3',
        'BORNS-Electric-Love.mp3': 'BØRNS - Electric Love - BØRNSmusicVEVO.mp3',
        'Edison-Lighthouse-Love-Grows-Where-My-Rosemary-Goes.mp3': 'Edison Lighthouse - Love Grows (Where My Rosemary Goes) (Official HD Video) - DemonMusicGroup.mp3',
        'Ice-Cube-It-Was-A-Good-Day.mp3': 'It Was A Good Day - Ice Cube.mp3',
        'Oh-the-Larceny-Man-On-Fire.mp3': 'Man On Fire - Oh the Larceny.mp3',
        'Capital-Cities-Safe-And-Sound.mp3': 'Safe and Sound - Capital Cities.mp3'
    };

    document.querySelectorAll('.iron-audioplayer').forEach(playerContainer => {
        const audioEl = document.createElement('audio');
        audioEl.style.display = 'none';
        playerContainer.appendChild(audioEl);

        const playlistItem = playerContainer.querySelector('.sr-playlist-item');
        let audioPath = playlistItem ? playlistItem.getAttribute('data-audiopath') : '';

        if (audioPath) {
            // Check if we have a local mapping for this filename
            const filename = audioPath.split('/').pop();
            if (audioMapping[filename]) {
                audioEl.src = '/assets/' + audioMapping[filename];
            } else {
                // Fallback (though probably not needed based on user request)
                audioEl.src = audioPath;
            }
        }

        const playBtn = playerContainer.querySelector('.srp-play-button');

        // Find the icon inside the play button
        const playIcon = playerContainer.querySelector('.srp-play-button .sricon-play')
            || playerContainer.querySelector('.srp-play-button i');

        if (playIcon) {
            // Replace Sonaar icon with Bootstrap icon, keeping it centered inside the circle
            playIcon.className = 'bi bi-play-fill';
            playIcon.style.position = 'absolute';
            playIcon.style.top = '50%';
            playIcon.style.left = '50%';
            playIcon.style.transform = 'translate(-50%, -50%)';
            playIcon.style.fontSize = '22px';
            playIcon.style.lineHeight = '1';
            playIcon.style.margin = '0';
        }

        if (playBtn) {
            // Ensure the button is the positioning anchor for the absolute icon
            playBtn.style.position = 'relative';
            playBtn.style.cursor = 'pointer';
        }

        const currentTimeEl = playerContainer.querySelector('.currentTime');
        const totalTimeEl = playerContainer.querySelector('.totalTime');
        const trackTitleEl = playerContainer.querySelector('.track-title');

        // Progress bar elements — Sonaar uses .sonaar_wave_cut as the fill
        const waveCut = playerContainer.querySelector('.sonaar_wave_cut');
        const waveBase = playerContainer.querySelector('.sonaar_wave_base');

        if (trackTitleEl && playlistItem) {
            trackTitleEl.textContent = playlistItem.getAttribute('data-tracktitle') || trackTitleEl.textContent;
        }

        let isPlaying = false;

        if (playBtn) {
            playBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                if (isPlaying) {
                    audioEl.pause();
                    isPlaying = false;
                    if (playIcon) playIcon.className = 'bi bi-play-fill';
                } else {
                    audioEl.play().then(() => {
                        isPlaying = true;
                        if (playIcon) playIcon.className = 'bi bi-pause-fill';
                    }).catch(err => {
                        console.error("Audio play error:", err);
                    });
                }
            });
        }

        audioEl.addEventListener('timeupdate', function () {
            if (currentTimeEl) {
                let mins = Math.floor(audioEl.currentTime / 60);
                let secs = Math.floor(audioEl.currentTime % 60);
                if (secs < 10) secs = '0' + secs;
                currentTimeEl.textContent = mins + ':' + secs;
            }

            // Update progress bar fill
            if (waveCut && waveBase && isFinite(audioEl.duration) && audioEl.duration > 0) {
                const pct = (audioEl.currentTime / audioEl.duration) * 100;
                waveCut.style.width = pct + '%';
                // Make sure the wave base has position:relative so the cut can be positioned correctly
                if (waveBase.style.position !== 'relative') {
                    waveBase.style.position = 'relative';
                }
                waveCut.style.position = 'absolute';
                waveCut.style.top = '0';
                waveCut.style.left = '0';
                waveCut.style.height = '100%';
                waveCut.style.transition = 'width 0.3s linear';
            }
        });

        audioEl.addEventListener('loadedmetadata', function () {
            if (totalTimeEl && isFinite(audioEl.duration)) {
                let mins = Math.floor(audioEl.duration / 60);
                let secs = Math.floor(audioEl.duration % 60);
                if (secs < 10) secs = '0' + secs;
                totalTimeEl.textContent = mins + ':' + secs;
            }

            // Setup progress bar container styling
            if (waveCut && waveBase) {
                waveBase.style.position = 'relative';
                waveCut.style.position = 'absolute';
                waveCut.style.top = '0';
                waveCut.style.left = '0';
                waveCut.style.width = '0%';
                waveCut.style.height = '100%';
                waveCut.style.transition = 'width 0.3s linear';
                // Make wave_cut visible if it was hidden by Sonaar defaults
                waveCut.style.overflow = 'hidden';
            }
        });

        audioEl.addEventListener('ended', function () {
            isPlaying = false;
            if (playIcon) playIcon.className = 'bi bi-play-fill';
            // Reset progress bar
            if (waveCut) {
                waveCut.style.width = '0%';
            }
        });
    });
});
