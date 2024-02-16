let isAnimating = false
let pullDeltaX = 0 // distancia que la card se está arrastrando

function startDrag(e) {
    if(isAnimating) return

    // get the first article element
    const actulCard = event.target.closest('article')

    // get initial position of mouse or finger
    const startX = e.pageX ?? e.touches[0].pageX
    
    //listen the mouse and touch movements
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);

    document.addEventListener('touchmove', onMove, {passive: true});
    document.addEventListener('touchend', onEnd, {passive: true});
}

function onMove(event) {

}

function onEnd(event) {
    
}

document.addEventListener('mousedown', startDrag)
document.addEventListener('touchstart', startDrag, {passive: true})
