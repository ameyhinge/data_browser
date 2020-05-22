import {Injectable} from '@angular/core';
import { SearchObject } from './searchObject';

@Injectable()
export class CommonUtils{
    controlDropDownSearch(receivedList: string[], list: string[], searchTerm: string){
        list=[];
        var searchObjList: SearchObject[] = [];
        for(var i of receivedList){
            if(i.toUpperCase().startsWith(searchTerm.toUpperCase())){
                var searchObj = new SearchObject(i,"1",0);
                searchObjList.push(searchObj);
            }else if(i.toUpperCase().includes(searchTerm.toUpperCase())){
                var searchObj = new SearchObject(i,"0",i.indexOf(searchTerm));
                searchObjList.push(searchObj);
            }
        }
        searchObjList.sort(this.sortCompare);
        for(var j of searchObjList){
            list.push(j.Name);
        }
        return list;
    }
    private sortCompare(a: { searchMatchTill: number; Name: string | any[]; },b: { searchMatchTill: number; Name: string | any[]; }){
        if(a.searchMatchTill == b.searchMatchTill){
          if(a.Name.length > b.Name.length){
            return 1;
          }
          if(a.Name.length < b.Name.length){
            return -1;
          }
        }
        if(a.searchMatchTill > b.searchMatchTill){
          return 1;
        }
        if(a.searchMatchTill < b.searchMatchTill){
          return -1;
        }
        return 0;
      }
}