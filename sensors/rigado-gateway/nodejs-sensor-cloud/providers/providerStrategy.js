'use strict';

const os = require('os');

/**
 * Defines the public interface for all Cloud Provider strategies
 */
class ProviderStrategy {
  constructor(config) {
    this.config = config;
    this.hostname = os.hostname();
    this.osName = os.type();
    this.NotYetImplementedError = new Error('Not yet implemented');
  }

  /**
   * Sends information about this gateway to the Cloud Provider
   * to get it connected. Should return the Gateway's authentication
   *  credentials.
   */
  connectGateway() {
    return Promise.reject(this.NotYetImplementedError);
  }

  /**
   * Inform the Cloud Provider that the Gateway is alive and well
   */
  sendHeartbeat() {
    return Promise.reject(this.NotYetImplementedError);
  }

  /**
   * Send sensor telemetry data to the Cloud Provider
   */
  sendTelemetry(json) {
    return Promise.reject(this.NotYetImplementedError);
  }

  /**
   * Inform the Cloud Provider about a new sensor device that
   * this Gateway is connected to
   */
  connectEndDevice(device) {
    return Promise.reject(this.NotYetImplementedError);
  }
}

module.exports = ProviderStrategy;
