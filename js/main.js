//Creo un array con las canciones
const songList = [
     {
          title: "Acoustic Breeze",
          file: "01song.mp3",
          cover: "01cat.jpg"

     },
     {
          title: "A new Beginning",
          file: "02song.mp3",
          cover: "02cat.jpg"

     },
     {
          title: "Creative Minds",
          file: "03song.mp3",
          cover: "03cat.jpg"

     },

]
//Canción Actual

let actualSong = null

//Acceder a los elementos del DOM

const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")

//Escuchar un clic en la barra de progreso
progressContainer.addEventListener("click", setProgress)

//Escuchar el elemento audio
audio.addEventListener("timeupdate", updateProgress)

//Escuchar clic en botón play
play.addEventListener("click", () => {
     if (actualSong!==null){
          if (audio.paused){
               playSong()
          }else{
               pauseSong()
          }
     }
})

//Escuchar clic en botón prev
prev.addEventListener("click", () => {
     if (actualSong !== null){
          if (actualSong > 0){
              
               loadSong(actualSong-1)
               
          }
     }
})


//Escuchar clic en botón next
next.addEventListener("click", () => {
     if (actualSong !== null){
          if (actualSong < 2){
              
               loadSong(actualSong+1)
               
          }
     }
})

//Escucho cuando termina la canción y cambio el control
audio.addEventListener("ended", () =>{
     play.classList.remove("fa-pause")
     play.classList.add("fa-play")
     const links = document.querySelectorAll("a")
     links[actualSong].classList.remove("active")


     
} )

//Cargar canciones y mostrar el listado

function loadSongs() {

     songList.forEach((song, index) => {
          //Crear li
          const li = document.createElement("li")
          //Crear a
          const link = document.createElement("a")
          //Cargar valor en a
          link.textContent = song.title
          link.href = "#"
          //Escuchar clicks
          link.addEventListener("click", () => loadSong(index))

          //Añadir a li
          li.appendChild(link)
          //Añadir li a ul
          songs.appendChild(li)


     })

}

//Cargar canción seleccionada

function loadSong(songIndex) {
    
     
     if (actualSong !== songIndex){

          //Cambiamos la clase activa
          changeActiveClass(actualSong, songIndex)

          //Cargamos el cover
          cover.src = "./assets/img/" + songList[songIndex].cover

          //Cargamos el audio cliqueado
          audio.src = "./assets/audio/" + songList[songIndex].file
          audio.play()
          updateControls()
         

          //Cargamos el título de la canción
          title.textContent = songList[songIndex].title

          //Guardamos la cancion activa
          actualSong = songIndex
     }

}

//Reproducir canción

function playSong() {
    
     audio.play()
     updateControls()
}
//Pausar cancion
function pauseSong() {
     
     audio.pause()
     updateControls()
}

//Actualizar controles
function updateControls() {
     if (audio.paused){
          play.classList.remove("fa-pause")
          play.classList.add("fa-play")
     }else{
          play.classList.remove("fa-play")
          play.classList.add("fa-pause")
     }
}

//Cambiar la clase activa
function changeActiveClass(lastIndex, newIndex) {
     const links = document.querySelectorAll("a")
     //Si no es la primera canción
     if(lastIndex !== null){
          links[lastIndex].classList.remove("active")
     }
     links[newIndex].classList.add("active")
    

}

//Actualizar barra de progreso de la canción
function updateProgress(event){
     const {duration, currentTime} = event.srcElement
     const percent = (currentTime/duration) *100
     progress.style.width = percent + "%"

}

//Barra de progreso cliqueable

function setProgress(event) {
     const totalWidth = this.offsetWidth
     const progressWidth = event.offsetX
     const current = (progressWidth/totalWidth) * audio.duration
     audio.currentTime = current
}



//Go!

loadSongs()



