import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth.credential.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }
  @Post('/signIn')
  signIn(
    @Body() authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }
  // @Patch('/forgetPassword')
  // forgetPassword(@Body() user: User): Promise<{ accessToken: string }> {
  //   return this.authService.forgetPassword(user);
  // }
  // @Patch('/updatePassword')
  // updatePassword(@Body() user: User): Promise<{ ac}
}
