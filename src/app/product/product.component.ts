import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: Product;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap(
        (params) => this.http.get(`http://localhost:8080/shop/products/${params.get('code')}`)
      ),
    ).subscribe(
      (product: Product) => this.product = product,
      error => console.error(error),
    );
  }

}
