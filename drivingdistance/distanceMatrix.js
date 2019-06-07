

var distance = require('google-distance-matrix');
//distance.key('NOKEY');

var origins = ['San Francisco CA'];
var destinations = ['New York NY', '41.8337329,-87.7321554'];

distance.matrix(origins, destinations, function (err, distances) {
    if (!err) {
        console.log(distances);
    }
})