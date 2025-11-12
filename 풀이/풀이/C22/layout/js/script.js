// Input your code

(function () {
    const $card = document.querySelectorAll('.card');

    let isMouseDown = false;
    let draggedItem = null;
    let itemY = 0;
    let offsetY = 0;
    let moveX = 0;
    let moveY = 0;
    let clone = null;
    let cloneParent = null;
    let pointerElement = null;

    $card.forEach(item => {
        // card mousedown
        item.addEventListener('mousedown', function (e) {
            isMouseDown = true;
            draggedItem = e.currentTarget;
            draggedItem.classList.add('active');
            clone = draggedItem.cloneNode(true);
            clone.classList.add('clone');
            clone.classList.remove('active');
            cloneParent = draggedItem.parentNode;
            clone.style.opacity = 0;
            moveX = e.clientX;
            moveY = e.clientY;
            offsetY = e.offsetY;
            pointerElement = null;
            document.body.style.cursor = 'all-scroll';
        });
    });
    // card mouseup
    document.addEventListener('mouseup', function (e) {
        isMouseDown = false;
        draggedItem.classList.remove('active');
        if(e.target.classList.contains('clone')) {
            // cloneParent.style.height = cloneParent.children.length * clone.getBoundingClientRect().height;
            // clone.parentNode.style.height = clone.parentNode.children.length * clone.getBoundingClientRect().height;
            elementAppend(draggedItem, pointerElement);
        }
        moveX = 0;
        moveY = 0;
        offsetY = 0;
        itemY = 0;
        draggedItem.style.left = moveX + 'px';
        draggedItem.style.top = moveY + 'px';
        draggedItem = null;

        clone.remove();
        clone = null;
        document.body.style.cursor = 'auto';
    });
    // card mousemove
    document.addEventListener('mousemove', function (e) {
        if (!isMouseDown) return;
        const x = e.clientX - moveX;
        const y = e.clientY - moveY;

        draggedItem.style.left = x + 'px';
        draggedItem.style.top = y + 'px';

        itemY = draggedItem.getBoundingClientRect().top + y;

        pointerElement = document.elementFromPoint(e.clientX, e.clientY);

        clone.style.display = 'block';
        // if(clone.parentNode) {
        //     const length = cloneParent.children.length;
        //     if(cloneParent.className !== clone.parentNode.className) {
        //         cloneParent.style.height = clone.getBoundingClientRect().height * (length - 1) + 'px';
        //     } else {
        //         cloneParent.style.height = clone.getBoundingClientRect().height + 'px';
        //     }
        // }
        elementAppend(clone, pointerElement);

        if (!pointerElement.classList.contains('card') && !pointerElement.classList.contains('group-sortable') || cloneParent.className === pointerElement.className) clone.style.display = 'none';
    });

    function elementAppend(newEle, targetEle) {
        const parent = targetEle.parentNode;
        if(parent.classList.contains('group')) targetEle.appendChild(newEle);
        else if (parent.classList.contains('group-sortable')) {
            const height = targetEle.getBoundingClientRect().height / 2;
            const pointerCenter = targetEle.getBoundingClientRect().top + height;
            if (pointerCenter > itemY) {
                parent.insertBefore(newEle, targetEle);
            } else {
                if (parent.lastChild === targetEle) {
                    parent.appendChild(newEle);
                } else {
                    parent.insertBefore(newEle, targetEle.nextSibling);
                }
            }
        }
    }
})();