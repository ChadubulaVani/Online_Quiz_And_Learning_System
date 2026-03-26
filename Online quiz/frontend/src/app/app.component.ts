import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Import RouterModule for routerLink and router-outlet
  templateUrl: './app.component.html',
  template: `
  <routerOutlet></routerOutlet>
  `
  
})
export class AppComponent { }
