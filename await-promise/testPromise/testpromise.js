
const wait = ms => new Promise((resolve,reject) => setTimeout(resolve, ms));

console.log(Promise.prototype.constructor);
/*
const wait = function (ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
        resolve();
    });
}
*/
wait(10000).then(() => console.log("10 second")).catch((y) => console.log("error"));