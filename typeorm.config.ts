import { DataSource } from 'typeorm';
import { Flight } from './src/flights/flight.entity';
import { Booking } from './src/bookings/booking.entity';
import { Ticket } from './src/tickets/ticket.entity';
import { Payment } from './src/payments/payment.entity';
import { Airplane } from './src/airplanes/airplane.entity';
import { Airport } from './src/airports/airport.entity';
import { User } from './src/users/user.entity';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'flight_management',
  entities: [Flight, Booking, Ticket, Payment, Airplane, Airport, User],
  migrations: ['dist/migrations/*.js'], // always compiled JS in dist
});
