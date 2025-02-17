import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';

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

  @Get('verify')
  verifyToken(): unknown {
    return this.client.send('auth.verify.user', {});
  }
}
