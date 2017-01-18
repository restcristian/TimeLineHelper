var TimeLine = function() {

    var self = this,
        animationList,
        animationTotalDuration,
        sequenceInterval = {};

    self.init = function() {
        animationList = [];
        animationTotalDuration = 0;
    };

    self.add = function(DOMElement, animationDuration, animationClass, callBack) {
        var animation = {};
        animation.DOMElement = DOMElement;
        animation.animationDuration = animationDuration || 0;
        // animation.callBack = callBack;
        animation.animationClass = animationClass;
        animationList.push(animation);
        animationTotalDuration = animationList.reduce(function(an1, an2) {
            return an1.animationDuration + an2.animationDuration;
        });

        console.log(animation);
        // self.play();
    };

    self.play = function() {
        var currentDuration = 0,
            currentIdx = 1;


        // animationList[0].callBack();

        animationList[0].DOMElement.style.WebkitTransitionDuration = animationList[0].animationDuration + 's';
        animationList[0].DOMElement.style.transitionDuration = animationList[0].animationDuration + 's';
        animationList[0].DOMElement.classList.add(animationList[0].animationClass);
        console.log(animationList[0]);

        if (animationList.length > 1) {

            sequenceInterval = setInterval(function() {

                if (currentIdx < animationList.length) {
                    //animationList[scope.idx].callBack();
                    console.debug('sequence:', animationList[currentIdx]);
                    animationList[currentIdx].DOMElement.style.WebkitTransitionDuration = animationList[currentIdx].animationDuration + 's';
                    animationList[currentIdx].DOMElement.style.transitionDuration = animationList[currentIdx].animationDuration + 's';
                    animationList[currentIdx].DOMElement.classList.add(animationList[currentIdx].animationClass);
                    currentIdx++;
                } else {
                    clearInterval(sequenceInterval);
                }

            }, currentDuration += (animationList[currentIdx].animationDuration * 1000));

        }

    };

    (function() {
        self.init();
    })();
};


window.addEventListener('load', function() {
    var boxTL = new TimeLine(),
        box = document.getElementById('box1');

    boxTL.add(box, 2, 'scaleDouble');
    boxTL.add(box, 4, 'background1');
    boxTL.add(box, 5, 'background2');
    boxTL.add(box, 6, 'background3');

    boxTL.play();

});