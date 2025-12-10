import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema({ _id: false })
class Contact {
  @Prop()
  email: string;
  @Prop()
  phone: string;
}
@Schema({ _id: false })
class Address {
  @Prop()
  street: string;
  @Prop()
  city: string;
  @Prop()
  state: string;
  @Prop()
  country: string;
  @Prop()
  pincode: string;
}
@Schema({ _id: false })
class Location {
  @Prop()
  lat: number;
  @Prop()
  long: number;
}

@Schema()
export class Restaurant {
  @Prop()
  name: string;
  @Prop()
  cuisine: string[];
  @Prop()
  rating: number;
  @Prop()
  reviewsCount: number;
  @Prop()
  priceRange: string;
  @Prop()
  contact: Contact;
  @Prop()
  address: Address;
  @Prop()
  location: Location;
  @Prop()
  isOpen: boolean;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
