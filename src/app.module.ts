import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    RestaurantModule,
    MongooseModule.forRoot('mongodb://localhost/restaurant'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true, // or set to false in prod
      sortSchema: true,
      path: '/graphql',
      // If you want validation/transformation of inputs:
      // context, cors, subscriptions, etc. can be configured here
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
