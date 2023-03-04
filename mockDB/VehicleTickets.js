export class VehicleTickets {
    constructor() {
        this.vehicleTickets = new Map();
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
            const tickets = this.vehicleTickets.get(number);
            for (const each of tickets) {
                if (each.id === ticket.id) {
                    each.exitTime = ticket.exitTime;
                    each.price = ticket.price;
                }
            }
            this.vehicleTickets.set(number, tickets);
        }
    }
}