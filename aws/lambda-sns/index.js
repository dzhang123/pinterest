
console.log('Loading function');

exports.handler = function(event, context, callback) {
    var message = event.Records[0].Sns.Message;
    console.log('Message received from SNS: ', message);
    callback(null, 'Success');
};