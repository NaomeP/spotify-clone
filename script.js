let songs=[{name:"Song 1",file:"song1.mp3",cover:"cover1.jpg"},{name:"Song 2",file:"song2.mp3",cover:"cover2.jpg"},{name:"Song 3",file:"song3.mp3",cover:"cover3.jpg"}];
let currentSong=0;let audio=new Audio();let likedSongs=JSON.parse(localStorage.getItem("liked"))||[];
let songList=document.getElementById("songList");

function renderSongs(){songList.innerHTML="";songs.forEach((song,index)=>{let div=document.createElement("div");div.className="song";div.innerHTML=`<img src="${song.cover}"><span>${song.name}</span><span class="like" onclick="likeSong(event,${index})">${likedSongs.includes(index)?"❤️":"🤍"}</span>`;div.onclick=()=>playSong(index);songList.appendChild(div)})}renderSongs();

function playSong(index){currentSong=index;audio.src=songs[index].file;audio.play();document.getElementById("nowPlaying").innerText=songs[index].name;highlightSong()}
function playPause(){audio.paused?audio.play():audio.pause()}
function nextSong(){currentSong=(currentSong+1)%songs.length;playSong(currentSong)}
function prevSong(){currentSong=(currentSong-1+songs.length)%songs.length;playSong(currentSong)}
function highlightSong(){document.querySelectorAll(".song").forEach((song,i)=>song.className="song"+(i===currentSong?" active":""))}

audio.addEventListener("ended",nextSong);audio.addEventListener("timeupdate",()=>{if(audio.duration)document.getElementById("progress").value=(audio.currentTime/audio.duration)*100});
document.getElementById("progress").addEventListener("input",e=>{if(audio.duration)audio.currentTime=(e.target.value/100)*audio.duration});
document.getElementById("volume").addEventListener("input",e=>audio.volume=e.target.value);
document.getElementById("search").addEventListener("input",e=>{let v=e.target.value.toLowerCase();document.querySelectorAll(".song").forEach(s=>{s.style.display=s.textContent.toLowerCase().includes(v)?"flex":"none"})});
document.getElementById("prev").onclick=prevSong;document.getElementById("play").onclick=playPause;document.getElementById("next").onclick=nextSong;document.getElementById("theme").onclick=()=>{document.body.classList.toggle("light")};

function likeSong(e,i){e.stopPropagation();likedSongs.includes(i)?likedSongs=likedSongs.filter(x=>x!==i):likedSongs.push(i);localStorage.setItem("liked",JSON.stringify(likedSongs));renderSongs()}
