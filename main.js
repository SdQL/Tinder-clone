let isAnimating = false
let pullDeltaX = 0 // distancia que la card que se está arrastrando
const DECISION_THRESHOLD = 150 // distancia que se debe arrastrar la card para tomar una decisión   

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
        
        // know if the user liked or disliked the card
        const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD

        // if the user liked or disliked the card, animate it out
        if(decisionMade) {
            const goRight = pullDeltaX > 0
            const goLeft = !goRight

            actualCard.classList.add(goRight ? 'go-right' : 'go-left')
            actualCard.removeEventListener('transitionend', () => {
                actualCard.remove()
            })
        } else {
            // if the user didn't like or dislike the card, reset the card to its initial position
            actualCard.classList.add('reset')
            actualCard.classList.remove('go-right', 'go-left')
        }

        // reset the variables
        actualCard.addEventListener('transitionend', () => {
            actualCard.removeAttribute('style')
            actualCard.classList.remove('reset')

            pullDeltaX = 0
            isAnimating = false
        })
        
    }
    
}


document.addEventListener('mousedown', startDrag)
document.addEventListener('touchstart', startDrag, {passive: true})
