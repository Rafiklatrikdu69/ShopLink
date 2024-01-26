import { Component } from '@angular/core';
import { ApiSymfonyService } from '../../services/api-symfony.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private api : ApiSymfonyService){}

  ngOnInit(): void {
  this.api.getJson().subscribe(data=>{
    console.log(data)
  })
    
  }

}
