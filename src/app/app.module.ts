import {
  EventsListComponent,
  EventService,
  eventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EvenRouteActivator,
  EventListResolver,
  CreateSessionCompononet,
  SessionListComponent,
  DurationPipe
} from "./events/index";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { NavBarComponent } from "./nav/navbar.component";
import { appRoutes } from "./routes";
import { Error404Component } from "./errors/404.component";
import { AuthService } from "./user/auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CollapsibleWellComponent } from "./common/collapsible-well.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    eventThumbnailComponent,
    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionCompononet,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [
    EventService,
    EvenRouteActivator,
    EventListResolver,
    AuthService,
    { provide: "canDeactivateCreateEvent", useValue: checkDirtyState }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty)
    return window.confirm("You have not save this event, do you WANNA QUIT?");
  else return true;
}
