'use strict';

const NobleDevice = require('noble-device');

const BMDEVAL_UUID_SERVICE = '50db1523418d46909589ab7be9e22684';
const BMDEVAL_UUID_BUTTON_CHAR = '50db1524418d46909589ab7be9e22684';
// const BMDEVAL_UUID_LED_CHAR = '50db1525418d46909589ab7be9e22684';
const BMDEVAL_UUID_ADC_CHAR = '50db1526418d46909589ab7be9e22684';
const BMDEVAL_UUID_CTRL_CHAR = '50db1527418d46909589ab7be9e22684';
const BMDEVAL_UUID_ACCEL_CHAR = '50db1528418d46909589ab7be9e22684';

// Control Point commands
const DEBUG_RESERVED = Buffer.allocUnsafe(1);
const ADC_STREAM_START = Buffer.allocUnsafe(1);
const ADC_STREAM_STOP = Buffer.allocUnsafe(1);
const DEACTIVATE_LEDS = Buffer.allocUnsafe(1);
const ACCEL_STREAM_START = Buffer.allocUnsafe(1);
const ACCEL_STREAM_STOP = Buffer.allocUnsafe(1);
const SOFT_RESET = Buffer.allocUnsafe(4);
DEBUG_RESERVED.writeUInt8(0x00, 0);
ADC_STREAM_START.writeUInt8(0x01, 0);
ADC_STREAM_STOP.writeUInt8(0x02, 0);
DEACTIVATE_LEDS.writeUInt8(0x03, 0);
ACCEL_STREAM_START.writeUInt8(0x06, 0);
ACCEL_STREAM_STOP.writeUInt8(0x09, 0);
SOFT_RESET.writeUInt32LE(0xE7D6FCA1, 0);

const rigadoSensorBeacon = function (peripheral) {
  NobleDevice.call(this, peripheral);

  this.onSimpleKeyChangeBinded = this.onSimpleKeyChange.bind(this);
  this.onLuxometerChangeBinded = this.onLuxometerChange.bind(this);
  this.onAccelerometerChangeBinded = this.onAccelerometerChange.bind(this);
};

// rigadoSensorBeacon.SCAN_UUIDS = [BMDEVAL_UUID_SERVICE];
// rigadoSensorBeacon.SCAN_DUPLICATES = true;

// TODO: the local name and uuid may need to be configureable
rigadoSensorBeacon.is = function (peripheral) {
  return (peripheral.advertisement.localName === 'EvalDemo' || peripheral.uuid === BMDEVAL_UUID_SERVICE);
};

NobleDevice.Util.inherits(rigadoSensorBeacon, NobleDevice);
NobleDevice.Util.mixin(rigadoSensorBeacon, NobleDevice.DeviceInformationService);

rigadoSensorBeacon.prototype.writeServiceDataCharacteristic = function (uuid, data, callback) {
  this.writeDataCharacteristic(BMDEVAL_UUID_SERVICE, uuid, data, callback);
};

rigadoSensorBeacon.prototype.readServiceDataCharacteristic = function (uuid, callback) {
  this.readDataCharacteristic(BMDEVAL_UUID_SERVICE, uuid, callback);
};

rigadoSensorBeacon.prototype.readAccel = function (callback) {
  this.readUInt16LECharacteristic(BMDEVAL_UUID_SERVICE, BMDEVAL_UUID_ACCEL_CHAR, function (error, value) {
    if (error) {
      callback(error);
    } else {
      const Accel = 1.36 * (value / 1662.0);
      callback(error, Accel);
    }
  }.bind(this));
};


rigadoSensorBeacon.prototype.enableAccelerometer = function (callback) {
  this.writeDataCharacteristic(BMDEVAL_UUID_SERVICE, BMDEVAL_UUID_CTRL_CHAR, ACCEL_STREAM_START, callback);
};

rigadoSensorBeacon.prototype.disableAccelerometer = function (callback) {
  this.writeDataCharacteristic(BMDEVAL_UUID_SERVICE, BMDEVAL_UUID_CTRL_CHAR, ACCEL_STREAM_STOP, callback);
};

rigadoSensorBeacon.prototype.readAccelerometer = function (callback) {
  this.readDataCharacteristic(BMDEVAL_UUID_SERVICE, BMDEVAL_UUID_ACCEL_CHAR, function(error, data) {
    if (error) {
      return callback(error);
    }

    this.convertAccelerometerData(data, function (x, y, z) {
      callback(null, x, y, z);
    }.bind(this));
  }.bind(this));
};

rigadoSensorBeacon.prototype.onAccelerometerChange = function (data) {
  this.convertAccelerometerData(data, function (x, y, z) {
    this.emit('accelerometerChange', x, y, z);
  }.bind(this));
};

rigadoSensorBeacon.prototype.convertAccelerometerData = function (data, callback) {
  // var x = this.extendSignAccelerometerData(data.readIntLE16(0));
  // var y = this.extendSignAccelerometerData(data.readIntLE16(2));
  // var z = this.extendSignAccelerometerData(data.readIntLE16(4));

  let x = data.readInt8(0);
  let y = data.readInt8(1);
  let z = data.readInt8(2);

  callback(x, y, z);
};

