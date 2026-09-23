async function getSongs() {
     let response = await fetch("assets/songs.json");
     let songs = await response.json();

     return songs.map(function (song) {
          return {
               name: song,
               url: "assets/songs/" + encodeURIComponent(song)
          };
     });
}

async function main() {
     let songs = await getSongs();
     let currentSong = new Audio();
     let playbar = document.querySelector(".playbar");
     let lastbox1 = document.querySelector(".lastbox1");
     let songImage = document.querySelector("#song");
     let songTitle = document.querySelector(".btitle1");
     let songArtist = document.querySelector(".btitle2");
     let repeat = document.querySelector(".pcontain1 .repeat");
     let next = document.querySelector(".pcontain1 .next");
     let prev = document.querySelector(".pcontain1 .prev");
     let shuffle = document.querySelector(".pcontain1 .shuffle");
     let shuffleimg = document.querySelector(".pcontain1 .shuffleimg");
     let volume = document.querySelector(".volume");
     let mutebutton = document.querySelector(".mute");
     console.log(songs);

     let progressBar = document.querySelector(".pcontain2 .progress-bar");
     let progressFilled = document.querySelector(".pcontain2 .progressfilled");
     let progressThumb = document.querySelector(".pcontain2 .progressthumb");
     let currentTime = document.querySelector(".currenttime");
     let duration = document.querySelector(".duration");

     let playbutton = document.querySelector(".play");
     let downplaybutton = playbar.querySelector(".pause");
     let pc = document.querySelector(".play-pc");
     // let cards = document.querySelectorAll(".robx");

     let volumeBar = document.querySelector(".partition3 .bar2");
     let volumeFilled = document.querySelector(".partition3 .progressfilled");
     let volumeThumb = document.querySelector(".partition3 .progressthumb");

     currentSong.volume = 1;
     volumeFilled.style.width = "100%";
     volumeThumb.style.left = "100%";

     function formatTime(seconds) {
          let mins = Math.floor(seconds / 60);
          let sec = Math.floor(seconds % 60);

          if (sec < 10) {
               sec = "0" + sec;
          }

          return mins + ":" + sec;
     }

     let cards = Array.from(document.querySelectorAll(".robx"));
     let currentIndex = -1;
     cards.forEach(function (card, index) {

          card.addEventListener("click", function () {

               currentIndex = index;
               if (currentSong.paused) {
                    pc.src = "/assets/images/continue.svg";
               }
               let poster = card.querySelector(".poster");
               let title = card.querySelector(".title1").innerText;
               let artist = card.querySelector(".title2").innerText;



               let song = songs.find(function (song) {
                    let cleanFileName = song.name
                         .replace(".mp3", "")
                         .toLowerCase()
                         .replace(/[^a-z0-9]/g, "");

                    let cleanTitle = title
                         .toLowerCase()
                         .replace(/[^a-z0-9]/g, "");

                    console.log("Title: ", cleanTitle);
                    console.log("File name: ", cleanFileName);
                    return cleanTitle.includes(cleanFileName);
               })

               if (!song) {

                    console.log("Song not found:", title);

                    return;

               };


               currentSong.src = song.url;
               currentSong.play();
               playbar.style.display = "flex";
               lastbox1.style.display = "none";
               progressFilled.style.width = "0%";
               progressThumb.style.left = "0%";

               songImage.src = poster.src;
               songTitle.innerText = title;
               songArtist.innerText = artist;

               shuffleimg.src = "/assets/images/shuffle.svg";
          });




     });

     volumeBar.addEventListener("click", function (e) {
          let percent = e.offsetX / volumeBar.offsetWidth;

          currentSong.volume = percent;
          volumeFilled.style.width = percent * 100 + "%";
          volumeThumb.style.left = percent * 100 + "%";
     });
     next.addEventListener("click", function () {
          // shuffleimg.src = "/assets/images/shuffle.svg";
          if (currentIndex == -1) {
               return;
          }

          let nextIndex = (currentIndex + 1) % 20;

          let nextCard = cards[nextIndex];

          let poster = nextCard.querySelector(".poster");
          let title = nextCard.querySelector(".title1").innerText;
          let artist = nextCard.querySelector(".title2").innerText;

          let song = songs.find(function (song) {

               let cleanFileName = song.name
                    .replace(".mp3", "")
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "");

               let cleanTitle = title
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "");

               return cleanTitle.includes(cleanFileName);

          });

          if (!song) {
               console.log("Song not found:", title);
               return;
          }

          currentIndex = nextIndex;
          currentSong.src = song.url;
          currentSong.play();

          songImage.src = poster.src;
          songTitle.innerText = title;
          songArtist.innerText = artist;

          progressFilled.style.width = "0%";
          progressThumb.style.left = "0%";

          pc.src = "/assets/images/continue.svg";
          shuffleimg.src = "/assets/images/shuffle.svg";



     });

     prev.addEventListener("click", function () {
          if (currentIndex == -1) {
               return;
          }
          // shuffleimg.src = "/assets/images/shuffle.svg";

          let prevIndex = (currentIndex - 1) % 20;
          if (prevIndex == -1) prevIndex = 19;

          let prevCard = cards[prevIndex];

          let poster = prevCard.querySelector(".poster");
          let title = prevCard.querySelector(".title1").innerText;
          let artist = prevCard.querySelector(".title2").innerText;

          let song = songs.find(function (song) {

               let cleanFileName = song.name
                    .replace(".mp3", "")
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "");

               let cleanTitle = title
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "");

               return cleanTitle.includes(cleanFileName);

          });

          if (!song) {
               console.log("Song not found:", title);
               return;
          }

          currentIndex = prevIndex;
          currentSong.src = song.url;
          currentSong.play();

          songImage.src = poster.src;
          songTitle.innerText = title;
          songArtist.innerText = artist;

          progressFilled.style.width = "0%";
          progressThumb.style.left = "0%";

          pc.src = "/assets/images/continue.svg";
          shuffleimg.src = "/assets/images/shuffle.svg";



     });

     currentSong.addEventListener("ended", function () {
          setTimeout(function () {
               // shuffleimg.src = "/assets/images/shuffle.svg";
               let randomIndex = Math.floor(Math.random() * songs.length);
               let randomSong = songs[randomIndex];

               let randomCard = [...cards].find(function (card) {

                    let title = card.querySelector(".title1").innerText;

                    let cleanFileName = randomSong.name
                         .replace(".mp3", "")
                         .toLowerCase()
                         .replace(/[^a-z0-9]/g, "");

                    let cleanTitle = title
                         .toLowerCase()
                         .replace(/[^a-z0-9]/g, "");

                    return cleanTitle.includes(cleanFileName);
               });

               if (!randomCard) {
                    console.log("Card not found:", randomSong.name);
                    return;
               }

               let poster = randomCard.querySelector(".poster");
               let title = randomCard.querySelector(".title1").innerText;
               let artist = randomCard.querySelector(".title2").innerText;

               currentSong.src = randomSong.url;
               currentSong.play();

               playbar.style.display = "flex";
               lastbox1.style.display = "none";

               progressFilled.style.width = "0%";
               progressThumb.style.left = "0%";

               songImage.src = poster.src;
               songTitle.innerText = title;
               songArtist.innerText = artist;
          }, 1000);
     });

     shuffle.addEventListener("click", function () {
          setTimeout(function () {
               shuffleimg.src = "/assets/images/gshuffle.svg";
               let randomIndex = Math.floor(Math.random() * songs.length);
               let randomSong = songs[randomIndex];

               let randomCard = [...cards].find(function (card) {

                    let title = card.querySelector(".title1").innerText;

                    let cleanFileName = randomSong.name
                         .replace(".mp3", "")
                         .toLowerCase()
                         .replace(/[^a-z0-9]/g, "");

                    let cleanTitle = title
                         .toLowerCase()
                         .replace(/[^a-z0-9]/g, "");

                    return cleanTitle.includes(cleanFileName);
               });

               if (!randomCard) {
                    console.log("Card not found:", randomSong.name);
                    return;
               }

               let poster = randomCard.querySelector(".poster");
               let title = randomCard.querySelector(".title1").innerText;
               let artist = randomCard.querySelector(".title2").innerText;

               currentSong.src = randomSong.url;
               currentSong.play();

               playbar.style.display = "flex";
               lastbox1.style.display = "none";

               progressFilled.style.width = "0%";
               progressThumb.style.left = "0%";

               songImage.src = poster.src;
               songTitle.innerText = title;
               songArtist.innerText = artist;
          }, 500);
     });

     repeat.addEventListener("click", function () {

          currentSong.currentTime = 0;
          currentSong.play();
          pc.src = "/assets/images/continue.svg";

     });

     currentSong.addEventListener("timeupdate", function () {

          let progress = (currentSong.currentTime / currentSong.duration) * 100;
          progressFilled.style.width = progress + "%";
          progressThumb.style.left = progress + "%";

          currentTime.innerText = formatTime(currentSong.currentTime);
     });

     currentSong.addEventListener("loadedmetadata", function () {
          duration.innerText = formatTime(currentSong.duration);
     });

     progressBar.addEventListener("click", function (e) {
          let percent = e.offsetX / progressBar.offsetWidth;
          currentSong.currentTime = percent * currentSong.duration;
     });
     downplaybutton.addEventListener("click", function () {
          if (currentSong.paused) {
               currentSong.play();
               pc.src = "/assets/images/continue.svg";

          } else {
               currentSong.pause();

               pc.src = "/assets/images/pause.svg";


          }

     });

     mutebutton.addEventListener("click", function () {
          currentSong.muted = !currentSong.muted;
          if (currentSong.muted) {
               volume.src = "/assets/images/unmute.svg"
          } else {
               volume.src = "/assets/images/mute.svg"
          }
     });

     window.addEventListener("load", function () {
          history.replaceState(null, null, window.location.pathname);
     });


}
main()