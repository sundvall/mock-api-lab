import { InMemoryDbService } from 'angular-in-memory-web-api';
import ResponseExample from '../shared/types/response-example.model';
import * as responseJson from './mocks/response-1.json';
/**
 * Mocked response database.
 * The response:
    {[ 
        { id: 'id1', name: 'name-1', info: 'info-1},
        { id: 'id2', name: 'name-2', info: 'info-2},
        ...
        { id: 'idN', name: 'name-N', info: 'info-N},
    ]}
 *
 * ref:
 * https://github.com/angular/in-memory-web-api
 */
export class InMemoryDbItemService implements InMemoryDbService {
  createDb() {
    const responseExample: ResponseExample[] = [].concat(responseJson)[0].default;
    return { responseExample };
  }
}
