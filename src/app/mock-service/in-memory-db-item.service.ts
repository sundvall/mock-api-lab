import { InMemoryDbService } from 'angular-in-memory-web-api';
import ResponseExample from '../shared/types/response-example.model';
import * as responseJson from './mocks/response-1.json';
/**
 * Mocked response database.
 * ref:
 * https://github.com/angular/in-memory-web-api
 */
export class InMemoryDbItemService implements InMemoryDbService {
  createDb() {
    const responseExample: ResponseExample[] = [].concat(responseJson)[0].default;
    return { responseExample };
  }
}
