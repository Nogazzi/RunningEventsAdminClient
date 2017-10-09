import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs";
import "rxjs/add/operator/map";
import "rxjs/Rx";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import {Team} from "../entities/team";

@Injectable()
export class TeamsService {

  private baseUrl: string = 'http://localhost:8091/teams/';

  constructor(private http: Http) { }

  getAll(): Observable<Team[]> {
    let teams$ = this.http
      .get(`${this.baseUrl}`, {headers: this.getHeaders()})
      .map(mapTeams)
      .catch(handleError);
    console.log("Received events list: ", teams$);
    return teams$;

  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }


  get(id: number): Observable<Team> {
    let team$ = this.http
      .get(`${this.baseUrl}${id}`, {headers: this.getHeaders()})
      .map(mapEvent)
      .catch(handleError);
    return team$;
  }

  save(team: Team): Observable<Response> {
    return this
      .http
      .post(`${this.baseUrl}/load/${team.id}`, team, {headers: this.getHeaders()});
  }
  registerNewTeam(team: Team) {
    console.log('Register team at: ', `${this.baseUrl}registernewteam`);
    console.log('Formated request:', JSON.stringify(team));
    this
      .http
      .post(`${this.baseUrl}registernewteam`,JSON.stringify(team), {headers: this.getHeaders()})
      .subscribe(
        () => { console.log('Register should performed.');
        },
        err => console.error(err)
      );

    /*this.http
      .post(`${this.baseUrl}registerevent`, JSON.stringify(sportEvent), {headers: this.getHeaders()})
      .subscribe(
        () => {
        },
        err => console.error(err)
      );*/
  }

  removeTeam(id: number){
    console.log('destination address for delete: ', `${this.baseUrl}${id}`);
    return this.http
      .delete(`${this.baseUrl}${id}`, {headers: this.getHeaders()})
      .subscribe(() => {},
        err => console.error(err));
  }

}

function mapEvent(response: Response): Team {
  console.log('Receive response: ', response);
  let result = response.json();
  console.log('Received json: ', result);
  return result;
  //return result;
}

function mapTeams(response: Response): Team[] {
  //throw new Error('ups! Force choke!');
  console.log('Received response: ', response);

  /*let result = response.json();
   console.log("Received result: ", result.map(e => toResult(e)));
   return result;*/
  return response.json().map(toTeam);
  //return json.map(e => toResult);
  //return response.json().map(toResult);
}

function toTeam(r: any): Team {
  console.log("Method toPlayer");
  let team = <Team>({
    id: r.id,
    name: r.name,
    players: r.players
  });
  console.log('Parsed team:', team);
  return team;
}

function extractId(teamData: any) {
  let extractedId = teamData.url.replace('http://localhost:8080/teams/', '');
  //.replace('/', '');
  console.log('Extracted id: ', extractedId);
  return parseInt(extractedId);
}

function handleError(error: any){
  let errorMsg = error.message || `Yikes! Where was a problem with our hyperdrive device and we couldn't retrieve your data!`;
  console.error(errorMsg);
  return Observable.throw(errorMsg);
}
