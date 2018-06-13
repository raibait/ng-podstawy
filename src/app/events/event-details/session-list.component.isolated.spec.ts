import { SessionListComponent } from "./session-list.component";
import { ISession } from "../shared/event.model";

describe("SessionListComponent", () => {
  let component: SessionListComponent;
  let mockAuthService, mockVoterService;

  beforeEach(() => {
    component = new SessionListComponent(mockAuthService, mockVoterService);
  });

  describe("ngOnChanges", () => {
    it("should filter the sesion correctly", () => {
      component.sessions = <ISession[]>[
        { name: "session 1", level: "intermediate" },
        { name: "session 2", level: "begginer" },
        { name: "session 3", level: "intermediate" }
      ];
      component.sortBy = "name";
      component.filterBy = "intermediate";
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.visibleSessions.length).toBe(2);
    });

    it("should sort the sesion correctly", () => {
      component.sessions = <ISession[]>[
        { name: "session 2", level: "intermediate" },
        { name: "session 3", level: "begginer" },
        { name: "session 1", level: "intermediate" }
      ];
      component.sortBy = "name";
      component.filterBy = "all";
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.visibleSessions[2].name).toBe("session 3");
    });
  });
});
