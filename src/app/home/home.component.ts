import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CommonUtils } from '../commons/CommonUtils';
import { queryObject } from './queryListObject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {

  optionList: string[] = ["Character", "Game"]; 
  propertyList: string[] = ["Age", "Name"];
  searchMenu: string[] = ["Any", "Game", "Character", "Tags", "Advanced Search"];
  columnNameList: string[] = ["Op", "(", "Entity", "Property", "Condition", "Value", ")"];
  columnSpList: string[] = ["Op", "(", ")"];
  logicOpList: string[] = ["And", "Or"];
  rowList = [0];

  propertyType = {
    "Integer": ["Equal to", "Not equal to", "Greater then", "Less then", "Greater then or equal to", "Less then or equal to"],
    "String" : ["Contains", "Does not contain", "Starts with", "Ends with"]
  }

  queryList: queryObject[];
   
  constructor(private commonUtils: CommonUtils) {

  }

  // Main Search
  @ViewChild('searchDiv') searchDiv;
  @ViewChild('advSearchDiv') advSearchDiv;
  @ViewChild('searchBox') searchBox;
  @ViewChild('searchOptions') searchOptions;

  ngOnInit(): void {   
    
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
    console.log($event.target.value);
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
            this.commonUtils.hideOtherControls(searchBox, clicker, dropDown, this.propertyList, "fsf");
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

  queryBuilder(){
    alert("dkj")
  }

}
