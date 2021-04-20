import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SessionService } from 'src/app/core/services/session.service';
import { HeaderService } from 'src/app/core/services/header.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this._fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private _authService: AuthenticationService,
    private _session: SessionService,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private _header: HeaderService,
    private _location: Location
  ) { }

  ngOnInit() {
    this._header.setHeaderButtonsVisibility(false);
  }

  login() {
    const credentials = this.loginForm.value;

    this._authService.login(
      credentials.email,
      credentials.password
    ).subscribe(
      () => {
        this._session.setLoggedInStatus(true);
        this._location.back();
      },
      err => {
        this._snackBar.open(
          'Login failed. Check your login credentials.',
          'Close',
          { duration: 6000 });

        this.loginForm.patchValue({ password: '' });
      }
    );
  }
}