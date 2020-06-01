import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CommonUtils } from '../commons/CommonUtils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {

  optionList: string[] = ["Any", "Character", "Game"]; 
  propertyList: string[] = ["Age", "Name"];
  selectedOption = this.optionList[0];

  constructor(private commonUtils: CommonUtils) {
  }

  @ViewChild('searchDiv') searchDiv;
  @ViewChild('advSearchDiv') advSearchDiv;
  @ViewChild('searchBox') searchBox;
  @ViewChildren('searchOption') searchOptions;

  //Property Search
  @ViewChild('propertySearchBox') propertySearchBox;
  @ViewChild('propertySearchClicker') propertySearchClicker;
  @ViewChild('propertyDropDown') propertyDropDown;
  ngOnInit(): void {   
    
  }
  activeOption: string;
  ngAfterViewInit(){
    this.searchBox.nativeElement.focus();
    for(var s of this.searchOptions){
      s.nativeElement.classList.add("search-option-active");
      this.activeOption = s.nativeElement.innerHTML;
      break;
    }
    //Propert Search
    this.propertySearchBox.nativeElement.style.display="none";
    this.propertyDropDown.nativeElement.style.display="none";
    
  }

  setActive($event){
    for(var s of this.searchOptions){
      s.nativeElement.classList.remove("search-option-active");
      if($event.target==s.nativeElement){
        $event.target.classList.add("search-option-active");
        this.activeOption = $event.target.innerHTML;
      }
      if($event.target.innerHTML==="Advance Search"){
        this.searchDiv.nativeElement.style.display="none";
        this.advSearchDiv.nativeElement.style.display="flex";
      }else{
        this.searchDiv.nativeElement.style.display="flex";
        this.advSearchDiv.nativeElement.style.display="none";
      }
    }
    this.searchBox.nativeElement.focus();
  }

  searchKey($event){
    console.log($event.target.value);
  }

  // Function to show/hide property drop down
  showDropDownProperty(){
      this.commonUtils.showDropDown(this.propertySearchBox,this.propertySearchClicker,this.propertyDropDown);
  }

  // Function to hide property drop down if clicked outside
  hideOtherControls(){
    this.commonUtils.hideOtherControls(this.propertySearchBox,this.propertySearchClicker,this.propertyDropDown,this.propertyList,this.propertyList[0]);
  }
}
