import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddGameFormComponent } from './add-game-form/add-game-form.component';
import { WhiteSpaceValidator } from './custom-validator.directive';
import { AddCharacterFormComponent } from './add-character-form/add-character-form.component';
import { CommonUtils } from './commons/CommonUtils';
import { MenuDataService } from './services/menu-data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    AddGameFormComponent,
    WhiteSpaceValidator,
    AddCharacterFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    CommonUtils,
    MenuDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
