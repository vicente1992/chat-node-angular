import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { WebSocketService } from '../../../../shared/services/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  loading: boolean = false;
  listSubscribers: Subscription[] = [];

  list: any[] = [
    {
      image: 'https://i.pinimg.com/236x/0f/68/a2/0f68a2879b121f213463cd1b65a26ed8.jpg'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9isu3_EGH63YbuxYq9aB1P-Gaiw9RJZk5MA&usqp=CAU'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-tA2bx-rKBGBSld4ha6RrI6Na_fZOHDGzHg&usqp=CAU'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8YNgv6QD-26qqMgvBcTTXvM0lxHVKcJDzQQ&usqp=CAU'
    },
    {
      image: 'https://cdn.pixabay.com/photo/2013/07/12/14/07/student-147783_960_720.png'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnxtsFNA3gkUWHZ1bInakZU5y6sDyvJO-2gg&usqp=CAU'
    },

  ]
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private webSocketService: WebSocketService,
  ) {

  }

  ngOnInit(): void {
    this.listObserver();
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      id: [Date.now()],
      image: ['', [Validators.required]],
    });

    this.authService.checkSession(true).then((res) => {
      this.router.navigate(['home']);
    }).catch(err => console.log(err))

  }

  ngOnDestroy(): void {
    this.listSubscribers.map((s) => s.unsubscribe());
  }
  listObserver() {
    const observer1$ = this.webSocketService.loggedinEven.subscribe(res => {
      this.authService.setterUser(res)
      this.router.navigate(['home']);
    })

    this.listSubscribers = [observer1$];
  }
  selectedImage(image: string = '') {
    this.form.patchValue({ image })
  }
  login() {
    const user = this.authService.login(this.form.value)
    this.webSocketService.emitEvent('loggedin', user)
  }







}
