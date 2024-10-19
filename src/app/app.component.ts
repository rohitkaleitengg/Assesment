import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from "./components/product/product.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-assignment-crud';
}
