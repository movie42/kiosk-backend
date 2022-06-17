import { Controller, Get } from '@nestjs/common';

import { isDev, isProd } from './common/constant';

@Controller()
export class AppController {
  @Get('health')
  health(): string {
    return isProd ? 'prod ok1' : isDev ? 'dev ok2' : 'ok3';
  }
}
