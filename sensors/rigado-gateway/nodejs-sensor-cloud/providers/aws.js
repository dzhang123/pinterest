'use strict';

const AWS = require('aws-sdk');
const firehoser = require('firehoser');
const dateFormat = require('dateformat');

const ProviderStrategy = require('./providerStrategy.js');

/**
 * A concrete Cloud Provider strategy for interacting with AWS Kinesis Firehose.
 */
class AWSProvider extends ProviderStrategy {
  /**
   * Initializes AWS config and a Firehose delivery stream
   */
  constructor(config) {
    super(config);
    this.name = 'AWS';

    AWS.config.update({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      region: config.region,
    });

    this.firehose = new firehoser.JSONDeliveryStream(config.deliveryStream)
  }

  connectGateway() {
    console.log('[AWS] connectGateway');
  }

  sendTelemetry(telemetry) {
    const now = new Date();
    // AWS needs a specific time format
    telemetry.timestamp = dateFormat(now, "yyyy-mm-dd hh:mm:ss.l");
    this.firehose.putRecord(telemetry)
      .then(() => {
        console.log('[AWS] sent telemetry');
      })
      .catch((err) => {
        console.log(`[AWS] error sending telemetry: ${JSON.stringify(err)}`);
      });
  }
}

module.exports = AWSProvider;
