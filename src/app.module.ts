import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { Flight } from './flights/flight.entity';
import { Booking } from './bookings/booking.entity';
import { Airport } from './airports/airport.entity';
import { Airplane } from './airplanes/airplane.entity';

// Every NestJS app starts from here.
// It tells NestJS:
// Which modules to load
// Which controllers to use
// Which services/providers to register globally
// Think of it as the main box that holds all other boxes (modules).

// ConfigModule.forRoot() is where you set up environment variables(things from .env file).

// TypeOrmModule.forRoot() creates a DataSource internally using your configuration. wrna wohi 
// const myDataSource = new DataSource({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "test",
//     password: "test",
//     database: "test",
//     entities: [User],
// }) wala kaam krna prhta. nestJS khud handle krleta hy ye
// It also initializes it for you.
// Then it makes that DataSource available everywhere in your app (you can inject it with
//  constructor(private dataSource: DataSource)(hm iske bjaye repository hi inject krlete hain) if you need it).
@Module({
  imports: [
    // database setup
    TypeOrmModule.forRoot({ //in .forRoot(), you tell nestJS how to connect to database. just needs to be defined here and used all over the project.
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'flight_management',
      // autoLoadEntities: true,   // if you forget to add a new entity, TypeORM won’t know about it. so, use this instead, then you wont need to enter entities manually
      entities: [User, Flight, Booking, Airport, Airplane], // To begin using the User entity, we need to let TypeORM know about it by inserting it into the entities array in the module forRoot() method options 
      synchronize: true,
    }),
    UsersModule,  //module imported here so NestJS knows about it.

    
  ],
  controllers: [], // usually empty, unless you want global controllers
  providers: [],   // usually empty, unless you want global services
})
export class AppModule {}
