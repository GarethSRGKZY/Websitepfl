// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36\
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e){
    e.preventDefault();
}

function preventDefaultForScrollKeys(e){
    if(keys[e.keyCode]){
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try{
    window.addEventListener("test", null, Object.defineProperty({}, 'passive',{
        get: function(){ supportsPassive = true; }
    }));
} catch(e) {}

var wheelOperator = supportsPassive ? {passive: false}: false;
var wheelEvent = 'onwheel' in document.createElement('div')? 'wheel' : 'mousewheel';

// call this to disable
function disableScroll(){
    $('html').css({
        'overflow':'hidden',
        'height':'100%'
    })
    window.addEventListener('DOMMouseScroll', preventDefault, false); //older devices
    window.addEventListener(wheelEvent, preventDefault, wheelOperator); // desktop
    window.addEventListener('touchmove', preventDefault, wheelOperator); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

//call to enable
function enableScroll(){
    $('html').css({
        'overflow':'auto',
        'height':'auto'
    })
    window.removeEventListener('DOMMouseScroll', preventDefault, false); //older devices
    window.removeEventListener(wheelEvent, preventDefault, wheelOperator); // desktop
    window.removeEventListener('touchmove', preventDefault, wheelOperator); // mobile
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}