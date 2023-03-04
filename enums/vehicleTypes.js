class VehicleTypes {
    constructor() {
        this.car = 'car';
        this.twoWheeler = 'twoWheeler';
    }

    addVehicleType(type) {
        this[type] = type;
    }
}

module.exports = VehicleTypes;