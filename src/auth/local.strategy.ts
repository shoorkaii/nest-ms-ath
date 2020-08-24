import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {Strategy} from 'passport-local'
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef){
    super({
      passReqToCallback: true
    })
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validation(username, password);

    if(!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}