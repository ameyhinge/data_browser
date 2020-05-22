import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BrowserClient';

  constructor(private router: Router){
    document.body.style.margin="0";
    document.body.style.backgroundColor="rgb(40,40,40)";
  }

  redirect(){
    if(this.router.url.endsWith("dashboard")){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['/dashboard']);
    }
    
  }
  
}
