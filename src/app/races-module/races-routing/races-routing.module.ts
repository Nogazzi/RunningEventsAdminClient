import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";
import {RunEventsListComponent} from "../run-events-list/run-events-list.component";
import {RunEventDetailsComponent} from "../run-event-details/run-event-details.component";
import {NewRaceEventComponent} from "../new-race-event/new-race-event.component";
import {RegisterForRaceComponent} from "../register-for-race/register-for-race.component";


const racesRoutes: Routes = [
  {path: 'races',     component: RunEventsListComponent},
  {path: 'races/:id', component: RunEventDetailsComponent},
  {path: 'registerevent', component: NewRaceEventComponent},
  {path: 'races/register/:id', component: RegisterForRaceComponent}
  ]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(racesRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RacesRoutingModule { }
