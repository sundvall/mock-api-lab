import { Component, OnInit } from '@angular/core';
import { ExampleResponseService } from './api-service/example-response.service';
import ResponseExample from './shared/types/response-example.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mockApiLab';
  responseExample: ResponseExample[];
  constructor(private exampleResponseService: ExampleResponseService) {}

  ngOnInit() {
    // Fetch all content of the mocked db.
    this.exampleResponseService
      .getResponseExample()
      .subscribe(responseExample => {
        console.log('app.component.response:', responseExample);
        return (this.responseExample = responseExample);
      });
    // Fetch only part of the mocked content where id='abc'
    this.exampleResponseService
      .getDataFrom('abc')
      .subscribe(responseExample => {
        console.log(
          'app.component.response: should match id="abc"',
          responseExample
        );
        return (this.responseExample = responseExample);
      });
      // Fetch with query
    this.exampleResponseService
      .getDataFromName('response-3-name')
      .subscribe(responseExample => {
        console.log(
          'app.component.response: should match name="response-3-name"',
          responseExample
        );
        return (this.responseExample = responseExample);
      });
  }
}
