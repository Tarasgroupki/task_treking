import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';
  public LogginningData = JSON.parse(localStorage.getItem('LoggedIn'));
  route: string;
  constructor(private router: Router, private authService: AuthService) {
      console.log(this.LogginningData);
      router.events.subscribe((url: any) => {
          if (url.url !== undefined) {
              this.route = url.url;
          }
          if (this.route === '/') {
              this.router.navigate(['profile']);
          }
      });
  }

  ngOnInit() {
    /*  if (!localStorage.getItem('LoggedIn')) {
          this.router.navigate(['login']);
      }*/

    }
    removeAuth() {
        localStorage.removeItem('token');
        localStorage.removeItem('LoggedIn');
      this.router.navigate(['login']);
    }
}
