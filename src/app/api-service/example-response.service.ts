import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import ResponseExample from '../shared/types/response-example.model';
/**
 * Get list of items from server.
 * ref:
 * https://github.com/angular/in-memory-web-api/blob/master/src/app/http-client-hero.service.ts
 */

@Injectable()
export class ExampleResponseService {
  // 'sharp url' : http://some-super-duper-hostname/api/v1/Medprod/o';
  // private url = '/api/v1/Medprod/o';
  private url = '/some/endpoint/responseExample/';
  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    console.error('example.service: An error occurred', error); // for demo purposes only
    return throwError(error);
  }

  getResponseExample(): Observable<ResponseExample[]> {
    return this.http
      .get<ResponseExample[]>(this.url)
      .pipe(catchError(this.handleError));
  }

  getDataFrom(id: string): Observable<ResponseExample[]> {
    // examplifies how to get the data where id matches the string
    const url = `${this.url}${id}`;
    return this.http
      .get<ResponseExample[]>(url)
      .pipe(catchError(this.handleError));
  }


  getDataFromName(name: string): Observable<ResponseExample[]> {
    // examplifies how to get the data with a query string
    console.log('example-response.service: getDataFromName');
    const params = new HttpParams().set('name', name);
    return this.http
      .get<ResponseExample[]>(this.url, { params })
      .pipe(catchError(this.handleError));
  }
}
