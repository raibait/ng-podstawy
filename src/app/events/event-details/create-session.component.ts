import { Component } from "@angular/core";
import { FormControl, FormGroup, Validator, Validators } from "@angular/forms";
import { ISession } from "../shared/index";

@Component({
  templateUrl: "./create-session.component.html",
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
      .error input,
      .error select,
      .error textarea {
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
export class CreateSessionCompononet {
  newSessionForm: FormGroup;
  name: FormControl;
  presenter: FormControl;
  duration: FormControl;
  level: FormControl;
  abstract: FormControl;

  ngOnInit() {
    this.name = new FormControl("", Validators.required);
    this.presenter = new FormControl("", Validators.required);
    this.duration = new FormControl("", Validators.required);
    this.level = new FormControl("", Validators.required);
    this.abstract = new FormControl("", [
      Validators.required,
      Validators.maxLength(400),
      this.restrictedWords(["bar", "foo"])
    ]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    });
  }

  saveSession(formValues) {
    let session: ISession = {
      id: undefined,
      name: formValues.name,
      duration: +formValues.duration,
      level: formValues.level,
      presenter: formValues.presenter,
      abstract: formValues.abstract,
      voters: []
    };
    console.log(session);
  }

  private restrictedWords(words) {
    return (control: FormControl): { [key: string]: any } => {
      if (!words) return null;

      var invalidWords = words
        .map(w => (control.value.includes(w) ? w : null))
        .filter(w => w != null);
      return !!invalidWords && invalidWords.length > 0
        ? { restrictedWords: invalidWords.join(", ") }
        : null;
    };
  }
}
