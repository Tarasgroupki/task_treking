import { Component, OnInit } from '@angular/core';
import { SprintsService } from './sprints.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Sprint } from './sprints.model';

@Component({
  selector: 'app-sprints-view',
  templateUrl: './sprints-view.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsViewComponent {
    title = 'app';
    sprint: any = new Sprint('', '', 1, 1, 1, '');
    chart = [];
    square: number;
    id: number;

    constructor(private _sprint: SprintsService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this._sprint.showSprint(params['id']).subscribe(resSprint => {
            this.sprint = new Sprint(resSprint['data']['title'], resSprint['data']['description'], resSprint['data']['status'], resSprint['data']['lead_assigned_id'], resSprint['data']['user_created_id'], resSprint['data']['deadline']);
           this.id = params['id'];
           this._sprint.dailyForecast(this.id)
                .subscribe(res => {

                    const arr = JSON.parse(res['data']);
                    let sq = 0;
                    const tempMax = Object.values(arr.mark);
                    const tempMin = arr.ideal_line;
                    const alldates = arr.date;

                    const weatherDates = [];

                    alldates.forEach((res) => {
                        const jsdate = res;
                       weatherDates.push(jsdate);
                    });

                    this.chart = new Chart('canvas', {
                        type: 'line',
                        data: {
                            labels: weatherDates,
                            datasets: [
                                {
                                    data: tempMax,
                                    borderColor: '#3cba9f',
                                    fill: false
                                },
                                {
                                    data: tempMin,
                                    borderColor: '#ffcc00',
                                    fill: false
                                },
                            ]
                        },
                        options: {
                            legend: {
                                display: false
                            },
                            scales: {
                                xAxes: [{
                                    display: true
                                }],
                                yAxes: [{
                                    display: true
                                }]
                            }
                        }
                    });
                    for (let i = 0; i < arr.date.length; i++) {
                        if (tempMax[i]) {
                            sq += (tempMax[i] - tempMin[i]) ** 2;
                        }
                    }
                    this.square = Math.sqrt(((1 / tempMax.length) * sq));
                });

        }) );
    }

}
