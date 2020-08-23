import { Controller,Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  async login(@Request() req){
    return this.authService.login(req.user)
  }
}
