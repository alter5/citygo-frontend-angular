// Form control example

// app.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <form (ngSubmit)="onSubmit()">
      <label for="username">Username:</label>
      <input type="text" id="username" [formControl]="usernameControl" />

      <label for="password">Password:</label>
      <input type="password" id="password" [formControl]="passwordControl" />

      <button type="submit" [disabled]="usernameControl.invalid || passwordControl.invalid">Submit</button>
    </form>
  `,
})
export class AppComponent implements OnInit {
  usernameControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  passwordControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  ngOnInit() {
    // Using RxJS to add debounceTime and distinctUntilChanged
    this.usernameControl.valueChanges
      .pipe(
        debounceTime(300), // wait for 300ms pause in events
        distinctUntilChanged() // only emit if the value has changed
      )
      .subscribe((value) => {
        console.log('Username changed:', value);
        // Additional logic, like making an API request, can be placed here
      });

    this.passwordControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        console.log('Password changed:', value);
      });
  }

  onSubmit() {
    // Do something with the form data when the form is submitted
    console.log('Username:', this.usernameControl.value);
    console.log('Password:', this.passwordControl.value);
  }
}

/*
In this example:

    We import RxJS operators debounceTime and distinctUntilChanged.
    We use the valueChanges observable of each FormControl to subscribe to changes.
    The debounceTime operator introduces a delay of 300ms, ensuring that events are only emitted after a pause in typing.
    The distinctUntilChanged operator ensures that only distinct values are emitted.
*/
