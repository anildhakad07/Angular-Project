import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component'; // Import the new component

export const routes: Routes = [
  { path: '', component: ProductListComponent }, // Add new route
];
