import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Array<Product> = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Array<Product>>('http://localhost:8080/shop/products').subscribe(
      data => this.products = data,
      error => console.error(`Could not get products, error: ${JSON.stringify(error)}`),
    );
  }

}
