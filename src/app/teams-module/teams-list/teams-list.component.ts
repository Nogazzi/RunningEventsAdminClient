import { Component, OnInit } from '@angular/core';
import {Team} from "../entities/team";
import {TeamsService} from "../services/teams.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {MdIconRegistry} from "@angular/material";

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
              private router: Router,
              iconRegistry: MdIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'delete',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/close.svg'));
  }

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
