import { Component, AfterViewInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, ArcElement, Tooltip, Legend, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importuj plugin
import { EmployeesService } from "../../services/employees.service";
import { IEmployeeWithTotalTimeInMonth } from "../../interfaces/IEmployeeWithTotalTimeInMonth";

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {

  PieChart: any;
  chartData: any = {
    labels: [],
    datasets: []
  };

  constructor(
    private employeeService: EmployeesService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = document.getElementById('pieChart') as HTMLCanvasElement;

      if (canvas) {
        this.employeeService.getEmployeesTotalTimeWorked().subscribe({
          next: (data: IEmployeeWithTotalTimeInMonth[]) => {
            const labels = data.map(emp => emp.Name ? emp.Name : "Unknown");
            const values = data.map(emp => emp.TotalTimeWorked);

            this.chartData = {
              labels: labels,
              datasets: [{
                data: values,
                backgroundColor: this.generateColors(values.length),
                hoverBackgroundColor: this.generateColors(values.length),
              }]
            };

            this.PieChart = new Chart(canvas, {
              type: 'pie',
              data: this.chartData,
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top'
                  },
                  title: {
                    display: true,
                    text: 'Employee Total Time Worked (Hours)'
                  },
                  datalabels: {
                    display: true,
                    formatter: (value: number, context: any) => {
                      const total = context.chart.data.datasets[0].data.reduce((acc: number, val: number) => acc + val, 0);
                      const percentage = (value / total * 100).toFixed(2);
                      return `${percentage}%`;
                    },
                    color: 'black',
                    anchor: 'center',
                    align: 'center',
                    font: {
                      weight: 'bold',
                      size: 14
                    },
                    padding: 0,
                    clamp: true
                  }
                }
              },
            });

            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Failed to load employees data', err);
          }
        });
      } else {
        console.error('Canvas element not found');
      }
    }
  }

  generateColors(length: number): string[] {
    const colors = [];
    for (let i = 0; i < length; i++) {
      const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
      colors.push(color);
    }
    return colors;
  }
}
