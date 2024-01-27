import { Component } from '@angular/core';
import { User } from '../../models/User';
import { ApiSymfonyService } from '../../services/api-symfony.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {
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
        this.api.inscription(user).subscribe(data=>{
         const myJson = JSON.stringify(data);
         const myObj = JSON.parse(myJson);
          console.log(myObj.requete)
          if(myObj.requete==false){
            //this.router.navigate(['/connexion'])
            console.log("aucun user present")
          }else{
             console.log("user present") 
          }
        })
          
      }
  }
}
