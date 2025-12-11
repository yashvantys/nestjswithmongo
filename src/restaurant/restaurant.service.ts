import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Restaurant } from './schema/restaurant.schema';
import { UpdateRestaurantDto } from './dtos/rest/restaurant.dto';
type RestaurantDocument = HydratedDocument<Restaurant>;
@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('Restaurant') private restaurantModel: Model<Restaurant>,
  ) {}
  async createRestaurant(data: Restaurant): Promise<Restaurant> {
    try {
      const response = await this.restaurantModel.create(data);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllRestaurant(): Promise<RestaurantDocument[]> {
    try {
      return await this.restaurantModel.find({}).exec();
    } catch (error) {
      throw new Error(error);
    }
  }
  async getRestaurantById(id: string): Promise<Restaurant | null> {
    try {
      const response = await this.restaurantModel.findOne({ _id: id }).exec();
      if (!response) {
        throw new NotFoundException(`Restaurant with id ${id} not found`);
      }
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteRestaurantBy(id: string): Promise<void> {
    try {
      const result = await this.restaurantModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Restaurant with id ${id} not found`);
      }
    } catch (err) {
      throw new InternalServerErrorException('Failed to delete restaurant');
    }
  }
  async updateRestaurant(
    id: string,
    data: UpdateRestaurantDto,
  ): Promise<Restaurant | null> {
    try {
      const updated = await this.restaurantModel
        .findByIdAndUpdate(id, data, { new: true })
        .exec();
      if (!updated) {
        throw new NotFoundException(`Restaurant with id ${id} not found`);
      }
      return updated;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update restaurant');
    }
  }
}
