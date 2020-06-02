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

  rowList: String[] = ["row","row"];

  constructor(private commonUtils: CommonUtils) {
  }

  // Main Search
  @ViewChild('searchDiv') searchDiv;
  @ViewChild('advSearchDiv') advSearchDiv;
  @ViewChild('searchBox') searchBox;
  @ViewChildren('searchOption') searchOptions;

  ngOnInit(): void {   
    
  }
  
  activeOption: string;
  ngAfterViewInit(){
    this.searchBox.nativeElement.focus();
    this.advSearchDiv.nativeElement.style.display="none";

    // Set search option
    for(var s of this.searchOptions){
      s.nativeElement.classList.add("search-option-active");
      this.activeOption = s.nativeElement.innerHTML;
      break;
    }
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
      } else{
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
  showDropDownProperty(e: { target }){
    this.commonUtils.showDropDown(e.target.previousElementSibling, e.target, e.target.nextElementSibling);
  }

  // Function to hide property drop down if clicked outside
  hideOtherControls(){
    var advSection = this.advSearchDiv.nativeElement;
    for(var v=1; v< advSection.children.length; v++){
      for(let s of advSection.children[v].children){
        for(let x of s.children){
          if(x.classList.contains("control-div")){ 
            this.commonUtils.hideOtherControls(x.children[0],x.children[1],x.children[2],this.propertyList,"fsf");
          }
        }
      }
    }
  }

}
