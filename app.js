var TimeLine = function() {

    var self = this,
        animationList,
        animationTotalDuration,
        sequenceInterval = function() {};

    self.init = function() {
        animationList = [];
        animationTotalDuration = 0;
    };

    self.add = function(options, callBack) {
        var animation = {};

        animation.DOMElement = options.DOMElement;
        animation.animationDuration = options.animationDuration || 0;
        animation.callBack = callBack;
        animation.animationClass = options.animationClass;
        animation.animationDelay = options.animationDelay || 0;
        animationList.push(animation);
        animationTotalDuration = animationList.reduce(function(total, animation) {
            return total + animation.animationDuration;
        },0);

        console.log('animationTotalDuration',animationTotalDuration);
        // self.play();
    };

    self.play = function() {
        var currentDuration = 0,
            currentIdx = 1;

       
       self.animateAt(0);

        if (animationList.length > 1) {

            sequenceInterval = setInterval(function() {

                if (currentIdx < animationList.length) {
                    //animationList[scope.idx].callBack();
                    console.debug('sequence:', animationList[currentIdx]);
                    self.animateAt(currentIdx++);
                    console.debug('CurrentIDX:', currentIdx);
                } else {
                    clearInterval(sequenceInterval);
                    // self.playReverse();

                }

            }, currentDuration += (animationList[currentIdx].animationDuration * 1000));

        }

    };

    self.animateAt = function(idx){
        animationList[idx].DOMElement.style.WebkitTransitionDuration = animationList[idx].animationDuration + 's';
        animationList[idx].DOMElement.style.transitionDuration = animationList[idx].animationDuration + 's';
        animationList[idx].DOMElement.classList.add(animationList[idx].animationClass);
    };

    self.playReverse = function() {
        console.log('Play Reverse called');
        for (var idx = animationList.length - 1; idx >= 0; idx--) {
            console.debug('Reverse', animationList[idx].DOMElement);
            animationList[idx].DOMElement.classList.remove(animationList[idx].animationClass);
        }
    };

    self.reset = function() {

    };

    (function() {
        self.init();
    })();
};


window.addEventListener('load', function() {
    var boxTL = new TimeLine(),
        box = document.getElementById('box1');

    boxTL.add({
        DOMElement: box,
        animationDuration: 3,
        animationClass: 'scaleDouble'
    });

    boxTL.add({
        DOMElement: box,
        animationDuration: 2,
        animationClass: 'background1'
    });

    boxTL.add({
        DOMElement: box,
        animationDuration: 2,
        animationClass: 'background2'
    });

    boxTL.add({
        DOMElement: box,
        animationDuration: 2,
        animationClass: 'background3'
    });

    boxTL.add({
        DOMElement: box,
        animationDuration: 2,
        animationClass: 'fadeOut'
    });

    boxTL.add({
        DOMElement: box,
        animationDuration: 2,
        animationClass: 'fadeIn'
    });

    boxTL.add({
        DOMElement: box,
        animationDuration: 2,
        animationClass: 'scaleNormal'
    });

   // boxTL.play();

});