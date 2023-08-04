import { Component } from '@angular/core';
import { Product } from './models/product.model';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

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

  login() {
    this.authService.login('eleana@mail.com', 'changeme2023')
    .subscribe(rta => {
      console.log(rta);
    });
  }
}
