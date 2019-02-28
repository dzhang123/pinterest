'use strict';

const noble = require('noble');

const Device = require('./device');
const rigadoSensorBeacon = require('./rigado-sensor-beacon');
const CloudProvider = require('./providers/provider');
const config = require('./config.json');

/**
 * Connected devices
 * @global
 */
const devices = {};

/**
 * Cloud Provider access
 * @global
 */
const provider = new CloudProvider(config);

function startScanning() {
  // Restart scanning
  // https://github.com/sandeepmistry/noble/issues/223
  if (noble.state === 'poweredOn') {
    noble.startScanning();
  } else {
    throw new Error('BLE poweredOff');
  }
}

/**
 * Called when a new device is discovered
 */
function onDiscover(beaconInst) {
  const device = new Device(beaconInst);

  // Ignore duplicates
  if (devices[device.id]) {
    console.log(`${device.id}: Duplicate device found, ignoring`);
    startScanning();
    return;
  }
  console.log(`Discovered: ${device.id}`);

  // Connect to device and setup
  device.setUp()
    .then(() => {
      device.onLuxometerChange((d, lux) => {
        const telemetry = {
          deviceID: d.id,
          light: lux.toFixed(1),
        };
        provider.sendTelemetry(telemetry);
      });

      // Wait for as long as possible before scanning again to avoid race
      // conditions
      startScanning();

      // Store in list of known devices
      devices[device.id] = device;

      // Set disconnect handler
      device.bleDevice.on('disconnect', function onDc() {
        console.log(`${device.id}: disconnected`);
        delete devices[device.id];
        device.bleDevice.removeListener('disconnect', onDc);
      });
    });
}

noble.on('scanStop', () => {
  console.log('Scanning stopped');
});

noble.on('scanStart', () => {
  console.log('Scanning started');
});

rigadoSensorBeacon.discoverAll(onDiscover);