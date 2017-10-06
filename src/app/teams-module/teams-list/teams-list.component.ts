import { Component, OnInit } from '@angular/core';
import {Team} from "../entities/team";
import {TeamsService} from "../services/teams.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit {

  teams: Team[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private teamService: TeamsService,
              private router: Router) { }

  ngOnInit() {
    this.teamService
      .getAll()
      .subscribe(
        /* happy path */ p => this.teams = p,
        /* error path */ e => this.errorMessage = e,
        /* onComplete */ ()=> this.isLoading = false);
  }

  ngOnDestroy() {

  }

  removeTeam(id: number){
    console.log('You wanted to remove team with id: ', id);
    this.teamService.removeTeam(id);
  }
}
