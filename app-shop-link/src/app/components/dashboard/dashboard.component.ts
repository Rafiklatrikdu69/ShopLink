import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { DialogArticleComponent } from '../dialog-article/dialog-article.component';
import { MatDialog } from '@angular/material/dialog';
import { dialog } from '../../models/dialog';
import { Article } from '../../models/Article';
import { ArticleApiService } from '../../services/article-api.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  displayedColumnsAllParties: string[] = ['nom','type','stock','prix'];
  @ViewChild(MatSort) sort!: MatSort;
  public pageSlice!: Article[];
  deleteProduct!:boolean
  dataSourceAllParties:any;
  parties : Article[] = []
  articleDelete :any[] = []
  constructor(private elementRef:ElementRef,private dialog:MatDialog,private article_api:ArticleApiService,private _liveAnnouncer: LiveAnnouncer,private cd: ChangeDetectorRef){}
    ngOnInit(): void {
      this.article_api.getAllProduct().subscribe(data=>{
        const myJson = JSON.stringify(data);
        const myObj = JSON.parse(myJson);
        for(let i = 0; i < myObj.products.length; i++){
          let newElement = new Article(myObj.products[i].nom,myObj.products[i].type,myObj.products[i].stock,myObj.products[i].prix);
          this.parties.push(newElement);
          console.log(this.parties[i])

        }
         console.log(myObj.products[0])
         this.pageSlice = this.parties.slice(0,3);
            this.dataSourceAllParties = new MatTableDataSource(this.pageSlice)
      })
      this.articleDelete = this.parties
    }
    modal(){
      let dia = new dialog(this.dialog);
      const dialogRef = dia.openDialog(DialogArticleComponent);
      dialogRef.afterClosed().subscribe((result: { productName: string; productType: string,stockProduct:number,prixProduct:number }) => {
        console.log("Nom du produit: " + result.productName + " Type de produit: " + result.productType+" stock: " + result.stockProduct+ " prix: " + result.prixProduct);
        let article = new Article(result.productName, result.productType, result.stockProduct,result.prixProduct)
        this.article_api.insert(article).subscribe(data=>{
            console.log(data);
            let newProduct = article;

            this.parties.push(newProduct);//ajoute l'elements au tableau 
            this.pageSlice = this.parties.slice(0,3);
     
            this.dataSourceAllParties = new MatTableDataSource(this.parties);//remet a jour la vue
      
            this.cd.detectChanges();//detecte les changements
        })
      });
      
      this.cd.markForCheck(); 
    }
    OnPageChange(event: PageEvent): void {
      const debut = event.pageIndex * event.pageSize;
      let finIndex = debut + event.pageSize;
      if (finIndex > this.parties.length) {
        finIndex = this.parties.length;
      }
      this.pageSlice = this.parties.slice(debut, finIndex);
      this.dataSourceAllParties = this.pageSlice;
    }
    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }
    //cote front -> faut faire la suppression cote back 
    delete(){
        this.parties = this.articleDelete
        console.log("parties "+this.parties)
        this.pageSlice = this.parties.slice(0,3);
        this.dataSourceAllParties = new MatTableDataSource(this.parties);//remet a jour la vue
        this.cd.detectChanges();//detecte les changements
     
    }
    fieldsChange(values:any,val:any):void {
      console.log(values);
      console.log(val.currentTarget.checked);
      if(!val.currentTarget.checked){
       // this.articleDelete.push(values)
      }else{
        this.articleDelete = this.articleDelete.filter(object => {
          return object.productName !== values}
          ); 

      }
    }
    
}
