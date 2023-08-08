import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../../services/store.service'
import { AuthService } from '../../services/auth.service';
import { CategoriesService } from '../../services/categories.service';
import { User } from '../../models/user.model';
import { Category } from '../../models/categories.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  activeMenu = false;
  counter = 0;
  categories: Category[] = [];
  profile: User | null = null;
  token = '';
  
  constructor (
    private storeService : StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
        this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$
    .subscribe(data => {
      this.profile = data;
    })
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

  login() {
    this.authService.loginAndGet('eleana@mail.com', 'changeme2023')
    .subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }
}
