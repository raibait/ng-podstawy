import { Component, OnInit } from "@angular/core";
import { EventService } from "../events/shared/event.service";
import { ActivatedRoute } from "@angular/router";
declare let toastr;

@Component({
  selector: "event-list",
  template: `
<div>
  <h1>Upcoming events</h1>
  <hr/>
  <div class="row">
    <div *ngFor="let event of events" class="col-md-5">
      <event-thumbnail (click)="handleThumbnailClick(event.name)"  [event]="event"></event-thumbnail>
    </div >
  </div >
</div>
`
})
export class EventsListComponent implements OnInit {
  events: any;
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.events = this.route.snapshot.data["events"];
  }
  handleThumbnailClick(eventName) {
    toastr.success(eventName);
  }
}
