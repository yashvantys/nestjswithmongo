import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Put,
  Body,
  Post,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import {
  CreateRestaurantDto,
  IdParamDto,
  UpdateRestaurantDto,
} from './dtos/rest/restaurant.dto';
import { Restaurant } from './schema/restaurant.schema';

@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}
  @Post()
  createRestaurant(@Body() body: CreateRestaurantDto): Promise<Restaurant> {
    return this.restaurantService.createRestaurant(body);
  }
  @Get()
  getAllRestaurant(): Promise<Restaurant[]> {
    return this.restaurantService.getAllRestaurant();
  }

  @Get(':id')
  getRestaurantById(@Param() param: IdParamDto): Promise<Restaurant | null> {
    return this.restaurantService.getRestaurantById(param.id);
  }
  @Delete(':id')
  deleteRestaurant(@Param('id') id: string): Promise<boolean> {
    return this.restaurantService.deleteRestaurantById(id);
  }

  @Put(':id')
  updateRestaurant(
    @Param('id') id: string,
    @Body() body: UpdateRestaurantDto,
  ): Promise<Restaurant | null> {
    return this.restaurantService.updateRestaurant(id, body);
  }
}
