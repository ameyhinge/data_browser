import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { menuDataResponse } from './menu-data-response';

@Injectable()
export class MenuDataService {

  getGameSeriesURL = 'http://localhost:8080/gameSeriesNameList';
  getGameURL = 'http://localhost:8080/gameNameList';

  constructor(private http: HttpClient) { }

  getMenuData(menuType: string): Observable<any> {
    // Get Game Series List
    if (menuType === "gameSeries") {
      return this.http.get<any>(this.getGameSeriesURL);
    }
    // Get Game List
    else if (menuType === "game") {
      return this.http.get<any>(this.getGameURL);
    }
  }
}