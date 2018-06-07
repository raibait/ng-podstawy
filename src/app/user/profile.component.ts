import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
@Component({
  templateUrl: "./profile.component.html",
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
      .error input {
        background-color: #e3c3c5;
      }
      .error ::-webkit-input-placeholder {
        color: #999;
      }
      .error ::-moz-placeholder {
        color: #999;
      }
      .error :-moz-placeholder {
        color: #999;
      }
      .error :-mc-input-placeholder {
        color: #999;
      }
    `
  ]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  private firstName;
  private lastName;

  constructor(private authSerivice: AuthService, private router: Router) {}

  ngOnInit() {
    this.firstName = new FormControl(this.authSerivice.currentUser.firstName, [
      Validators.required,
      Validators.pattern("[a-zA-Z].*")
    ]);
    this.lastName = new FormControl(this.authSerivice.currentUser.lastName, [
      Validators.required,
      Validators.pattern("[a-zA-Z].*")
    ]);
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.authSerivice.updateCurrentUser(
        formValues.firstName,
        formValues.lastName
      );
      this.router.navigate(["events"]);
    }
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched;
  }

  validateLastName() {
    return this.lastName.valid || this.lastName.untouched;
  }

  cancel() {
    this.router.navigate(["events"]);
  }
}
