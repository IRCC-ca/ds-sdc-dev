import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MahsaComponent } from './mahsa/mahsa.component';
import { MichaelComponent } from './michael/michael.component';
import { MikeComponent } from './mike/mike.component';
import { NaseerComponent } from './naseer/naseer.component';
import { QARoutes } from './qa.service';
import { BobbyComponent } from './bobby/bobby.component';

//TODO: all other components will be going through another router outlet inside the gallery component.
//TODO: Check for another way to route through router-outlet (see how app-component does it).
const routes: Routes = [
  QARoutes.childRoutes([
    { path: 'mahsa-en', component: MahsaComponent }, //English
    { path: 'mahsa-fr', component: MahsaComponent }, //French

    { path: 'michael-en', component: MichaelComponent }, //English
    { path: 'michael-fr', component: MichaelComponent }, //French

    { path: 'mike-en', component: MikeComponent }, //English
    { path: 'mike-fr', component: MikeComponent }, //French

    { path: 'naseer-en', component: NaseerComponent }, //English
    { path: 'naseer-fr', component: NaseerComponent },//French

    { path: 'bobby-en', component: BobbyComponent }, //English
    { path: 'bobby-fr', component: BobbyComponent } //French
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class QARoutingModule { }
