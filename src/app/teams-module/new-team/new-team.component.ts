import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TeamsService} from "../services/teams.service";
import {Team} from "../entities/team";

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {

  team: Team;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private teamService: TeamsService) { }

  ngOnInit() {
    this.team = new Team();
  }

  registerNewTeam(){
    this.teamService.registerNewTeam(this.team);
  }

}
