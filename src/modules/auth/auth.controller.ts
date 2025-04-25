import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { TemplateService } from 'src/shared/template/template.service';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { GitHubLoginDoc, GoogleLoginDoc, LogoutDoc, RefreshTokenDoc } from './docs/auth.docs';
import { LogoutDto } from './dto/logout.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly templateService: TemplateService,
  ) {}


  @GitHubLoginDoc()
  @UseGuards(AuthGuard('github'))
  @Get('github')
  async githubLogin() {
  }

  
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('github'))
  @Get('github/callback')
  async githubRedirect(@Req() req, @Res() res) {
    const { accessToken, refreshToken } = await this.authService.socialLogin(req.user);
    const redirectUrl = `notray://auth-success?accessToken=${accessToken}&refreshToken=${refreshToken}`;

    const html = this.templateService.getHtmlTemplate('oauth-redirect.html', {
      REDIRECT_URL: redirectUrl,
    });
  
    return res.send(html);
  }


  @GoogleLoginDoc()
  @UseGuards(AuthGuard('google'))
  @Get('google')
  googleLogin() {}


  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleRedirect(@Req() req, @Res() res) {
    const { accessToken, refreshToken } = await this.authService.socialLogin(req.user);
    const redirectUrl = `notray://auth-success?accessToken=${accessToken}&refreshToken=${refreshToken}`;

    const html = this.templateService.getHtmlTemplate('oauth-redirect.html', {
      REDIRECT_URL: redirectUrl,
    });
  
    return res.send(html);
  }

  @RefreshTokenDoc()
  @HttpCode(200)
  @Post('refresh')
  async refresh(@Body() body: RefreshTokenDto) {
    return this.authService.refreshToken(body.refreshToken);
  }

  @LogoutDoc()
  @HttpCode(200)
  @Post('logout')
  async logout(@Body() body: LogoutDto) {
    await this.authService.logout(body.userId);
  }
}
