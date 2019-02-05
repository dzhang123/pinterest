'use strict';

const AWSProvider = require('./aws.js');

/**
 * A Cloud Provider object for a calling script to refer to.
 */
class Provider {
  /**
   * Takes in a full config object (see config.json.sample).
   * Constructs a Provider based on the "cloudProvider" key in config.
   * Sets the Provider's concrete strategy if valid.
   */
  constructor(config) {
    if (typeof config.cloudProvider === 'undefined' ||
        Object.keys(config.cloudProvider).length === 0) {
      throw new Error('No cloudProvider in config');
    }
    const provider = Object.keys(config.cloudProvider)[0];
    const providerConfig = JSON.stringify(config.cloudProvider[provider], null, 4);
    console.log(`Provider: ${provider}`);
    console.log(`Config: ${providerConfig}`);
    switch (provider) {
      case 'aws':
        this.strategy = new AWSProvider(config.cloudProvider[provider]);
        break;
      default:
        throw new Error(`Unrecognized cloud provider '${provider}' in config.`);
    }
  }

  connectGateway() {
    return this.strategy.connectGateway();
  }
  sendHeartbeat() {
    return this.strategy.sendHeartbeat();
  }
  sendTelemetry(telemetry) {
    return this.strategy.sendTelemetry(telemetry);
  }
  connectEndDevice(device) {
    return this.strategy.connectEndDevice(device);
  }
}

module.exports = Provider;
