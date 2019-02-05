'use strict';

class Device {
  constructor(bleDevice) {
    this.id = bleDevice.address.replace(/:/g, '');
    this.bleDevice = bleDevice;
    this.fwVersion = null;
  }

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

  enableLuxometer() {
    return new Promise((resolve) => {
      console.log(`${this.id}: enableLuxometer`);
      this.bleDevice.enableLuxometer(resolve);
    });
  }
  
  notifyLuxometer() {
    return new Promise((resolve) => {
      console.log(`${this.id}: notifyLuxometer`);
      this.bleDevice.notifyLuxometer(resolve);
    });
  }
  
  onLuxometerChange(sendTelemetry) {
    console.log(`${this.id}: set up onluxchange`);
    this.bleDevice.on('luxometerChange', (lux) => {
      sendTelemetry(this, lux);
    });
  
    return this.notifyLuxometer();
  }




}

module.exports = Device;