import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggested-content',
  templateUrl: './suggested-content.component.html',
  styleUrls: ['./suggested-content.component.css', '../home/home.component.css']
})
export class SuggestedContentComponent implements OnInit {

  gameSuggestion = ["KKK", "sejhfgj", "skjdfuks"];

  constructor() { }

  ngOnInit(): void {
  }

}
