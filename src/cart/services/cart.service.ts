import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { CartRepository } from '../repository/cart.repository';

export interface ICartService {}

@Injectable()
export class CartService implements ICartService {
  constructor(
    @Inject(CartRepository)
    private readonly cartRepository: CartRepository,
    private readonly logger: LoggerService,
  ) {}

  static logInfo = 'Service - Cart';
}
