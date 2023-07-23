import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { expDto } from './dto/exp.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async emptyQuestion(): Promise<string> {
    return await this.appService.emptyQuestion();
  }

  @Get('/sqrt/:number')
  async sqrt(@Param() num: { number: number }): Promise<number> {
    return await this.appService.sqrt(num);
  }

  @Post('exp')
  async exponentiation(@Body() dto: expDto): Promise<number> {
    return await this.appService.exponentiation(dto);
  }
}
