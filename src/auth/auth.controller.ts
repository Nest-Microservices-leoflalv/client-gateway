import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(): unknown {
    return this.client.send('auth.register.user', {});
  }

  @Post('login')
  loginUser(): unknown {
    return this.client.send('auth.login.user', {});
  }

  @Get('verify')
  verifyToken(): unknown {
    return this.client.send('auth.verify.user', {});
  }
}
