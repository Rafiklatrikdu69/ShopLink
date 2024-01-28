import { Component, ElementRef } from '@angular/core';
import { DialogArticleComponent } from '../dialog-article/dialog-article.component';
import { MatDialog } from '@angular/material/dialog';
import { dialog } from '../../models/dialog';
import { Article } from '../../models/Article';
import { ArticleApiService } from '../../services/article-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private elementRef:ElementRef,private dialog:MatDialog,private article_api:ArticleApiService){}
    ngOnInit(): void {
      this.article_api.getAllProduct().subscribe(data=>{
        const myJson = JSON.stringify(data);
        const myObj = JSON.parse(myJson);
         console.log(myObj.products[0])
      })
    }
    modal(){
      let dia = new dialog(this.dialog);
      const dialogRef = dia.openDialog(DialogArticleComponent);
      dialogRef.afterClosed().subscribe((result: { productName: string; productType: string,stockProduct:number,prixProduct:number }) => {
        console.log("Nom du produit: " + result.productName + " Type de produit: " + result.productType+" stock: " + result.stockProduct+ " prix: " + result.prixProduct);
        let article = new Article(result.productName, result.productType, result.stockProduct,result.prixProduct)
        this.article_api.insert(article).subscribe(data=>{
            console.log(data);
        })
      });
    }
    insertArticle(article:Article){
        
    }
    
}
