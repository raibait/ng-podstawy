import { Component, Input } from "@angular/core";

@Component({
  selector: "event-thumbnail",
  template: `
  <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
    <h2>{{event.name}}</h2>
    <div>Date:{{event.date}}</div>
    <div [ngStyle]="getStartTimeStyle()" [ngSwitch]="event?.time">
      Time:{{event.time}}
      <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
      <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
      <span *ngSwitchDefault>(Normal Start)</span>
    </div>
    <div>Price: \${{event.price}}</div>
    <div *ngIf="event?.location">
      <span >Location:{{event.location.address}}</span>
      <span>&nbsp;</span>
      <span>{{event.location.city}}, {{event.location.country}}</span>
    </div>
  </div>`,
  styles: [
    `
      .green {
        color: #003300 !important;
      }
      .bold {
        font-weight: bold;
      }
      .thumbnail {
        min-height: 210px;
      }
      .pad-left {
        margin-left: 10px;
      }
      .well div {
        color: #bbb;
      }
    `
  ]
})
export class eventThumbnailComponent {
  @Input() event: any;

  getStartTimeStyle(): any {
    if (this.event && this.event.time === "8:00 am")
      return { color: "green", "font-weight": "bold" };
    else return {};
  }
}