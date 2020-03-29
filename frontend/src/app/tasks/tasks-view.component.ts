import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { ActivatedRoute } from '@angular/router';
import {Votes} from './votes.model';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksViewComponent {
    title = 'app';
    selectedValue = 5;
    votesArr: object;
    vote: any = new Votes(1, 1, 5);
    votes: Votes[] = [];
    mark: number;
    users: any;
    userId = JSON.parse(localStorage.getItem('LoggedIn'))['user']['id'];
    voteId: object;
    task: object;

    constructor(private tasksService: TasksService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this.tasksService.showTask(params['id']).subscribe(resTask => {
           /* this.task = new Task(res['data']['title'], res['data']['description'], res['data']['status'], res['data']['user_assigned_id'], res['data']['user_created_id'], res['data']['client_id'], res['data']['invoice_id'], res['data']['deadline']);*/
           this.task = resTask['data'];
           this.votesArr = [{'value' : 1}, {'value' : 2}, {'value' : 3}, {'value' : 5}, {'value' : 8}, {'value' : 13}, {'value' : 21}, {'value' : 34}, {'value' : 55}, {'value' : 89}, {'value' : 144}, {'value' : 233}];
            this.tasksService.checkVote(this.task['id']).subscribe(resVote => {
                this.users = JSON.parse(resVote['data']);
            });
        }) );
    }

    onSelectedChange(value: number) {
        // do something else with the value
        console.log(value);

        // remember to update the selectedValue
        this.selectedValue = value;
    }

    addVote() {
        this.votes.push(new Votes(this.userId, this.task['id'], this.selectedValue));
        this.tasksService.createVote(this.votes).subscribe(res => {
            this.vote = res;
        });
        console.log(this.selectedValue);
    }

    updateVote() {
        this.tasksService.checkVoter(this.userId + '_' + this.task['id']).subscribe(resVoter => {
            this.votes.push(new Votes(this.userId, this.task['id'], this.selectedValue));
            this.voteId = resVoter;
            this.tasksService.updateVote(JSON.parse(this.voteId['data'])['id'], this.votes).subscribe(resVote => {
                console.log(resVote);
                this.votes.length = 0;
            });
        });
    }

}
