import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseConnectionException extends HttpException {
  constructor() {
    super(`Database error! Try again latter`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
