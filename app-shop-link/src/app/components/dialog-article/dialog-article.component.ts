import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface DialogData {
  animal: string;
}
@Component({
  selector: 'app-dialog-article',
  templateUrl: './dialog-article.component.html',
  styleUrl: './dialog-article.component.scss'
})
export class DialogArticleComponent {
  constructor(public dialogRef: MatDialogRef<DialogArticleComponent>){}
  form:any={
    name: null,
    type:null,
    stock:null,
    prix:null
   
  }
  ngOnInit(): void {
     
  }
  click(s:string,t:string,st:number,p:number){
    const productName = s;
    const productType = t;  
    const stockProduct = st;
    const prixProduct = p;
    this.dialogRef.close({productName:productName,productType:productType,stockProduct:stockProduct,prixProduct:prixProduct});
    
  }
}
