module.exports = {
    // 处理拖动事件
    handleDrag(e,dom){
        let bodyDom = document.querySelector(dom);
        let pageX = 0,
            pageY = 0,
            transformX = 0,
            transformY = 0,
            canMove = false;
        let transform = /\(.*\)/.exec(bodyDom.style.transform);
        if (transform) {
        transform = transform[0].slice(1, transform[0].length - 1);
        let splitxy = transform.split('px, ');
        transformX = parseFloat(splitxy[0]);
        transformY = parseFloat(splitxy[1].split('px')[0]);
        }
        pageX = e.pageX;
        pageY = e.pageY;
        canMove = true;
        const handleMousemove = e => {
        let xOffset = e.pageX - pageX + transformX
        let yOffset = e.pageY - pageY + transformY
        // if (canMove) bodyDom.style.transform = `translate(${xOffset}px, ${yOffset}px)`
        if(canMove){
            let ol = bodyDom.offsetLeft
            let ot = bodyDom.offsetTop
            let absx = Math.abs(xOffset)
            let absy = Math.abs(yOffset)
            if(ol>absx){
            if(ot>absy){
                bodyDom.style.transform = `translate(${xOffset}px, ${yOffset}px)`
            }else{
                ot = yOffset>0?ot:-ot
                bodyDom.style.transform = `translate(${xOffset}px, ${ot}px)`
            }
            }else{
            ol = xOffset>0?ol:-ol
            if(ot>absy){
                bodyDom.style.transform = `translate(${ol}px, ${yOffset}px)`
            }else{
                ot = yOffset>0?ot:-ot
                bodyDom.style.transform = `translate(${ol}px, ${ot}px)`
            }
            }
        }
        }
        const handleMouseup = e => {
        canMove = false
        }
        document.onmousemove = handleMousemove;
        document.onmouseup = handleMouseup;
    },
    recoverTransform(dom){
        let bodyDom = document.querySelector(dom)
        setTimeout(() => {
        bodyDom && (bodyDom.style.transform = '')
        }, 500);
    },
}