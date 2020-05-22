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
  
  ngAfterViewInit(){
    this.searchBox.nativeElement.focus();
    for(var s of this.searchOptions){
      s.nativeElement.classList.add("search-option-active");
      break;
    }
  }

}
