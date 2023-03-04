class ParkingTicket {
    constructor(id, vehicleNumber, vehicleType, parkingLotId, parkingSpotId, entryTime) {
        this.id =id;
        this.vehicleNumber = vehicleNumber;
        this.vehicleType = vehicleType;
        this.parkingLotId = parkingLotId;
        this.parkingSpotId = parkingSpotId;
        this.entryTime = entryTime;
    }

    exit(exitTime, price) {
        this.exitTime = exitTime;
        this.price = price;
    }
}

module.exports = ParkingTicket;