import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() regiterUserDto: RegisterUserDto): unknown {
    return this.client.send('auth.register.user', regiterUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto): unknown {
    return this.client.send('auth.login.user', loginUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@User() user: CurrentUser, @Token() token: string): unknown {
    return {
      user,
      token,
    };
  }
}
