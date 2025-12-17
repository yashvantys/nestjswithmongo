import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantResolver } from '../../src/restaurant/restaurant.resolver';
import { RestaurantService } from '../../src/restaurant/restaurant.service';
import {
  CreateRestaurantInput,
  UpdateRestaurantInput,
} from 'src/restaurant/dtos/graphql/restaurant.inputs';

describe('RestaurantResolver', () => {
  let resolver: RestaurantResolver;
  let service: RestaurantService;

  const mockRestaurantService = {
    getAllRestaurant: jest.fn(),
    getRestaurantById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantResolver,
        {
          provide: RestaurantService,
          useValue: mockRestaurantService,
        },
      ],
    }).compile();

    resolver = module.get<RestaurantResolver>(RestaurantResolver);
    service = module.get<RestaurantService>(RestaurantService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return all restaurants', async () => {
    const restaurants = [
      {
        name: 'Restaurant 1',
        cuisine: ['Cuisine 1', 'Cuisine 2'],
        rating: 4.5,
        reviewsCount: 100,
        isOpen: true,
        priceRange: '$$',
        contact: { email: 'email1', phone: 'phone1' },
        address: {
          street: 'Address 1',
          city: 'City 1',
          state: 'State 1',
          country: 'Country 1',
          pincode: 'Pincode 1',
        },
        location: { lat: 12.34, long: 56.78 },
      },
    ];

    mockRestaurantService.getAllRestaurant.mockResolvedValue(restaurants);

    const result = await resolver.getAllRestaurants();

    expect(result).toEqual(restaurants);
    expect(service.getAllRestaurant).toHaveBeenCalledTimes(1);
  });

  it('should return a restaurant by id', async () => {
    const restaurant = { name: 'Restaurant 1' };

    mockRestaurantService.getRestaurantById.mockResolvedValue(restaurant);

    const result = await resolver.getRestaurant('1');

    expect(result).toEqual(restaurant);
    expect(service.getRestaurantById).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if restaurant not found', async () => {
    mockRestaurantService.getRestaurantById.mockResolvedValue(null);

    await expect(resolver.getRestaurant('1')).rejects.toThrow(
      NotFoundException,
    );
  });
});
describe('RestaurantResolver - Mutations', () => {
  let resolver: RestaurantResolver;
  let service: RestaurantService;

  const mockRestaurantService = {
    createRestaurant: jest.fn(),
    updateRestaurant: jest.fn(),
    deleteRestaurantBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantResolver,
        {
          provide: RestaurantService,
          useValue: mockRestaurantService,
        },
      ],
    }).compile();

    resolver = module.get<RestaurantResolver>(RestaurantResolver);
    service = module.get<RestaurantService>(RestaurantService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ---------- CREATE ----------
  it('should create a restaurant', async () => {
    const input: CreateRestaurantInput = {
      name: 'Restaurant 1',
      cuisine: ['Indian'],
      rating: 4.5,
      reviewsCount: 100,
      priceRange: '$$',
      isOpen: true,
      contact: { email: 'a@test.com', phone: '123' },
      address: {
        street: 'Street',
        city: 'City',
        state: 'State',
        country: 'Country',
        pincode: '12345',
      },
      location: { lat: 12.34, long: 56.78 },
    };

    const createdRestaurant = { id: '1', ...input };

    mockRestaurantService.createRestaurant.mockResolvedValue(createdRestaurant);

    const result = await resolver.createRestaurant(input);

    expect(result).toEqual(createdRestaurant);
    expect(service.createRestaurant).toHaveBeenCalledWith(input);
    expect(service.createRestaurant).toHaveBeenCalledTimes(1);
  });

  // ---------- UPDATE ----------
  it('should update a restaurant', async () => {
    const input: UpdateRestaurantInput = {
      name: 'Updated Name',
      rating: 4.8,
    };

    const updatedRestaurant = {
      id: '1',
      name: 'Updated Name',
      rating: 4.8,
    };

    mockRestaurantService.updateRestaurant.mockResolvedValue(updatedRestaurant);

    const result = await resolver.updateRestaurant('1', input);

    expect(result).toEqual(updatedRestaurant);
    expect(service.updateRestaurant).toHaveBeenCalledWith('1', input);
    expect(service.updateRestaurant).toHaveBeenCalledTimes(1);
  });

  it('should throw NotFoundException if restaurant to update not found', async () => {
  mockRestaurantService.updateRestaurant.mockResolvedValue(null);

  await expect(
    resolver.updateRestaurant('1', { name: 'Test' }),
  ).rejects.toThrow(NotFoundException);
});

  // ---------- DELETE ----------
  it('should delete a restaurant and return true', async () => {
    mockRestaurantService.deleteRestaurantBy.mockResolvedValue(undefined);

    const result = await resolver.deleteRestaurant('1');

    expect(result).toBe(true);
    expect(service.deleteRestaurantBy).toHaveBeenCalledWith('1');
    expect(service.deleteRestaurantBy).toHaveBeenCalledTimes(1);
  });

  it('should throw NotFoundException if restaurant to delete not found', async () => {
    mockRestaurantService.deleteRestaurantBy.mockRejectedValue(
      new NotFoundException(),
    );

    await expect(resolver.deleteRestaurant('1')).rejects.toThrow(
      NotFoundException,
    );
  });
});
