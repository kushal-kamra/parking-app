const ParkingSpot = require('./ParkingSpot');
const ParkingTicket = require('./ParkingTicket');
const VehicleTypes = require('../enums/vehicleTypes');

//electricCar

class ParkingLot {
    constructor(id, t, capacities) {
        this.id = id;
        this.tickets = new Map();
        this.vehicleTickets = new Map();
        this.pricesPerHour = prices;
        this.maxCapacities = capacities;
        this.currentlyAcquired = {};
        for (const each in capacities) {
            this.currentlyAcquired[each] = 0;
        }
        this.parkingSpots = [];
        for (const each in capacities) {
            for (let i = 0; i < capacities[each]; i += 1) {
                const parkingSpot = new ParkingSpot(i, id, each);
                this.parkingSpots.push(parkingSpot);
            }
        }
    }

    getVehicleTickets(number) {
        if (!this.vehicleTickets.has(number)) {
            console.log('No Vehicle');
        } else {
            return this.vehicleTickets.get(number);
        }
    }

    updateVehicleTicketsOnEntry(number, ticket) {
        if (!this.vehicleTickets.has(number)) {
            this.vehicleTickets.set(number, [ticket]);
        } else {
            const tickets = this.vehicleTickets.get(number);
            tickets.push(ticket);
            this.vehicleTickets.set(number, tickets);
        }
    }

    updateVehicleTicketsOnExit(ticket) {
        const vehicleNumber = ticket.vehicleNumber;
        if (!this.vehicleTickets.has(vehicleNumber)) {
            console.log('No vechicle Found');
        } else {
            const tickets = this.vehicleTickets.get(vehicleNumber);
            for (const each of tickets) {
                if (each.id === ticket.id) {
                    each.exitTime = ticket.exitTime;
                    each.price = ticket.price;
                }
            }
            this.vehicleTickets.set(vehicleNumber, tickets);
        }
    }

    // unique contrainst

    // booking table

    // parkingspotId

    park(vehicleNumber, vehicleType) {
        if (this.M[vehicleType] === this.maxCapacities[vehicleType]) {
            console.log('Sorry, we are full');
        } else {
            for (let i = 0; i < this.maxCapacities[vehicleType]; i += 1) {
                if (this.parkingSpots[i].isAvailable) {
                    this.currentlyAcquired[vehicleType] += 1;
                    this.parkingSpots[i].setAvailability(false);
                    const entryTime = Date.now();
                    const parkingTicket = new ParkingTicket(this.id + vehicleNumber + entryTime, vehicleNumber, vehicleType, this.id, i, entryTime);
                    this.tickets.set(this.id + vehicleNumber + entryTime, parkingTicket);
                    this.updateVehicleTicketsOnEntry(vehicleNumber, parkingTicket);
                    return parkingTicket.id;
                }
            }
        }
    }

    unPark(ticketId) {
        if (!this.tickets.has(ticketId)) {
            console.log('Sorry, Wrong ticket');
        } else {
            const ticket = this.tickets.get(ticketId);
            const exitTime = Date.now();
            const price = ((Number(exitTime) - Number(ticket.entryTime)) / (1000*60*60)) * this.pricesPerHour[ticket.vehicleType];
            ticket.exit(exitTime, price);
            this.tickets.set(ticketId, ticket);
            this.updateVehicleTicketsOnExit(ticket);
            this.currentlyAcquired[ticket.vehicleType] -= 1;
            this.parkingSpots[ticket.parkingSpotId].setAvailability(true);
        }
    }
}

function main() {
    const parkingLot = new ParkingLot('1', {car: 10, twoWheeler: 5}, {car: 10, twoWheeler: 100});
    const ticketId = parkingLot.park('1', 'car');
    console.log(parkingLot.getVehicleTickets('1'));
    parkingLot.unPark(ticketId);
    console.log(parkingLot.getVehicleTickets('1'));
}

main()

// SQL: VehicleTickets (vechicleid, ticketid)
//     ParkingLot (id, name, address)
//     ParkingSpots (id, parkingLotId, spotNumberInParkingLot)
//     ParkingLotTickets (parkingLotId, ticketId)
//     Booking (id, parkingSpotId)

//     ->queues
// NoSQL: Ticket (id, info)
