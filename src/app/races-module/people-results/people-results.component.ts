import { Component, OnInit } from '@angular/core';
import {PersonResult} from "../entities/person-result";
import {ActivatedRoute, Router} from "@angular/router";
import {PeopleResultsService} from "./people-results.service";

@Component({
  selector: 'app-people-results',
  templateUrl: './people-results.component.html',
  styleUrls: ['./people-results.component.scss']
})
export class PeopleResultsComponent implements OnInit {

  sub: any;
  rows: PersonResult[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  id: number;

  columns = [
    { name: 'Numer startowy',
      prop: 'playerNumber'
    },
    { name: 'Wynik',
      prop: 'timeResult' },
    { name: 'Imię',
      prop: 'firstName' },
    { name: 'Nazwisko',
      prop: 'lastName' },
    { name: 'Narodowość',
      prop: 'nationality' },
    { name: 'Druzyna',
      prop: 'teamName' }
  ];

  constructor(private peopleResultsService: PeopleResultsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
      console.log('getting sportEvent with id: ', this.id);
      this.peopleResultsService
        .get(this.id)
        .subscribe(p => this.rows = p,
          e => this.errorMessage = e,
          () => {
            this.isLoading = false;
            console.log('Downloaded results: ', JSON.stringify(this.rows));
          });
    });
  }

  generateResults(){
    this.peopleResultsService.setRandomResults(this.id);
  }
}
