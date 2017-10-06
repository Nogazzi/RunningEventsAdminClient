import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs";
import "rxjs/add/operator/map";
import "rxjs/Rx";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import {SportEvent} from "../entities/sport-event";
import {RaceRegistration} from "../entities/race-registration";


@Injectable()
export class RunEventsService {
  private baseUrl: string = 'http://localhost:8090/races/';
  private baseResultsUrl: string = 'http://localhost:8095/results/';

  constructor(private http: Http) {
  }

  getAll(): Observable<SportEvent[]> {
    let sportEvents$ = this.http
      .get(`${this.baseUrl}`, {headers: this.getHeaders()})
      .map(mapEvents)
      .catch(handleError);
    console.log("Received events list: ", sportEvents$);
    return sportEvents$;

  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }


  get(id: number): Observable<SportEvent> {
    let sportEvent$ = this.http
      .get(`${this.baseUrl}${id}`, {headers: this.getHeaders()})
      .map(mapEvent)
      .catch(handleError);
    return sportEvent$;
  }

  save(sportEvent: SportEvent): Observable<Response> {

    return this
      .http
      .post(`${this.baseUrl}/load/${sportEvent.id}`, sportEvent, {headers: this.getHeaders()});
  }

  registerNewRunEvent(sportEvent: SportEvent) {
    this.http
      .post(`${this.baseUrl}registerevent`, JSON.stringify(sportEvent), {headers: this.getHeaders()})
      .subscribe(
        () => {
        },
        err => console.error(err)
      );


  }

  removeEvent(id: number) {
    let result = this.http
      .delete(`${this.baseUrl}${id}`, {headers: this.getHeaders()})
      .subscribe(console.log('Removing event with id=', id, ' should be performed'))
      .catch(handleError);
    console.log('destination address for delete: ', `${this.baseUrl}${id}`);
    console.log('delete result: ', result);
    return result;
  }

  registerForRunEvent(raceRegistration: RaceRegistration) {
    console.log('You wanna send registration: ', JSON.stringify(raceRegistration));
    let result = this.http
      .post(`${this.baseResultsUrl}registerResult`, JSON.stringify(raceRegistration), {headers: this.getHeaders()})
      .subscribe(
        () => {
        },
        err => console.error(err)
      );
    return result;
  }
}

function mapEvent(response: Response): SportEvent {
  console.log('Receive response: ', response);
  let result = response.json();
  console.log('Received json: ', result);
  return result;
  //return result;
}

function mapEvents(response: Response): SportEvent[] {
  //throw new Error('ups! Force choke!');
  console.log('Received response: ', response);

  /*let result = response.json();
  console.log("Received result: ", result.map(e => toResult(e)));
  return result;*/
  return response.json().map(toEvent);
  //return json.map(e => toResult);
  //return response.json().map(toResult);
}

function toEvent(r: any): SportEvent {
  console.log("Method toResult");
  let sportEvent = <SportEvent>({
    id: r.id,
    name: r.name,
    organizer: r.organizer,
    date: r.date,
    localization: r.localization,
    distance: r.distance,
    description: r.description
  });
  console.log('Parsed event:', sportEvent);
  return sportEvent;
}

function extractId(sportEventData: any) {
  let extractedId = sportEventData.url.replace('http://localhost:8080/races/', '');
  //.replace('/', '');
  console.log('Extracted id: ', extractedId);
  return parseInt(extractedId);
}

function handleError(error: any) {
  let errorMsg = error.message || `Yikes! Where was a problem with our hyperdrive device and we couldn't retrieve your data!`;
  console.error(errorMsg);
  return Observable.throw(errorMsg);
}




