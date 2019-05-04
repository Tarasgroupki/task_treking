import { Component, OnInit } from '@angular/core';
import { SprintsService } from './sprints.service';
import { ActivatedRoute } from "@angular/router";
import {GraphService} from '../graph/graph.service';
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
   // tasks: Task[] = [];
  //  id: number;
    // _clientsArray: ClientsInterface[];
    //sprint: object;
    chart = [];
    id: number;

    constructor(private _sprint: SprintsService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this._sprint.showSprint(params['id']).subscribe(res => {
            this.sprint = new Sprint(res['data']['title'], res['data']['description'], res['data']['status'], res['data']['lead_assigned_id'], res['data']['user_created_id'], res['data']['deadline']);
          // this.sprint = res['data'];
           this.id = params['id'];
           this._sprint.dailyForecast(this.id)
                .subscribe(res => {

                    let arr = JSON.parse(res['data'])
                   // console.log(arr);
                    //console.log(JSON.stringify(Object.values(arr.mark)));
                    let temp_max = Object.values(arr.mark)
                    let temp_min = arr.ideal_line
                    let alldates = arr.date

                    let weatherDates = []
                    alldates.forEach((res) => {
                        let jsdate = res;
                        //let jsdate = new Date(res * 1000)
                       // weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}))
                       weatherDates.push(jsdate);
                    })

                    this.chart = new Chart('canvas', {
                        type: 'line',
                        data: {
                            labels: weatherDates,
                            datasets: [
                                {
                                    data: temp_max,
                                    borderColor: '#3cba9f',
                                    fill: false
                                },
                                {
                                    data: temp_min,
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
                    })

                })
             // console.log(this.id);
        }) );
    }

  //  ngOnInit() {

   // }
    /*ngOnInit() {
        this._clients.getClients().subscribe(res => {
            this.clients = res;
        });
    }*/

}
