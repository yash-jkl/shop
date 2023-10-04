import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class checkCartResDto {
  @Expose()
  @ApiProperty({
    example:
      'https://checkout.stripe.com/c/pay/cs_test_b1t7rFoFPe3t9nxMXxzuxHudqzj6uHpoiuFgdXJ7UtjwQGmZT36Vqs5x1I#fidkdWxOYHwnPyd1blpxYHZxWjA0S3dhR2tWQm9%2FSkdmcVFcc2ZQQ3dmS2w9TnBVNH9han9jaDNEbHc2Mmo0b2ZQZnBNXDQ3UDZhMDJ0MmQxZamnvdbFJGT2hBYlBvf203bjNzYDF%2FbFVoPEI3NTVuQGlrUVdURycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPydocGlxbFpscWBoJyknYGtkZ2lgVWlkZmBtamlhYHd2Jz9xd3BgeCUl',
  })
  url: string;
}
