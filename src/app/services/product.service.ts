import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'https://localhost:44375/Products';
  private ordersUrl = 'https://localhost:44375/Orders';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.productsUrl);
  }

  placeOrder(order: { productId: number; quantity: number }): Observable<any> {
    return this.http.post(this.ordersUrl, order, { responseType: 'text' });
  }
}