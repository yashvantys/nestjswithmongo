import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';
import {
  CreateRestaurantInput,
  UpdateRestaurantInput,
} from './dtos/graphql/restaurant.inputs';
import { RestaurantType } from './dtos/graphql/restaurant.graphql';
import { Restaurant } from './schema/restaurant.schema';

@Resolver(() => RestaurantType)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query(() => [RestaurantType], { name: 'restaurants' })
  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAllRestaurant();
  }

  @Query(() => RestaurantType, { name: 'restaurant', nullable: true })
  getRestaurant(@Args('id') id: string) {
    return this.restaurantService.getRestaurantById(id);
  }

  @Mutation(() => RestaurantType)
  createRestaurant(@Args('input') input: CreateRestaurantInput) {
    return this.restaurantService.createRestaurant(input);
  }

  @Mutation(() => RestaurantType)
  updateRestaurant(
    @Args('id') id: string,
    @Args('input') input: UpdateRestaurantInput,
  ) {
    return this.restaurantService.updateRestaurant(id, input);
  }

  @Mutation(() => Boolean)
  async deleteRestaurant(@Args('id') id: string) {
    await this.restaurantService.deleteRestaurantBy(id);
    return true;
  }
}
