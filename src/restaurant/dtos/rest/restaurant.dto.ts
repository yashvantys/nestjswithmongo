import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsMongoId,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class ContactDto {
  @IsEmail()
  email: string;
  @IsString()
  phone: string;
}

export class AddressDto {
  @IsString()
  street: string;
  @IsString()
  city: string;
  @IsString()
  state: string;
  @IsString()
  country: string;
  @IsString()
  pincode: string;
}

export class LocationDto {
  @Type(() => Number)
  @IsNumber()
  lat: number;
  @Type(() => Number)
  @IsNumber()
  long: number;
}

export class CreateRestaurantDto {
  @IsString()
  name: string;
  @IsArray()
  @IsString({ each: true })
  cuisine: string[];
  @Type(() => Number)
  @IsNumber()
  rating: number;
  @Type(() => Number)
  @IsNumber()
  reviewsCount: number;
  @IsString()
  priceRange: string;
  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @IsBoolean({ message: 'isOpen should be true or false' })
  isOpen: boolean;
}

export class IdParamDto {
  @IsMongoId()
  id: string;
}

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}
