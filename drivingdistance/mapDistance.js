/*
const googleMapsClient = require('@google/maps').createClient({
    key: 'nokey'
});


// Geocode an address
googleMapsClient.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA'
}, function (err, response) {
    if (!err) {
        console.log(response.json.results);
    }
});
*/

// as promise
const googleMapsClient = require('@google/maps').createClient({
    //key: 'NOKEY',
    Promise: Promise
});

googleMapsClient.geocode({address: '1600 Amphitheatre Parkway, Mountain View, CA'})
    .asPromise()
    .then((response) => {
        console.log(response.json.results);
    })
    .catch((err) => {
        console.log(err);
    });