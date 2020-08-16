import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddGameFormComponent } from './add-game-form/add-game-form.component';
import { AddCharacterFormComponent } from './add-character-form/add-character-form.component';
import { GameViewComponent } from './game-view/game-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'addgame', component: AddGameFormComponent },
  { path: 'addcharacter', component: AddCharacterFormComponent },
  { path: 'game/:id', component: GameViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
