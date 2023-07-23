import { Inject, Injectable } from '@nestjs/common';
import { expDto } from './dto/exp.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('ToMs2') private ms2Proxy: ClientProxy) {}
  async sqrt(num: { number: number }): Promise<number> {
    return await lastValueFrom(this.ms2Proxy.send({ cmd: 'sqrt' }, num));
  }

  async exponentiation(dto: expDto): Promise<number> {
    return await lastValueFrom(this.ms2Proxy.send({ cmd: 'exp' }, dto));
  }

  async emptyQuestion(): Promise<string> {
    return await lastValueFrom(
      this.ms2Proxy.send({ cmd: 'emptyQuestion' }, {}),
    );
  }
}
