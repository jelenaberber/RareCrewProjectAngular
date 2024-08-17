import {Component, OnInit} from '@angular/core';
import {EmployeesService} from "../../services/employees.service";
import {HttpClient} from "@angular/common/http";
import {IEmployeeWithTotalTimeInMonth} from "../../interfaces/IEmployeeWithTotalTimeInMonth";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{

  employees : IEmployeeWithTotalTimeInMonth[] = [];
  index :number = 1;
  readonly REQUIRED_HOURS: number = 100;


  constructor(private employeeService: EmployeesService) { }

  ngOnInit(): void {
    this.employeeService.getEmployeesTotalTimeWorked().subscribe({
      next: (data) => {
        this.employees = data.sort((a, b) =>
          (b.TotalTimeWorked ?? 0) - (a.TotalTimeWorked ?? 0)
        );

      },
      error: (err) => {
        console.error('Failed to load employees data', err);
      }
    });
  }
}
