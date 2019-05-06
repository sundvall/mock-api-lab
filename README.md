# MockApiLab

Default angular 7 project to test the "angular-in-memory-web-api"
[https://github.com/angular/in-memory-web-api](https://github.com/angular/in-memory-web-api)

## tldr

A service that extends the "InMemoryDbService" creates a mocked database from json objects imitating the responses from a real endpoint. A production build uses the real endpoints.

## Usage

```cmd
yarn
ng serve
```

Open http://localhost:4200 and read console output.

## How the mock-api was setup:

### Add production build flag

The production build script ignores the mocked api.
During development on localhost with ng serve, the app is setup to use the mocked responses:

package.json:

```json
"scripts": {
    ...
    "build": "ng build --prod",
    ...
}
```

app.module.ts:  
This import line separates the production and development environments to use "InMemoryDbItemService":
```javascript
    environment.production ? [] :
     HttpClientInMemoryWebApiModule.forRoot(InMemoryDbItemService, { apiBase: 'some/endpoint', delay: 100 })
```

### "InMemoryDbItemService" is the service that provides the mocked response.
This service will block the external endpoint while running in development mode.
```javascript
// in-memory-db-item.service.ts
export class InMemoryDbItemService implements InMemoryDbService {
  createDb() {
    const responseExample: ResponseExample[] = [].concat(responseJson)[0].default;
    return { responseExample };
  }
}
```

### The "responseExample" is the mocked response
The mocked database can then be created as a json structure.  
```javascript
// response-1.json
[
  {
    "id": "39812992-546a-4ed8-8919-a14b0b5212cc",
    "name": "response-1-name",
    "info": "Order 1 info"
  },
  {
    "id": "69812592-546a-4ed8-8919-b34b0b5212cc",
    "name": "response-2-name",
    "info": "Order 2 info"
  },
  {
    "id": "57a69a9e-8413-4d70-b70a-e1f665055ffd",
    "name": "response-3-name",
    "info": "Order 3 info"
  }
]
```

### Create the response-service that provides content from any endpoint.
As normal for an angular 7 application, the requests are handled by a service.
This class has methods to request data with different queries, and is used 
both in production and for development. It is not aware of the mocked service.


Example of how to get the data with a query string:
```javascript
// example-response.service.ts
  getDataFromName(name: string): Observable<ResponseExample[]> {
    const params = new HttpParams().set('name', name);
    return this.http
      .get<ResponseExample[]>(this.url, { params })
      .pipe(catchError(this.handleError));
  }
```

### Inject the response-service into a component
This also follows the normal procedure of a non-mocked angular 7 application.
The app.module imports and provides the response-service, and the 
app.component.ts lifecycle method 'ngOnInit' fetches data.

Here the response should match name="response-3-name"', and before returning the 
response the type is confirmed. This can most probably be done in other ways.

```javascript
// app.component.ts
responseExample: ResponseExample[];
ngOnInit() {
    this.exampleResponseService
      .getDataFromName('response-3-name')
      .subscribe(responseExample => {
          responseExample
        );
        // The response must match the typed structure 
        return (this.responseExample = responseExample);
      });
  }
```







## Angular default project usage:

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
````
