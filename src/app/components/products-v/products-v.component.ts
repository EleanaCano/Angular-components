import { Component, OnInit } from '@angular/core';
import { Product, createProduct } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-v',
  templateUrl: './products-v.component.html',
  styleUrls: ['./products-v.component.scss']
})
export class ProductsVComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  today = new Date();
  date = new Date(2021, 1, 25);
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    creationAt: '',
    updatedAt: '',
    category: {
      id: '',
      name: '',
      image: '',
      creationAt: '',
      updatedAt: '',
    },  
  };

  limit = 10;
  offset = 0;

  constructor(
    private storeService: StoreService,
    private productService: ProductsService,
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productService.getProductByPage(10,0)
    .subscribe(data => {
      this.products = data;
    })
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.productService.getProduct(id)
    .subscribe(data => {
      this.toggleProductDetail();
      this.productChosen = data;
    })
  }

  createNewProduct() {
    const product: createProduct = {
      title: 'Nuevo producto',
      description: 'Holaaaaaa',
      images: [''],
      creationAt: '',
      updatedAt: '',
      price: 1000,
      categoryId: 1,
     }
    this.productService.create(product)
    .subscribe(data => {
      this.products.unshift(data);
    });
  }

  deleteProduct() {
    const id = this. productChosen.id;
    this.productService.delete(id)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMore() {
    this.productService.getProductByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
