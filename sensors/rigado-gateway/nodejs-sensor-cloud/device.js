'use strict';

/**
 * A Device object manages an edge device and its bluetooth communication
 */
class Device {
  constructor(bleDevice) {
    this.id = bleDevice.address.replace(/:/g, '');
    this.bleDevice = bleDevice;
    this.fwVersion = null;
  }

  /**
   * Returns a Promise that will resolve with the ble device's firmware revision,
   * or reject with an error
   */
  readFirmware() {
    return new Promise((resolve, reject) => {
      console.log(`${this.id}: readFirmwareRevision`);
      this.bleDevice.readFirmwareRevision((error, firmwareRevision) => {
        if (error) {
          reject(error);
          return;
        }

        console.log(`${this.id}: firmware revision = ${firmwareRevision}`);
        this.fwVersion = firmwareRevision;

        resolve();
      });
    });
  }

  /**
   * Returns a Promise that will connect and set up the ble device with noble.
   * Once set up, it will read the device's firmware and enable its luxometer.
   */
  setUp() {
    return new Promise((resolve, reject) => {
      this.bleDevice.connectAndSetUp((setupError) => {
        if (setupError) {
          reject(new Error(setupError));
        }

        this.readFirmware()
          .then(this.enableLuxometer.bind(this))
          .then(() => {
            resolve(this);
          })
          .catch((err) => {
            console.log(`DEVICE SETUP ERROR: ${err}`);
            throw err;
          });
      });
    });
  }

  /**
   * Returns a Promise that will enable the device's luxometer
   */
  enableLuxometer() {
    return new Promise((resolve) => {
      console.log(`${this.id}: enableLuxometer`);
      this.bleDevice.enableLuxometer(resolve);
    });
  }

  /**
   * Returns a Promise that will notify the device's luxometer
   */
  notifyLuxometer() {
    return new Promise((resolve) => {
      console.log(`${this.id}: notifyLuxometer`);
      this.bleDevice.notifyLuxometer(resolve);
    });
  }

  /**
   * This function will bind its given callback to run when the ble device
   * triggers a 'luxometerChange' event.
   */
  onLuxometerChange(callback) {
    console.log(`${this.id}: set up onluxchange`);
    this.bleDevice.on('luxometerChange', (lux) => {
      callback(this, lux);
    });

    return this.notifyLuxometer();
  }
}

module.exports = Device;
