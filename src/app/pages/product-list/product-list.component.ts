import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Product List</h1>
    <ul>
      <li *ngFor="let product of products">
        {{ product.name }} - {{ product.price }}
        <button (click)="orderProduct(product.id)">Order</button>
      </li>
    </ul>
    <div *ngIf="message">{{ message }}</div>
  `,
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  message: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  orderProduct(productId: number) {
    const order = { productId, quantity: 1 };
    this.productService.placeOrder(order).subscribe(
      (response) => {
        this.message = response;
      },
      (error) => {
        this.message = 'Order failed';
      },
    );
  }
}