rigadoSensorBeacon.prototype.extendSignAccelerometerData = function (extended, callback) {
  if (extended & 0x0800) {
    extended |= 0xF000;
  }
  callback(extended);
};

rigadoSensorBeacon.prototype.notifyAccelerometer = function (callback) {
  this.notifyCharacteristic(BMDEVAL_UUID_SERVICE, BMDEVAL_UUID_ACCEL_CHAR, true, this.onAccelerometerChangeBinded, callback);
};

rigadoSensorBeacon.prototype.unnotifyAccelerometer = function (callback) {
  this.notifyCharacteristic(BMDEVAL_UUID_SERVICE, BMDEVAL_UUID_ACCEL_CHAR, false, this.onAccelerometerChangeBinded, callback);
};

rigadoSensorBeacon.prototype.onSimpleKeyChange = function (data) {
  this.convertSimpleKeyData(data, function (/* left, right, ... */) {
    let emitArguments = Array.prototype.slice.call(arguments);
    emitArguments.unshift('simpleKeyChange');

    this.emit.apply(this, emitArguments);
  }.bind(this));
};

rigadoSensorBeacon.prototype.convertSimpleKeyData = function (data, callback) {
  const b = data.readUInt8(0);

  let left = (b & 0x10) ? true : false;
  let right = (b & 0x1) ? true : false;

  callback(left, right);
};

rigadoSensorBeacon.prototype.notifySimpleKey = function (callback) {
  this.notifyCharacteristic(BMDEVAL_UUID_SERVICE, BMDEVAL_UUID_BUTTON_CHAR, true, this.onSimpleKeyChangeBinded, callback);
};

rigadoSensorBeacon.prototype.unnotifySimpleKey = function (callback) {
  this.notifyCharacteristic(BMDEVAL_UUID_SERVICE, BMDEVAL_UUID_BUTTON_CHAR, false, this.onSimpleKeyChangeBinded, callback);
};


rigadoSensorBeacon.prototype.enableADC = function (callback) {
  this.writeDataCharacteristic(BMDEVAL_UUID_SERVICE, BMDEVAL_UUID_CTRL_CHAR, ADC_STREAM_START, callback);
};

rigadoSensorBeacon.prototype.disableADC = function (callback) {
  this.writeDataCharacteristic(BMDEVAL_UUID_SERVICE, BMDEVAL_UUID_CTRL_CHAR, ADC_STREAM_STOP, callback);
};

rigadoSensorBeacon.prototype.notifyADC = function (callback) {
  this.onADCChangeBinded = this.onADCChange.bind(this);
  this.notifyCharacteristic(BMDEVAL_UUID_SERVICE, BMDEVAL_UUID_ADC_CHAR, true, this.onADCChangeBinded, callback);
};

rigadoSensorBeacon.prototype.unnotifyADC = function (callback) {
  this.notifyCharacteristic(BMDEVAL_UUID_SERVICE, BMDEVAL_UUID_ADC_CHAR, false, this.onADCChangeBinded, callback);
};

rigadoSensorBeacon.prototype.onADCChange = function (data) {
  this.convertADC(data, function (counter) {
    this.emit('ADCChange', counter);
  }.bind(this));
};

rigadoSensorBeacon.prototype.enableLuxometer = function (callback) {
  this.writeDataCharacteristic(BMDEVAL_UUID_SERVICE, BMDEVAL_UUID_CTRL_CHAR, ADC_STREAM_START, callback);
};

rigadoSensorBeacon.prototype.disableLuxometer = function (callback) {
  this.writeDataCharacteristic(BMDEVAL_UUID_SERVICE, BMDEVAL_UUID_CTRL_CHAR, ADC_STREAM_STOP, callback);
};

rigadoSensorBeacon.prototype.notifyLuxometer = function (callback) {
  this.onLuxometerChangeBinded = this.onLuxometerChange.bind(this);
  this.notifyCharacteristic(BMDEVAL_UUID_SERVICE, BMDEVAL_UUID_ADC_CHAR, true, this.onLuxometerChangeBinded, callback);
};

rigadoSensorBeacon.prototype.unnotifyLuxometer = function (callback) {
  this.notifyCharacteristic(BMDEVAL_UUID_SERVICE, BMDEVAL_UUID_ADC_CHAR, false, this.onLuxometerChangeBinded, callback);
};

rigadoSensorBeacon.prototype.onLuxometerChange = function (data) {
  this.convertLuxometer(data, function (count) {
    this.emit('luxometerChange', count);
  }.bind(this));
};

rigadoSensorBeacon.prototype.convertLuxometer = function (data, callback) {
  let rawLux = data.readUIntLE(0);

  //var exponent = (rawLux & 0xF000) >> 12;
  //var mantissa = (rawLux & 0x0FFF);

  //var flLux = mantissa * Math.pow(2, exponent) / 100.0;

  callback(rawLux);
};

rigadoSensorBeacon.prototype.softReset = function (callback) {
  this.writeDataCharacteristic(BMDEVAL_UUID_SERVICE, BMDEVAL_UUID_CTRL_CHAR, SOFT_RESET, callback);
};

module.exports = rigadoSensorBeacon;
