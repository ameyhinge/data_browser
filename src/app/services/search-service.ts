import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SearchService{
constructor(private http: HttpClient){}
    getSearchResult(quickSearch: boolean, searchCategory: string, searchTerm: string):Observable<any>{
        if(searchCategory==="any"){
             
        }else if(searchCategory==="game"){

        }else if(searchCategory==="character"){
            
        }
        return null;
    }
}