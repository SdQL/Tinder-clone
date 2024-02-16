let isAnimating = false
let pullDeltaX = 0 // distancia que la card que se está arrastrando

function startDrag(e) {
    if(isAnimating) return

    // get the first article element
    const actualCard = e.target.closest('article')

    // get initial position of mouse or finger
    const startX = e.pageX ?? e.touches[0].pageX
    
    //listen the mouse and touch movements
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);

    document.addEventListener('touchmove', onMove, {passive: true});
    document.addEventListener('touchend', onEnd, {passive: true});

    function onMove(event) {
        // current position of mouse or finger
        const currentX = event.pageX ?? event.touches[0].pageX
        // distance between the initial and current position
        pullDeltaX = currentX - startX
        // no distance, no movement
        if(pullDeltaX === 0) return

        // change the state to indicate that the card is being dragged
        isAnimating = true;

        // calculate the rotation degree based on the distance
        const deg = pullDeltaX / 15;

        // apply the transform to the card
        actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`;
        // change the cursor to grabbing
        actualCard.style.cursor = 'grabbing';

        console.log(pullDeltaX)
    }
    
    function onEnd(event) {
        // renove the event listeners
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);

        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);

        
    }
    
}


document.addEventListener('mousedown', startDrag)
document.addEventListener('touchstart', startDrag, {passive: true})
