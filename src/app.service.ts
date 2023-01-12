import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { message: 'Codemania - Simple Social Media Platform!' };
  }
}
