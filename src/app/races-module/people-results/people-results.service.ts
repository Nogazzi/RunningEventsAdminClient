import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs";
import "rxjs/add/operator/map";
import "rxjs/Rx";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import {PersonResult} from "../entities/person-result";

@Injectable()
export class PeopleResultsService {

  private baseUrl: string = 'http://localhost:8090/races/';
  private baseResultsUrl: string = 'http://localhost:8095/results/';

  constructor(private http: Http) {
  }

  getAll(): Observable<PersonResult[]> {
    let peopleResults$ = this.http
      .get(`${this.baseUrl}`, {headers: this.getHeaders()})
      .map(mapResults)
      .catch(handleError);
    console.log("Received peopleResults list: ", peopleResults$);
    return peopleResults$;

  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }


  get(id: number): Observable<PersonResult[]> {
    let peopleResults = this.http
      .get(`${this.baseResultsUrl}${id}`, {headers: this.getHeaders()})
      .map(mapResults)
      .catch(handleError);
    return peopleResults;
  }

  setRandomResults(id: number)  {
    console.log('Target url: ', `${this.baseResultsUrl}fillResults`);
    console.log("Stringify: ", JSON.stringify(id));
    this.http
      .patch(`${this.baseResultsUrl}fillResults/${id}`, /*JSON.stringify(id),*/ {headers: this.getHeaders()})
      .subscribe(() => console.log('Operation of generating random results should be performed'))
      .catch(handleError);
  }

  registerNewRunEvent(sportEvent: PersonResult) {
    this.http
      .post(`${this.baseUrl}registerevent`, JSON.stringify(sportEvent), {headers: this.getHeaders()})
      .subscribe(
        () => {
        },
        err => console.error(err)
      );
  }
}

function mapResult(response: Response): PersonResult {
  console.log('Receive response: ', response);
  let result = response.json();
  console.log('Received json: ', result);
  return result;
}

function mapResults(response: Response): PersonResult[] {
  console.log('Received response: ', response);
  return response.json().map(toResult);
}

function toResult(r: any): PersonResult {
  console.log("Method toResult");
  let personResult = <PersonResult>({
    timeResult: r.timeResult,
    playerNumber: r.playerNumber,
    firstName: r.firstName,
    lastName: r.lastName,
    birthDate: r.birthDate,
    nationality: r.nationality,
    teamName: r.teamName
  });
  console.log('Parsed personResult:', personResult);
  return personResult;
}


function handleError(error: any) {
  let errorMsg = error.message || `Yikes! Where was a problem with our hyperdrive device and we couldn't retrieve your data!`;
  console.error(errorMsg);
  return Observable.throw(errorMsg);
}
