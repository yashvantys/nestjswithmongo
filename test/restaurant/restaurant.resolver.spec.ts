import { Test, TestingModule } from '@nestjs/testing';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RestaurantResolver } from '../../src/restaurant/restaurant.resolver';
import { RestaurantService } from '../../src/restaurant/restaurant.service';
import {
  CreateRestaurantInput,
  UpdateRestaurantInput,
} from '../../src/restaurant/dtos/graphql/restaurant.inputs';

describe('RestaurantResolver', () => {
  let resolver: RestaurantResolver;
  let service: RestaurantService;

  const mockRestaurantService = {
    createRestaurant: jest.fn(),
    getAllRestaurant: jest.fn(),
    getRestaurantById: jest.fn(),
    updateRestaurant: jest.fn(),
    deleteRestaurantById: jest.fn(),
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

  it('should return all restaurants', async () => {
    const restaurants = [{ name: 'Restaurant 1' }];
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
    mockRestaurantService.getRestaurantById.mockRejectedValue(
      new NotFoundException(),
    );

    await expect(resolver.getRestaurant('1')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should create a restaurant', async () => {
    const input: CreateRestaurantInput = {
      name: 'Restaurant 1',
      cuisine: ['Indian'],
      rating: 4.5,
      reviewsCount: 100,
      priceRange: '$$',
      isOpen: true,
      contact: { email: 'test@test.com', phone: '123' },
      address: {
        street: 'Street',
        city: 'City',
        state: 'State',
        country: 'Country',
        pincode: '12345',
      },
      location: { lat: 10, long: 20 },
    };

    const created = { id: '1', ...input };
    mockRestaurantService.createRestaurant.mockResolvedValue(created);
    const result = await resolver.createRestaurant(input);
    expect(result).toEqual(created);
    expect(service.createRestaurant).toHaveBeenCalledWith(input);
  });

  it('should update a restaurant', async () => {
    const input: UpdateRestaurantInput = {
      name: 'Updated Name',
    };

    const updated = { id: '1', name: 'Updated Name' };
    mockRestaurantService.updateRestaurant.mockResolvedValue(updated);
    const result = await resolver.updateRestaurant('1', input);
    expect(result).toEqual(updated);
    expect(service.updateRestaurant).toHaveBeenCalledWith('1', input);
  });

  it('should throw NotFoundException if update target not found', async () => {
    mockRestaurantService.updateRestaurant.mockResolvedValue(null);
    await expect(
      resolver.updateRestaurant('1', { name: 'Test' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should delete a restaurant and return true', async () => {
    mockRestaurantService.deleteRestaurantById.mockResolvedValue(undefined);
    const result = await resolver.deleteRestaurant('1');
    expect(result).toBe(true);
    expect(service.deleteRestaurantById).toHaveBeenCalledWith('1');
  });

  it('should throw InternalServerErrorException if delete fails', async () => {
    mockRestaurantService.deleteRestaurantById.mockRejectedValue(
      new InternalServerErrorException(),
    );
    await expect(resolver.deleteRestaurant('1')).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
