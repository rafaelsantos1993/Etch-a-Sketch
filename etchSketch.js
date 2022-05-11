
const container = document.querySelector('.container');
var nDivs = 16; // numbers of divs to start 
var varStyle = document.querySelector(':root'); //gets the CSS variables
var countBrightness = 100; // conts the brightness to make the color darker at each pass, unitl increament to 10 

//clear all divs

function clearDivs() {
    boxes.forEach(box => {
        box.classList.remove('drawing');
    });
}

//makes the new border with user required resolution 
function makeNewresolution(userDivs) {

    countBrightness = 100; // resets the counter of brightness
    var oldBoxes = document.querySelectorAll('.box')
    Array.prototype.forEach.call(oldBoxes, node => {
        node.remove()
    });
    container.setAttribute(`style`, `grid-template-columns: repeat(${userDivs.toString()},auto)`);

    for (i = 0; i < userDivs * userDivs; i++) {
        const div = document.createElement('div');
        div.classList.add('box');
        container.appendChild(div);
        document.body.appendChild(container);
    }

    // gets all divs and adds the event listener 
    let boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        box.addEventListener('mousemove', event => {
            event.path[0].classList.add('drawing'); //  changes the background color
            if (countBrightness > 0) {
                event.path[0].setAttribute('style', `filter: brightness(${countBrightness}%)`);
                countBrightness--;
            }
        });
    });
};
//sets button 1 to reset the board by refreshing the page 

const button1 = document.querySelector('.button1');
button1.addEventListener('click', () => {
    document.location.reload(false);
    countBrightness = 100;
});

//sets button 2, where the user can choose the resolution of the board

const button2 = document.querySelector('.button2');
button2.addEventListener('click', () => {
    do {
        console.log('here');
        var nDivsNew = window.prompt('Type the new resolution (<100)');
        nDivsNew = parseInt(nDivsNew);
        if (nDivsNew <= 100) {
            varStyle.style.setProperty('--nDvis', nDivsNew);
            makeNewresolution(nDivsNew);
            clearDivs();
        }
    } while (nDivsNew > 100);
});

// starts making the initial divs 

makeNewresolution(nDivs);
