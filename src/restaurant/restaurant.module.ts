import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantSchema } from './schema/restaurant.schema';
import { RestaurantResolver } from './restaurant.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Restaurant',
        schema: RestaurantSchema,
      },
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService, RestaurantResolver],
})
export class RestaurantModule {}
