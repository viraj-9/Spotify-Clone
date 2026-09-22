console.log("till 31st august");

async function getSongs() {
     let response = await fetch("assets/songs.json");
     let songs = await response.json();

     return songs.map(function(song) {
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
     console.log(songs);

     let playbutton = document.querySelector(".play");
     let downplaybutton = playbar.querySelector(".pause");
     let pc = document.querySelector(".play-pc");
     let cards = document.querySelectorAll(".robx");

     cards.forEach(function (card, index) {
          card.addEventListener("click", function () {
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

               }
               currentSong.src = song.url;
               currentSong.play();
               playbar.style.display = "flex";
               lastbox1.style.display = "none";





               songImage.src = poster.src;
               songTitle.innerText = title;
               songArtist.innerText = artist;
          })

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

}
main()