import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {IEmployeeWithTotalTimeInMonth} from "../interfaces/IEmployeeWithTotalTimeInMonth";
import {IEmployeeEntry} from "../interfaces/iemployee-entry";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private url = "https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==";
  readonly MILLISECONDS_IN_A_SECOND: number = 1000;
  readonly SECONDS_IN_A_MINUTE: number = 60;
  readonly MINUTES_IN_AN_HOUR: number = 60;

  constructor(private http: HttpClient) { }

  getEmployeesTotalTimeWorked(): Observable<IEmployeeWithTotalTimeInMonth[]> {
    return this.http.get<IEmployeeEntry[]>(this.url).pipe(
      map(employees => {
        const employeeWorkTime = employees.reduce((acc, employee) => {
          const startTime: Date = new Date(employee.StarTimeUtc);
          const endTime: Date = new Date(employee.EndTimeUtc);
          const timeWorkedPerDay: number = Math.round((endTime.getTime() - startTime.getTime()) / (this.MILLISECONDS_IN_A_SECOND * this.SECONDS_IN_A_MINUTE * this.MINUTES_IN_AN_HOUR));

          if (acc[employee.EmployeeName!]) {
            acc[employee.EmployeeName!].TotalTimeWorked = (acc[employee.EmployeeName!].TotalTimeWorked || 0) + timeWorkedPerDay;
          } else {
            acc[employee.EmployeeName!] = {
              Name: employee.EmployeeName,
              TotalTimeWorked: timeWorkedPerDay
            };
          }
          return acc;
        }, {} as { [key: string]: IEmployeeWithTotalTimeInMonth });

        return Object.values(employeeWorkTime);
      })
    );
  }
}
