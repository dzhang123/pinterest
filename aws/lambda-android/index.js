
exports.handler = (event, context, callback) => {
    console.log("Received event: " , event);

    var data = {
        "greetings": "Hello, " + event.firstName + " " + event.lastName + "."
    };
    callback(null, data);
}