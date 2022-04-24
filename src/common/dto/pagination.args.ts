import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../constant';

@ArgsType()
export class PaginationArgs {
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0, { message: 'offset은 0 미만일 수 없습니다.' })
  @Field(() => Int)
  offset: number = DEFAULT_OFFSET;

  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Max(100, { message: 'limit은 100을 초과할 수 없습니다.' })
  @Min(1, { message: 'limit은 1 미만일 수 없습니다.' })
  @Field(() => Int)
  limit: number = DEFAULT_LIMIT;
}
