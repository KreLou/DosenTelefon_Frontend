import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeckLoaderService {

  constructor(private http: HttpClient) { }

  public getDecks(): Observable<any> {
    return this.http.get(environment.apiURL + 'decks');
  }
  public getDeck(deck: string): Observable<any> {
    return this.http.get(environment.apiURL + 'decks/' + deck);
  }
}
