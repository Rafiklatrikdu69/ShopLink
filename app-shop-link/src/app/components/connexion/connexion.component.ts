import { Component } from '@angular/core';
import { ApiSymfonyService } from '../../services/api-symfony.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  constructor(private api:ApiSymfonyService){}
  form:any={
    pseudo: null,
    password:null
  }
  ngOnInit(): void {
    this.api.postUser().subscribe(data=>{
      console.log(data)
    })
  }
  onSubmit(){
      if(this.form.pseudo==null || this.form.password==null){
        // console.log('nul')
      }else{       
      }
  }
}
