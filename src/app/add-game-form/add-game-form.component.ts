import { Component, OnInit, ViewChild } from '@angular/core'; 
import { Game } from './game';
import { CommonUtils } from '../commons/CommonUtils';
import { MenuDataService } from '../services/menu-data.service';

@Component({
  selector: 'app-add-game-form',
  templateUrl: './add-game-form.component.html',
  styleUrls: ['./add-game-form.component.css', '../app.component.css']
})
export class AddGameFormComponent implements OnInit {
  
  // Getting elements from html page
  @ViewChild('gameSeriesSearchClicker') gameSeriesSearchClicker;
  @ViewChild('gameSeriesSearchBox') gameSeriesSearchBox;
  @ViewChild('gameSeriesDropDown') gameSeriesDropDown;
  @ViewChild('gameNameBox') gameNameBox;

  receivedGameSeriesList =[];
  gameSeriesList = [];

  // Default component structure
  constructor(
    private commonUtils : CommonUtils,
    private menuDataService: MenuDataService
    ) { 
    this.selectedGameSeries="Select a game series";
  }
  
  model = new Game("","");

  ngOnInit(){  
    this.menuDataService.getMenuData("gameSeries").subscribe(
    gameSerieses => (this.receivedGameSeriesList = this.gameSeriesList = gameSerieses));
  }
 
  // Actions to be performed after view is loaded
  ngAfterViewInit(){
    this.gameSeriesList = this.receivedGameSeriesList.slice();
    this.gameSeriesSearchBox.nativeElement.style.display="none";
    this.gameSeriesDropDown.nativeElement.style.display="none";
  }
  
  // Function to show/hide game series drop down
  public gameSeriesSearching: boolean;
  showDropDownGameSeries(){
    this.commonUtils.showDropDown(this.gameSeriesSearchBox,this.gameSeriesSearchClicker,this.gameSeriesDropDown);
  }

  // Function to hide game series drop down if clicked outside
  hideOtherControls(){
    this .model.gameSeries = this.commonUtils.hideOtherControls(this.gameSeriesSearchBox,this.gameSeriesSearchClicker,this.gameSeriesDropDown,this.gameSeriesList,this.model.gameSeries);
    if(this.model.gameSeries==""){
      this.selectedGameSeries="Select a game series";
    }
  }
  
  public selectedGameSeries: string;

  setGameSeries($event: { target: { innerHTML: any; }; }){
    this.model.gameSeries=$event.target.innerHTML;
    this.selectedGameSeries=this.model.gameSeries;
  }

  onSearchType($event: { target: { value: string; }; key: string; }){
    this.gameSeriesList=this.commonUtils.controlDropDownSearch(this.receivedGameSeriesList,this.gameSeriesList,$event.target.value.trim());
  }
}
