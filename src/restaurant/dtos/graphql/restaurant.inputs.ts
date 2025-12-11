// src/restaurant/dto/restaurant.inputs.ts
import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

@InputType()
export class ContactInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  phone: string;
}

@InputType()
export class AddressInput {
  @Field() @IsString() street: string;
  @Field() @IsString() city: string;
  @Field() @IsString() state: string;
  @Field() @IsString() country: string;
  @Field() @IsString() pincode: string;
}

@InputType()
export class LocationInput {
  @Field(() => Float)
  @Type(() => Number)
  @IsNumber()
  lat: number;

  @Field(() => Float)
  @Type(() => Number)
  @IsNumber()
  long: number;
}

@InputType()
export class CreateRestaurantInput {
  @Field() @IsString() name: string;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  cuisine: string[];

  @Field(() => Float)
  @Type(() => Number)
  @IsNumber()
  rating: number;

  @Field(() => Int)
  @Type(() => Number)
  @IsInt()
  reviewsCount: number;

  @Field() @IsString() priceRange: string;

  @Field(() => ContactInput)
  @ValidateNested()
  @Type(() => ContactInput)
  contact: ContactInput;

  @Field(() => AddressInput)
  @ValidateNested()
  @Type(() => AddressInput)
  address: AddressInput;

  @Field(() => LocationInput)
  @ValidateNested()
  @Type(() => LocationInput)
  location: LocationInput;

  @Field()
  @Type(() => Boolean)
  @IsBoolean()
  isOpen: boolean;
}

@InputType()
export class UpdateRestaurantInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cuisine?: string[];

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  rating?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  reviewsCount?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  priceRange?: string;

  @Field(() => ContactInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => ContactInput)
  contact?: ContactInput;

  @Field(() => AddressInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressInput)
  address?: AddressInput;

  @Field(() => LocationInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationInput)
  location?: LocationInput;

  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isOpen?: boolean;
}
