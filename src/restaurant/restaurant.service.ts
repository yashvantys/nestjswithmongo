import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from './schema/restaurant.schema';
import { UpdateRestaurantDto } from './dtos/rest/restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<Restaurant>,
  ) {}
  async createRestaurant(data: Restaurant): Promise<Restaurant> {
    return this.restaurantModel.create(data);
  }

  async getAllRestaurant(): Promise<Restaurant[]> {
    return this.restaurantModel.find({}).lean().exec();
  }

  async getRestaurantById(id: string): Promise<Restaurant | null> {
    return this.restaurantModel.findById(id).lean().exec();
  }

  async updateRestaurant(
    id: string,
    data: UpdateRestaurantDto,
  ): Promise<Restaurant | null> {
    return this.restaurantModel
      .findByIdAndUpdate(id, data, { new: true })
      .lean()
      .exec();
  }

  async deleteRestaurantById(id: string): Promise<boolean> {
    const result = await this.restaurantModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
