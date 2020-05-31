import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {

  optionList: String[] = ["Any", "Character", "Game"]; 
  selectedOption = this.optionList[0];

  constructor() {}
  @ViewChild('searchDiv') searchDiv;
  @ViewChild('advSearchDiv') advSearchDiv;
  @ViewChild('searchBox') searchBox;
  @ViewChildren('searchOption') searchOptions;
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

}
