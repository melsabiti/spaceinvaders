const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let alienRemoved = []
let results = 0


for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)

}

const sqaure = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!alienRemoved.includes(i)) {
            sqaure[alienInvaders[i]].classList.add('invader')
        }

    }
}

draw()

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        sqaure[alienInvaders[i]].classList.remove('invader')
    }
}

sqaure[currentShooterIndex].classList.add('shooter')

function moveShooter(e) {
    sqaure[currentShooterIndex].classList.remove('shooter')
    switch (e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
            break
        case 'ArrowRight':
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
            break
    }
    sqaure[currentShooterIndex].classList.add('shooter')

}

document.addEventListener('keydown', moveShooter)

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
    remove()

    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1
            direction = -1
            goingRight = false
        }
    }

    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += -1
            direction = 1
            goingRight = true
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }
    draw()

    if (sqaure[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultsDisplay.innerHTML = "SORRY YOU LOSE!"
        clearInterval(invadersId)
    }


    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > (sqaure.length)) {
            resultsDisplay.innerHTML = "SORRY YOU LOSE!"
            clearInterval(invadersId)
        }
    }

    if (alienRemoved.length === alienInvaders.length) {
        resultsDisplay.innerHTML = "YAY YOU WIN!"
        clearInterval(invadersId)
    }
}


invadersId = setInterval(moveInvaders, 500)

function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex

    function moveLaser() {
        sqaure[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        sqaure[currentLaserIndex].classList.add('laser')
        if (sqaure[currentLaserIndex].classList.contains('invader')) {
            sqaure[currentLaserIndex].classList.remove('laser')
            sqaure[currentLaserIndex].classList.remove('invader')
            sqaure[currentLaserIndex].classList.add('boom')

            setTimeout(() => sqaure[currentLaserIndex].classList.remove('boom'), 300)
            clearInterval(laserId)

            const alienRemoval = alienInvaders.indexOf(currentLaserIndex)
            alienRemoved.push(alienRemoved)
            results++
            resultsDisplay.innerHTML = results
                //console.log(alienRemoved)


        }

    }
    switch (e.key) {
        case "ArrowUp":
            laserId = setInterval(moveLaser, 100)
    }
}

document.addEventListener('keydown', shoot)