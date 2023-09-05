import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategy';

@Module({
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
