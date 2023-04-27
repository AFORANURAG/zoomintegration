import { Controller, Get,Post,Res,Req } from '@nestjs/common';
import { AppService } from './app.service';
import {FastifyReply,FastifyRequest} from "fastify"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello():Promise<string> {
    return this.appService.getHello();
  }
  @Post()
  createMeeting(@Req() req:FastifyRequest,@Res() res:FastifyReply){
    return this.appService.createMeeting(req,res);
  }
}
