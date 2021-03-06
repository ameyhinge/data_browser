import { Injectable } from '@angular/core';
import { SearchObject } from './searchObject';
import { searchResponse } from '../services/search-response';

@Injectable()
export class CommonUtils {
  controlDropDownSearch(receivedList: string[], list: string[], searchTerm: string) {
    list = [];
    var searchObjList: SearchObject[] = [];
    for (var i of receivedList) {
      if (i.toUpperCase().startsWith(searchTerm.toUpperCase())) {
        var searchObj = new SearchObject(i, "1", 0);
        searchObjList.push(searchObj);
      } else if (i.toUpperCase().includes(searchTerm.toUpperCase())) {
        var searchObj = new SearchObject(i, "0", i.indexOf(searchTerm));
        searchObjList.push(searchObj);
      }
    }
    searchObjList.sort(this.sortCompare);
    for (var j = 0; j < searchObjList.length; ++j) {
      list.push(searchObjList[j].Name);
    }
    return list;
  }

  mainSearch(receivedList: searchResponse[], list: searchResponse[], searchTerm: string) {
    list = [];
    var searchObjList: SearchObject[] = [];
    for (var i of receivedList) {
      if (i.name.toUpperCase().startsWith(searchTerm.toUpperCase())) {
        var searchObj = new SearchObject(i, "1", 0);
        searchObjList.push(searchObj);
      } else if (i.name.toUpperCase().includes(searchTerm.toUpperCase())) {
        var searchObj = new SearchObject(i, "0", i.name.indexOf(searchTerm));
        searchObjList.push(searchObj);
      }
    }
    searchObjList.sort(this.sortCompare);
    for (var j = 0; j < searchObjList.length; ++j) {
      list.push(searchObjList[j].Name);
    }
    return list;
  }

  private sortCompare(a: { searchMatchTill: number; Name: string | any[]; }, b: { searchMatchTill: number; Name: string | any[]; }) {
    if (a.searchMatchTill == b.searchMatchTill) {
      if (a.Name.length > b.Name.length) {
        return 1;
      }
      if (a.Name.length < b.Name.length) {
        return -1;
      }
    }
    if (a.searchMatchTill > b.searchMatchTill) {
      return 1;
    }
    if (a.searchMatchTill < b.searchMatchTill) {
      return -1;
    }
    return 0;
  }

  showDropDown(searchBox, clicker, dropDown) {
    dropDown.style.display = "flex";
    dropDown.style.position = "absolute";
    var searchBoxBottom = clicker.offsetHeight + clicker.offsetTop;
    var dropDownWidth = clicker.getBoundingClientRect().width;
    dropDown.style.width = dropDownWidth + "px";
    dropDown.style.top = searchBoxBottom + "px";
    if (searchBox != null) {
      clicker.style.display = "none";
      searchBox.style.display = "inline-block";
      searchBox.focus();
    }
  }

  hideOtherControls(searchBox, clicker, dropDown, list: string | any[], modelProperty: string) {
    if (event.target != searchBox && dropDown.style.display != "none") {
      clicker.style.display = "flex";
      if (searchBox != null) {
        searchBox.style.display = "none";
      }
      dropDown.style.display = "none";
      if (!list.includes(modelProperty)) {
        modelProperty = "";
      }
    }
    return modelProperty;
  }
}