const fs = require('fs');

function readFile() {
    return new Promise(async function (resolve, reject) {
        await fs.readFileSync('./coords.csv', 'utf-8', (err, data) => {
            if (err)
                throw err;
            console.log(data.toString());
            resolve(data.toString());
        })
    });
}

/*
readFile().then((data) => {
    console.log(data);
});
*/

/*
fs.readFileSync('./coords.csv', 'utf-8', (err, data) => {
    if (err)
        throw err;
    console.log(data.toString());
    resolve(data.toString());
});
*/

var text = fs.readFileSync('coords.csv', 'utf8');
console.log(text);