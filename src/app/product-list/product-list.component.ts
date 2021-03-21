import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Array<Product> = [];

  // Form vars
  code: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  imageURL: string;

  constructor(private http: HttpClient, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.http.get<Array<Product>>('http://localhost:8080/shop/products').subscribe(
      data => this.products = data,
      error => console.error(`Could not get products, error: ${JSON.stringify(error)}`),
    );
  }

  add(): void {
    this.http.post('http://localhost:8080/shop/products/add', {
      code: this.code,
      name: this.name,
      description: this.description,
      stock: this.stock,
      price: this.price,
      imageURL: this.imageURL
    }, {responseType: 'text'}).subscribe(
      () => {
        this.products.push({
          code: this.code,
          name: this.name,
          description: this.description,
          stock: this.stock,
          price: this.price,
          imageURL: this.imageURL
        });
        this.modalService.dismissAll()
      }
    );
  }

  bought(product: any): void {
    let index = this.products.findIndex(elem => elem == product);
    this.products[index].stock -= 1;
  }

  deleted(index: number): void {
    this.products.splice(index, 1);
  }

  openDialog(content): void {
    this.modalService.open(content, {centered: true})
  }

}
