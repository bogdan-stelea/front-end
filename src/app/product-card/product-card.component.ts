import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../models/product";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  @Output() bought: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleted: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  buy(event: Event): void {
    event.stopPropagation();
    this.http.post('http://localhost:8080/shop/transactions/add', {
      productCode : this.product.code,
      clientCode : "1234",
      productQuantity : 1,
      paymentMethod : "CARD"
    } ,{ responseType: 'text'}).subscribe(
      (data) => data !== "Out of stock" ? this.bought.emit(this.product) : ""
    );
  }

  remove(event: Event): void {
    event.stopPropagation();
    this.http.delete(`http://localhost:8080/shop/products/remove/${this.product.code}`, { responseType: 'text' }).subscribe(
      () => this.deleted.emit()
    );
  }
}
