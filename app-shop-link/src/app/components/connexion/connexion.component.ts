import { Component } from '@angular/core';
import { ApiSymfonyService } from '../../services/api-symfony.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  constructor(private api:ApiSymfonyService,private router:Router){}
  form:any={
    pseudo: null,
    password:null
  }
  ngOnInit(): void {
   
  }
  onSubmit(){
      if(this.form.pseudo==null || this.form.password==null){
      	  //erreur a traiter  
      }else{  
        let user = new User(this.form.pseudo,this.form.password);
        this.api.postUser(user).subscribe(data=>{
         const myJson = JSON.stringify(data);
         const myObj = JSON.parse(myJson);
          console.log(myObj.requete)
          if(myObj.requete==false){
            console.log("aucun user present")
          }else{
              this.router.navigate(['/article'])
          }
        })
          
      }
  }
}
