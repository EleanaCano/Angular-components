import { Component, OnInit } from '@angular/core';
import { Product } from './models/product.model';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  imgParent = '';
  showImg = true;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private tokenService: TokenService,
  ) {}

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.profile()
      .subscribe()
    }
  }

  onLoaded(img: string){
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.userService.create({
      email: "eleana@mail.com",
      password: "changeme2023",
      name: "Eleana",
      role: "customer",
      avatar: "https://picsum.photos/640/640?r=7816"
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }
}
