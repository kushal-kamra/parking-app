;class ParkingSpot {
    constructor(id, parkingLotId, type) {
        this.id = id;
        this.parkingLotId = parkingLotId;
        this.type = type;
        this.isAvailable = true;
    }

    setAvailability(availability) {
        this.isAvailable = availability;
    }
}

module.exports = ParkingSpot;