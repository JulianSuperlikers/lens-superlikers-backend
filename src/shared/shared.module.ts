import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { HttpClientBase } from './services/http-client-base/http-client-base.service';
import { EnvService } from './services/env/env.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [HttpClientBase, EnvService],
  exports: [HttpClientBase, EnvService],
})
export class SharedModule {}
