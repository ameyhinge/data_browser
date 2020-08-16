import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonUtils } from '../commons/CommonUtils';
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

  constructor(
    private commonUtils: CommonUtils,
    private searchService: SearchService,
  ) {
  }

  // Main Search
  @ViewChild('searchDiv') searchDiv;
  @ViewChild('searchBox') searchBox;
  @ViewChild('searchOptions') searchOptions;

  ngOnInit(): void {

  }

  activeOption: string;
  ngAfterViewInit() {
    this.searchBox.nativeElement.focus();
    // Set search option
    this.searchOptions.nativeElement.children[0].classList.add("search-option-active");
    this.activeOption = this.searchMenu[0];
  }

  setActive($event, menu) {
    for (var s of this.searchOptions.nativeElement.children) {
      s.classList.remove("search-option-active");
      if ($event.target == s) {
        $event.target.classList.add("search-option-active");
        this.activeOption = menu;
      }
    }
    this.searchBox.nativeElement.focus();
  }

  searchKey($event) {
    // If backspace is not pressed, first search in current search result buffer
    if ($event.key !== 'Backspace' && $event.target.value.length > 2) {
      if (this.searchResults.length == 0) {
        this.searchService.getSearchResult(true, this.activeOption, $event.target.value.trim()).subscribe(
          results => this.receivedSearchResults = results
        );
      }
      this.searchResults = this.commonUtils.mainSearch(this.receivedSearchResults, this.searchResults, $event.target.value.trim());
    }
    else {
      this.searchService.getSearchResult(true, this.activeOption, $event.target.value.trim()).subscribe(
        results => this.receivedSearchResults = results
      );
    }
  }
}
