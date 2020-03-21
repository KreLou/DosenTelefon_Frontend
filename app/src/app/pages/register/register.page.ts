import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      const token = params['token'];
      console.log('Token: ', token);
      this.authService.setToken(token);
      this.router.navigate(['']);
    })
  }

}
