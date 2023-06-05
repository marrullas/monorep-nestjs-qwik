import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUsers(): string[] {
    return ['John', 'Doe'];
  }
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
