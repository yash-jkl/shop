import { Test, TestingModule } from '@nestjs/testing';
import { CartRepository } from '../../repository/cart.repository';
import { CartService } from '../../services/cart.service';
import { LoggerService } from '../../../utils/logger/winstonLogger';
import { mockCartRepository } from '../mocks';
import { Helper } from '../../helper/helper';

describe('Cart Service', () => {
  let cartService: CartService;
  let cartRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerService,
        CartService,
        Helper,
        {
          provide: CartRepository,
          useFactory: mockCartRepository,
        },
      ],
    }).compile();

    cartService = module.get<CartService>(CartService);
    cartRepository = module.get<CartRepository>(CartRepository);
  });

  it('Cart Service to be defined', () => {
    expect(CartService).toBeDefined();
  });
});
