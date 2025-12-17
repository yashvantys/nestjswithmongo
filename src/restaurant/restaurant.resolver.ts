import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';
import {
  CreateRestaurantInput,
  UpdateRestaurantInput,
} from './dtos/graphql/restaurant.inputs';
import { RestaurantType } from './dtos/graphql/restaurant.graphql';
import { Restaurant } from './schema/restaurant.schema';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => RestaurantType)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query(() => [RestaurantType], { name: 'restaurants' })
  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAllRestaurant();
  }

  @Query(() => RestaurantType)
  async getRestaurant(@Args('id') id: string) {
    const restaurant = await this.restaurantService.getRestaurantById(id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found`);
    }
    return restaurant;
  }

  @Mutation(() => RestaurantType)
  createRestaurant(@Args('input') input: CreateRestaurantInput) {
    return this.restaurantService.createRestaurant(input);
  }

  @Mutation(() => RestaurantType)
  async updateRestaurant(
    @Args('id') id: string,
    @Args('input') input: UpdateRestaurantInput,
  ) {
    const updated = await this.restaurantService.updateRestaurant(id, input);
    if (!updated) {
      throw new NotFoundException(`Restaurant with id ${id} not found`);
    }
    return updated;
  }

  @Mutation(() => Boolean)
  async deleteRestaurant(@Args('id') id: string) {
    await this.restaurantService.deleteRestaurantById(id);
    return true;
  }
}
