import { Component, OnInit, ViewChild } from '@angular/core';
import { Character } from './character';
import { CommonUtils } from '../commons/CommonUtils';
import { MenuDataService } from '../services/menu-data.service';

@Component({
  selector: 'app-add-character-form',
  templateUrl: './add-character-form.component.html',
  styleUrls: ['./add-character-form.component.css', '../app.component.css']
})
export class AddCharacterFormComponent implements OnInit {
  
  // Getting elements from html page
  @ViewChild('gameSearchClicker') gameSearchClicker;
  @ViewChild('gameSearchBox') gameSearchBox;
  @ViewChild('gameDropDown') gameDropDown;
  @ViewChild('gameNameBox') gameNameBox;

  receivedGameList =[];
  gameList = this.receivedGameList.slice();

  // Default component structure
  constructor(
    private commonUtils:CommonUtils,
    private menuDataService: MenuDataService
    ) {
    this.selectedGame="Select a game series";
   }

  model = new Character("","","");

  ngOnInit(): void {
    this.menuDataService.getMenuData("game").subscribe(
    games => (this.receivedGameList = this.gameList = games));
  }

  // Actions to be performed after view is loaded
  ngAfterViewInit(){
    this.gameSearchBox.nativeElement.style.display="none";
    this.gameDropDown.nativeElement.style.display="none";
  }

  // Function to show/hide game series drop down
  public gameSearching: boolean;
  showDropDownGame(){
    this.gameSearchBox.nativeElement.style.display="inline-block";
    this.gameSearchClicker.nativeElement.style.display="none";
    this.gameSearchBox.nativeElement.focus();
    this.gameDropDown.nativeElement.style.display="flex";
  }

  // Function to hide game series drop down if clicked outside
  hideOtherControls(){
    if(event.target!=this.gameSearchClicker.nativeElement && event.target!=this.gameSearchBox.nativeElement){
      this.gameSearchClicker.nativeElement.style.display="inline-block";
      this.gameSearchBox.nativeElement.style.display="none";
      this.gameDropDown.nativeElement.style.display="none";
      this.gameSearching=false;
      this.decideSearchBoxValue();
    }
  }
  
  public selectedGame: string;

  setGame($event: { target: { innerHTML: any; }; }){
    this.model.gameName=$event.target.innerHTML;
    this.selectedGame=this.model.gameName;
  }

  decideSearchBoxValue(){
    if(this.gameList.includes(this.model.gameName)){
      this.model.gameName="";
      this.selectedGame="Select a game";
    } 
  }

  onSearchType($event: { target: { value: string; }; key: string; }){
    this.gameList=this.commonUtils.controlDropDownSearch(this.receivedGameList,this.gameList,$event.target.value.trim());
  }
}
