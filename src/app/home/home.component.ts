import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {}
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
    }
    this.searchBox.nativeElement.focus();
  }

  searchKey($event){
    console.log($event.target.value);
  }

}
