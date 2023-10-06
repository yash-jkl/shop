import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor() {
    super(`Data Not Found`, HttpStatus.NOT_FOUND);
  }
}
