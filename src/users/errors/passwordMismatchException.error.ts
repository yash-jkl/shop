import { HttpException, HttpStatus } from '@nestjs/common';

export class passwordMismatchException extends HttpException {
  constructor() {
    super(`Old Password Incorrect`, HttpStatus.UNAUTHORIZED);
  }
}
