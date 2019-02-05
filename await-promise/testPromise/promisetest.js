'use strict';

var promiseCount = 0;

function testPromise() {
    let thisPromiseCount = ++promiseCount;

    let log = document.getElementById('log');
    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') Started (<small>Sync code started</small>)<br/>');
    
    let p1 = new Promise (
        (resolve, reject) => {
            log.insertAdjacentHTML('beforeend', thisPromiseCount +
                ') Promise started (<small>Async code started</small>)<br/>');
            window.setTimeout(
                function() {
                    resolve(thisPromiseCount)
                }, Math.random() * 2000 + 1000
            )
        }
    );
    p1.then (
        function (val) {
            log.insertAdjacentHTML('beforeend', val +
                ') Promise fulfilled (<small>Async code terminated</small>)<br/>');
        }
    ).catch (
        (reason) => {
            console.log('handle rejected promise ('+reason+') here.');
        }
    );

    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') Promise made (<small>Sync code terminated</small>)<br/>');
}

if ("Promise" in window) {
    let btn = document.querySelector('#btn');
    btn.addEventListener('click', testPromise);
}
else {
    log = document.querySelector('#log');
    log.innerHTML = "live example not available as your browser does not support <code>Promise</code> interface."
}