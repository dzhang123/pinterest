
console.log('Loading function');

exports.handler = function (event, context, callback) {
    console.log('value1=', event.key1);
    console.log('value2 = ', event.key2);
    console.log('value3 = ', event.key3);

    callback(null, "message for version 2");
}