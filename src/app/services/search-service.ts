import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SearchService{

    searchURL = 'http://localhost:8080/search?';
    amp = "&";

    constructor(private http: HttpClient){}

    getSearchResult(quickSearch: boolean, searchCategory: string, searchTerm: string):Observable<any>{

        var urlWithQuery = this.searchURL;
        urlWithQuery += "page=" + quickSearch;
        urlWithQuery += this.amp + "searchCategory=" + searchCategory;
        urlWithQuery += this.amp + "searchTerm=" + searchTerm;

        return this.http.get<any>(urlWithQuery); 
    }
}