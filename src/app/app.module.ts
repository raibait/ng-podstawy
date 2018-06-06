import {
  EventsListComponent,
  EventService,
  eventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EvenRouteActivator,
  EventListResolver
} from "./events/index";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { NavBarComponent } from "./nav/navbar.component";
import { appRoutes } from "./routes";
import { Error404Component } from "./errors/404.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    eventThumbnailComponent,
    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],

  providers: [
    EventService,
    EvenRouteActivator,
    EventListResolver,
    { provide: "canDeactivateCreateEvent", useValue: checkDirtyState }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function checkDirtyState(component: CreateEventComponent) {
  if (!component.isDirty)
    return window.confirm("You have not save this event, do you WANNA QUIT?");
  else return true;
}
