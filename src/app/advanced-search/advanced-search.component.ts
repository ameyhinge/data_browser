import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonUtils } from '../commons/CommonUtils';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css', '../home/home.component.css', '../app.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  @ViewChild('advSearchDiv') advSearchDiv;

  columnNameList: string[] = ["Op", "(", "Entity", "Property", "Condition", "Value", ")"];
  columnSpList: string[] = ["Op", "(", ")"];
  logicOpList: string[] = ["And", "Or"];

  entityMap = {
    "Select": [],
    "Game": [
      { "Name": "String" },
      { "Release Year": "Integer" },
      { "Publisher": "String" }],
    "Character": [
      { "Name": "String" },
      { "Age": "Integer" }]
  }
  entityList: string[] = [];

  conditionMap = {
    "Integer": ["Equal to", "Not equal to", "Greater then", "Less then", "Greater then or equal to", "Less then or equal to"],
    "String": ["Contains", "Does not contain", "Starts with", "Ends with"]
  }
  conditionList: string[] = [];

  propertyList: string[] = [];

  rowList = [0];

  constructor(private commonUtils: CommonUtils,) { }

  ngOnInit(): void {
    this.populateEntityList();
  }

  // Functions to populate query menu data
  populateEntityList() {
    for (var i in this.entityMap) {
      this.entityList.push(i);
    }
  }

  modifyRows(e: string) {
    if (e === "+") {
      this.rowList.push(this.rowList.length);
    } else if (e === "-") {
      this.rowList.pop();
    }
  }

  setDropDownValue(e) {
    e.target.parentElement.previousElementSibling.children[0].innerHTML = e.target.innerHTML;
  }

  // Function to handle query elements click
  loadProperties(e) {
    this.propertyList = [];
    var controlDiv = e.target.parentElement;
    while (!controlDiv.classList.contains("control-div")) {
      controlDiv = controlDiv.parentElement;
    }
    controlDiv = controlDiv.previousElementSibling;
    for (var c of controlDiv.children) {
      if (c.classList.contains("clicker")) {
        for (var entity of Object.keys(this.entityMap)) {
          if (entity === c.children[0].innerHTML.trim()) {
            for (var k of this.entityMap[entity]) {
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

  loadConditions(e) {
    this.conditionList = [];
    var controlDiv = e.target.parentElement;
    while (!controlDiv.classList.contains("control-div")) {
      controlDiv = controlDiv.parentElement;
    }
    controlDiv = controlDiv.previousElementSibling;
    // Get property
    var selectedProperty;
    for (var c of controlDiv.children) {
      if (c.classList.contains("clicker")) {
        selectedProperty = c.children[0].innerHTML.trim();
        break;
      }
    }
    // Get entity
    controlDiv = controlDiv.previousElementSibling;
    var selectedEntity;
    for (var c of controlDiv.children) {
      if (c.classList.contains("clicker")) {
        selectedEntity = c.children[0].innerHTML.trim();
        break;
      }
    }
    // Get property type
    for (var ent of this.entityMap[selectedEntity]) {
      for (var o of Object.keys(ent)) {
        if (o === selectedProperty) {
          this.conditionList = this.conditionMap[ent[o]];
          break;
        }
      }
    }
    this.showDropDown(e);
  }

  // Function to show/hide property drop down
  showDropDown(e) {
    var dropDown = e.target;
    if (!dropDown.classList.contains("clicker")) {
      dropDown = e.target.parentElement;
    }
    this.commonUtils.showDropDown(dropDown.previousElementSibling, dropDown, dropDown.nextElementSibling);
    e.stopPropagation();
  }
  
  queryBuilder() {
    alert("dkj")
  }
  
  // Function to hide property drop down if clicked outside
  hideOtherControls() {
    var advSection = this.advSearchDiv.nativeElement;
    for (var v = 1; v < advSection.children.length; v++) {
      for (let s of advSection.children[v].children) {
        for (let x of s.children) {
          if (x.classList.contains("control-div")) {
            var searchBox, clicker, dropDown;
            for (let ele of x.children) {
              if (ele.classList.contains("adv-search")) {
                searchBox = ele;
              } else if (ele.classList.contains("clicker")) {
                clicker = ele;
              } else if (ele.classList.contains("drop-down-box")) {
                dropDown = ele;
              }
            }
            this.commonUtils.hideOtherControls(searchBox, clicker, dropDown, this.entityList, "fsf");
          }
        }
      }
    }
  }
}
