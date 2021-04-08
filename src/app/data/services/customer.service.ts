import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';
import { Customer } from '../schema/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url: string = `${environment.apiUrl}/api/customers`;

  constructor(private http: HttpClient, private eh: HttpErrorHandler) { }

  createCustomer(email: string, password: string, firstName: string, lastName: string): Observable<Customer> {
    return this.http.post<Customer>(this.url, {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    })
      .pipe(catchError(this.eh.handleError));
  }

  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }
}
