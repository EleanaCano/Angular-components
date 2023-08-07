import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { CategoriesService } from '../../services/categories.service';
import {  Category } from '../../models/categories.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  activeMenu = false;
  counter = 0;
  categories: Category[] = [];
  
  constructor (
    private storeService : StoreService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
        this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleMenu(): void {
    this.activeMenu = !this.activeMenu;
  }

  getAllCategories() {
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
    });
  }
}
