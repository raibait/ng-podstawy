import { Routes } from "@angular/router";
import {
  EventsListComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EvenRouteActivator,
  EventListResolver
} from "./events/index";
import { Error404Component } from "./errors/404.component";
// import { EventsListComponent } from "../events/events-list-component";
// import { EventDetailsComponent } from "../events/event-details/event-details.component";
// import { CreateEventComponent } from "../events/create-event.component";
// import { EvenRouteActivator } from "../events/event-details/event-route-activator.service";
// import { EventListResolver } from "../events/event-list-resolver-service";

export const appRoutes: Routes = [
  {
    path: "404",
    component: Error404Component
  },
  {
    path: "events/new",
    component: CreateEventComponent,
    canDeactivate: ["canDeactivateCreateEvent"]
  },
  {
    path: "events",
    component: EventsListComponent,
    resolve: { ["events"]: EventListResolver }
  },
  {
    path: "events/:id",
    component: EventDetailsComponent,
    canActivate: [EvenRouteActivator]
  },
  {
    path: "",
    redirectTo: "events",
    pathMatch: "full"
  },
  {
    path: "user",
    loadChildren: "./user/user.module#UserModule"
  }
];
