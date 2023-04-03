import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { KrisComponent } from "./kris/kris.component";
import { MahsaComponent } from "./mahsa/mahsa.component";
import { MichaelComponent } from "./michael/michael.component";
import { MikeComponent } from "./mike/mike.component";
import { NaseerComponent } from "./naseer/naseer.component";
import { QARoutes } from "./qa.service"

    //TODO: all other components will be going through another router outlet inside the gallery component. 
    //TODO: Check for another way to route through router-outlet (see how app-component does it).
    const routes: Routes = [
QARoutes.childRoutes([
    { path: 'kris-en', component: KrisComponent }, //English
    { path: 'kris-fa', component: KrisComponent}, //French

    { path: 'mahsa-en', component: MahsaComponent }, //English
    { path: 'mahsa-fr', component: MahsaComponent }, //French

    { path: 'michael-en', component: MichaelComponent }, //English
    { path: 'michael-fr', component: MichaelComponent }, //French

    { path: 'mike-en', component: MikeComponent }, //English
    { path: 'mike-fr', component: MikeComponent }, //French

    { path: 'naseer-en', component: NaseerComponent }, //English
    { path: 'naseer-fr', component: NaseerComponent }, //French
    
    //testing routing bug, needs to be removed afterwards
    { path: 'naseer2-en', component: NaseerComponent }, //English
    { path: 'naseer2-fr', component: NaseerComponent }, //French
])
    ];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
providers: []
})
export class QARoutingModule { }
