import { Injectable } from "@angular/core";
import { IUser } from "./user.model";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { of } from "rxjs";
@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
  currentUser: IUser;

  loginUser(userName: string, password: string) {
    let loginInfo = { username: userName, password: password };
    let options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http
      .post("/api/login", loginInfo, options)
      .pipe(
        tap(data => {
          this.currentUser = <IUser>data["user"];
        })
      )
      .pipe(
        catchError(err => {
          return of(false);
        })
      );
  }
  isAuthenticated() {
    return !!this.currentUser;
  }
  checkAuthenticationStatus() {
    this.http.get("/api/currentIdentity").subscribe(data => {
      console.log(data);
      if (data instanceof Object) {
        return (this.currentUser = <IUser>data);
      }
    });
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    let options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.put(
      `/api/users/${this.currentUser.id}`,
      this.currentUser,
      options
    );
  }

  logout() {
    this.currentUser = undefined;

    let options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post("/api/logout", {}, options);
  }
}
