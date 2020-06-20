import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CommonUtils } from '../commons/CommonUtils';
import { queryObject } from './queryListObject';
import { SearchService } from '../services/search-service';
import { searchResponse } from '../services/search-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {

  searchMenu: string[] = ["Any", "Game", "Character", "Tags", "Advanced Search"];

  receivedSearchResults: searchResponse[] = [];
  searchResults: searchResponse[] = [];

  columnNameList: string[] = ["Op", "(", "Entity", "Property", "Condition", "Value", ")"];
  columnSpList: string[] = ["Op", "(", ")"];
  
  logicOpList: string[] = ["And", "Or"];
  entityMap = {
    "Select": [],
    "Game": [
      {"Name": "String"}, 
      {"Release Year": "Integer"}, 
      {"Publisher": "String"}],
    "Character": [
      {"Name": "String"}, 
      {"Age": "Integer"}]
  }
  entityList: string[] = [];
  propertyList: string[] = []
  conditionMap = {
    "Integer": ["Equal to", "Not equal to", "Greater then", "Less then", "Greater then or equal to", "Less then or equal to"],
    "String" : ["Contains", "Does not contain", "Starts with", "Ends with"]
  }
  conditionList: string[] = [];
  rowList = [0];

  gameSuggestion=["KKK", "sejhfgj", "skjdfuks"];

  queryList: queryObject[];
   
  constructor(
    private commonUtils: CommonUtils,
    private searchService: SearchService
    ) {

  }

  // Main Search
  @ViewChild('searchDiv') searchDiv;
  @ViewChild('advSearchDiv') advSearchDiv;
  @ViewChild('searchBox') searchBox;
  @ViewChild('searchOptions') searchOptions; 

  o: searchResponse = {name:"Amey", entityType:"je", URL:"ksef"};
  ngOnInit(): void {   
    this.populateEntityList();

    this.o.name="Amay";
    this.receivedSearchResults.push(this.o);
    this.o.name="Amay";
    this.receivedSearchResults.push(this.o);
    this.o.name="Amay";
    this.receivedSearchResults.push(this.o);
  }
  
  activeOption: string;
  ngAfterViewInit(){
    this.searchBox.nativeElement.focus();
    // Set search option
    this.searchOptions.nativeElement.children[0].classList.add("search-option-active");
    this.activeOption = this.searchMenu[0]; 
  }

  setActive($event, menu){
    for(var s of this.searchOptions.nativeElement.children){
      s.classList.remove("search-option-active");
      if($event.target==s){
        $event.target.classList.add("search-option-active");
        this.activeOption = menu;
      }
    }
    this.searchBox.nativeElement.focus();
  }

  searchKey($event){
    // If backspace is not pressed, first search in current search result buffer
    if($event.key!=='Backspace' && $event.target.value.length>2){
      if(this.searchResults.length==0){
        this.searchService.getSearchResult(true,this.activeOption,$event.target.value.trim()).subscribe(
          results=>this.receivedSearchResults = results
        );
      }
      this.searchResults = this.commonUtils.mainSearch(this.receivedSearchResults,this.searchResults,$event.target.value.trim());      
    }
    else{
      this.searchService.getSearchResult(true,this.activeOption,$event.target.value.trim()).subscribe(
        results=>this.receivedSearchResults = results
      );
    }
  }

  // Function to show/hide property drop down
  showDropDown(e){
    var dropDown = e.target;
    if(!dropDown.classList.contains("clicker")){
      dropDown = e.target.parentElement;
    } 
    this.commonUtils.showDropDown(dropDown.previousElementSibling, dropDown, dropDown.nextElementSibling);
    e.stopPropagation();
  }

  // Function to hide property drop down if clicked outside
  hideOtherControls(){
    var advSection = this.advSearchDiv.nativeElement;
    for(var v=1; v< advSection.children.length; v++){
      for(let s of advSection.children[v].children){
        for(let x of s.children){
          if(x.classList.contains("control-div")){ 
            var searchBox, clicker, dropDown;
            for(let ele of x.children){
              if(ele.classList.contains("adv-search")){
                searchBox=ele;
              }else if(ele.classList.contains("clicker")){
                clicker=ele;
              }else if(ele.classList.contains("drop-down-box")){
                dropDown=ele;
              }
            }
            this.commonUtils.hideOtherControls(searchBox, clicker, dropDown, this.entityList, "fsf");
          }
        }
      }
    }
  }

  // Function to handle insertion or deletion of row
  modifyRows(e: string){  
    if(e==="+"){
      this.rowList.push(this.rowList.length);
    }else if(e==="-"){
      this.rowList.pop();
    }
  }

  setDropDownValue(e){
    e.target.parentElement.previousElementSibling.children[0].innerHTML = e.target.innerHTML;
  }

  // Functions to populate query menu data
  populateEntityList(){
    for(var i in this.entityMap){
      this.entityList.push(i);
    }
  }

  // Function to handle query elements click
  loadProperties(e){
    this.propertyList = [];
    var controlDiv = e.target.parentElement;
    while(!controlDiv.classList.contains("control-div")){
      controlDiv = controlDiv.parentElement;
    }
    controlDiv = controlDiv.previousElementSibling;
    for(var c of controlDiv.children){
      if(c.classList.contains("clicker")){
        for(var entity of Object.keys(this.entityMap)){
          if(entity===c.children[0].innerHTML.trim()){
            for(var k of this.entityMap[entity]){
              this.propertyList.push(Object.keys(k)[0]);
            }
            break;
          }
        }
        break;
      }
    }
    this.showDropDown(e);
  }

  loadConditions(e){
    this.conditionList = [];
    var controlDiv = e.target.parentElement;
    while(!controlDiv.classList.contains("control-div")){
      controlDiv = controlDiv.parentElement;
    }
    controlDiv = controlDiv.previousElementSibling;
    // Get property
    var selectedProperty;
    for(var c of controlDiv.children){
      if(c.classList.contains("clicker")){
        selectedProperty = c.children[0].innerHTML.trim();
        break;
      }
    }
    // Get entity
    controlDiv = controlDiv.previousElementSibling;
    var selectedEntity;
    for(var c of controlDiv.children){
      if(c.classList.contains("clicker")){
        selectedEntity = c.children[0].innerHTML.trim();
        break;
      }
    }
    // Get property type
    for(var ent of this.entityMap[selectedEntity]){
      for(var o of Object.keys(ent)){
        if(o===selectedProperty){
          this.conditionList = this.conditionMap[ent[o]];
          break;
        }
      }
    }
    this.showDropDown(e);
  }

  queryBuilder(){
    alert("dkj")
  }

}
