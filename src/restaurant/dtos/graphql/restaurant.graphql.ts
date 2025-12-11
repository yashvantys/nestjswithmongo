// src/restaurant/dto/restaurant.graphql.ts
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContactType {
  @Field() email: string;
  @Field() phone: string;
}

@ObjectType()
export class AddressType {
  @Field() street: string;
  @Field() city: string;
  @Field() state: string;
  @Field() country: string;
  @Field() pincode: string;
}

@ObjectType()
export class LocationType {
  @Field(() => Float) lat: number;
  @Field(() => Float) long: number;
}

@ObjectType()
export class RestaurantType {
  @Field(() => ID) _id: string;
  @Field() name: string;
  @Field(() => [String]) cuisine: string[];
  @Field(() => Float) rating: number;
  @Field(() => Int) reviewsCount: number;
  @Field() priceRange: string;
  @Field(() => ContactType) contact: ContactType;
  @Field(() => AddressType) address: AddressType;
  @Field(() => LocationType) location: LocationType;
  @Field() isOpen: boolean;
}
