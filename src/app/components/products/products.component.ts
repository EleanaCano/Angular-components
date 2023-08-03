import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../models/product.model'; 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  @Input() product: Product = {
    id: '',
    title: '',
    price: 0,
    image: '',
    description: '',
    category: '',  
  };

  @Output() addedProduct = new EventEmitter<Product>();

  constructor(){}

  ngOnInit() : void{
  }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }
}
