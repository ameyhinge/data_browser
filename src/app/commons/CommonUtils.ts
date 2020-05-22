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
        for(var j=0; j<searchObjList.length; ++j){
            list.push(searchObjList[j].Name);
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

      showDropDown(searchBox: { nativeElement: any; }, clicker: { nativeElement: any; }, dropDown: { nativeElement: any; }){
        searchBox.nativeElement.style.display="inline-block";
        clicker.nativeElement.style.display="none";
        searchBox.nativeElement.focus();
        dropDown.nativeElement.style.display="flex";
        dropDown.nativeElement.style.position="absolute";
        var formMargin = getComputedStyle(dropDown.nativeElement.parentElement.parentElement).marginTop;
        var searchBoxBottom = searchBox.nativeElement.getBoundingClientRect().bottom;
        var dropDownTop = searchBoxBottom - parseInt(formMargin.substring(0,formMargin.indexOf("px")));
        var dropDownWidth = searchBox.nativeElement.getBoundingClientRect().width;
        dropDown.nativeElement.style.width=dropDownWidth+"px";
        dropDown.nativeElement.style.top=dropDownTop+"px";
      }

      hideOtherControls(searchBox: { nativeElement: any; }, clicker: { nativeElement: any; }, dropDown: { nativeElement: any; }, list: string | any[], modelProperty: string){
        if(event.target!=clicker.nativeElement && event.target!=searchBox.nativeElement){
          clicker.nativeElement.style.display="inline-block";
          searchBox.nativeElement.style.display="none";
          dropDown.nativeElement.style.display="none";
          if(!list.includes(modelProperty)){
            modelProperty="";
          } 
          return modelProperty;
        }
      }
}