import { HttpException, HttpStatus } from '@nestjs/common';

export class PaymentException extends HttpException {
  constructor() {
    super(`Payments exception`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
