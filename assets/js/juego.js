const NJUEGOS = 5;
const NBOSSESPJUEGO = 3;
const VIDAS = 3;

const btnConfigJuego = () => {
    const btnJuego = document.querySelector('#genera_juego')
    const divCaratula = document.querySelector('#juego-caratula')

    btnJuego.addEventListener('click', () => {
        juegoSeleccionado = getElemento(juegosDeck)

        reiniciarVidas()

        const oldJuego = divCaratula.querySelector('img')
        if (oldJuego != null)
            divCaratula.removeChild(oldJuego)

        const bossesDiv = document.querySelector('#boss-cartas')
        while (bossesDiv.firstChild) {
            bossesDiv.removeChild(bossesDiv.firstChild)
        }

        bossesDeck = getBossesDeck()

        const imgJuego = document.createElement('img')
        imgJuego.src = `assets/juegos/${juegoSeleccionado}.webp`
        imgJuego.classList.add('img-fluid')
        divCaratula.append(imgJuego)
    })
}

const btnConfigBoss = () => {
    const btnBoss = document.querySelector('#genera_boss')
    const divBosses = document.querySelector('#boss-cartas')

    btnBoss.addEventListener('click', () => {
        if (!juegoSeleccionado) return

        const boss = getElemento(bossesDeck)

        const divBoss = document.createElement('div')
        divBoss.classList.add('carta-boss')

        const imgBoss = document.createElement('img')
        imgBoss.src = `assets/jefes/${boss}.webp`
        imgBoss.classList.add('img-fluid')

        divBoss.append(imgBoss)
        divBoss.addEventListener('mouseup', seleccionaBoss)
        divBosses.appendChild(divBoss)
    })
}

const seleccionaBoss = (e) => {
    const carta = e.currentTarget
    if (carta.classList.contains('ok') || carta.classList.contains('fail'))
        return

    const img = carta.querySelector('img')
    const nombreBoss = img.src.split('/').pop().split('.')[0]   // "01J01"
    
    if (esBossDelJuego(nombreBoss, juegoSeleccionado)) {
        carta.classList.add('ok');
    } else {
        carta.classList.add('fail');
        bajarVidas()
    }
}

const getJuegosDeck = () => {
    let juegosDeck = []
    for (let i = 1; i <= NJUEGOS; i++) {
        juegosDeck.push("J0" + i)
    }
    return _.shuffle(juegosDeck)
}

const getBossesDeck = () => {
    let bossesDeck = []
    for (let i = 1; i <= NJUEGOS; i++) {
        for (let j = 1; j <= NBOSSESPJUEGO; j++) {
            bossesDeck.push(
                String(j).padStart(2, "0") + "J" + String(i).padStart(2, "0")
            )
        }
    }
    return _.shuffle(bossesDeck)
}

const getElemento = (deck) => {
    if (deck.length === 0)
        throw 'No hay más tarjetas'
    return deck.pop()
}

const esBossDelJuego = (boss, juego) => boss.substring(2) === juego

let vidasRestantes = VIDAS;
const vidas = document.querySelectorAll('.vida');

const bajarVidas = () => {
    if (vidasRestantes > 0) {
        vidasRestantes--
        vidas[vidasRestantes].src = 'assets/vidas/empty_heart.webp'
    }
}

const reiniciarVidas = () => {
    vidasRestantes = VIDAS
    vidas.forEach(vida => {
        vida.src = 'assets/vidas/full_heart.webp'
    })
}


let juegosDeck = getJuegosDeck()
let bossesDeck = getBossesDeck()
let juegoSeleccionado;
btnConfigJuego()
btnConfigBoss()