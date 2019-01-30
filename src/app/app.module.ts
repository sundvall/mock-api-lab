import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDbItemService } from './mock-service/in-memory-db-item.service';
import { ExampleResponseService } from './api-service/example-response.service';
/* Always import the HttpClientInMemoryWebApiModule after HttpClientModule.(see package repo.)*/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    environment.production ? [] :
     HttpClientInMemoryWebApiModule.forRoot(InMemoryDbItemService, { apiBase: 'some/endpoint', delay: 100 })
  ],
  providers: [ExampleResponseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
