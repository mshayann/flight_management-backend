"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const flight_entity_1 = require("./src/flights/flight.entity");
const booking_entity_1 = require("./src/bookings/booking.entity");
const ticket_entity_1 = require("./src/tickets/ticket.entity");
const payment_entity_1 = require("./src/payments/payment.entity");
const airplane_entity_1 = require("./src/airplanes/airplane.entity");
const airport_entity_1 = require("./src/airports/airport.entity");
const user_entity_1 = require("./src/users/user.entity");
exports.default = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'flight_management',
    entities: [flight_entity_1.Flight, booking_entity_1.Booking, ticket_entity_1.Ticket, payment_entity_1.Payment, airplane_entity_1.Airplane, airport_entity_1.Airport, user_entity_1.User],
    migrations: ['dist/migrations/*.js'],
});
//# sourceMappingURL=typeorm.config.js.map