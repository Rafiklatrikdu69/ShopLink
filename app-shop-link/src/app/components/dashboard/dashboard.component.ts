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
  saveArticleDelete :any[] = []
  constructor(private elementRef:ElementRef,private dialog:MatDialog,private article_api:ArticleApiService,private _liveAnnouncer: LiveAnnouncer,private cd: ChangeDetectorRef){}
  ngOnInit(): void {
    this.article_api.getAllProduct().subscribe(data=>{
      const myJson = JSON.stringify(data);
      const myObj = JSON.parse(myJson);
      for(let i = 0; i < myObj.products.length; i++){
        console.log(myObj.products[i].id);
       
        let newElement = new Article(myObj.products[i].id,myObj.products[i].nom,myObj.products[i].type,myObj.products[i].stock,myObj.products[i].prix);
        this.parties.push(newElement);
        console.log(this.parties[i])
        
      }
      console.log(myObj.products[0])
      this.pageSlice = this.parties.slice(0,3);
      this.dataSourceAllParties = new MatTableDataSource(this.pageSlice)
    })
    //this.articleDelete = this.parties
    this.saveArticleDelete = this.parties
  }
  modal(){
    let dia = new dialog(this.dialog);
    const dialogRef = dia.openDialog(DialogArticleComponent);
    dialogRef.afterClosed().subscribe((result: { productName: string; productType: string,stockProduct:number,prixProduct:number }) => {
      console.log("Nom du produit: " + result.productName + " Type de produit: " + result.productType+" stock: " + result.stockProduct+ " prix: " + result.prixProduct);
    
      this.article_api.getLastId().subscribe(data=>{
     
        if(data!==null){ 
          const myJson = JSON.stringify(data);
          const myObj = JSON.parse(myJson);
          console.log("data"+myObj.data[0].id)
      let article = new Article(myObj.data[0].id+1,result.productName, result.productType, result.stockProduct,result.prixProduct)
      this.article_api.insert(article).subscribe(data=>{
        console.log(data);
        let newProduct = article;
        
        this.parties.push(newProduct);//ajoute l'elements au tableau 
        this.pageSlice = this.parties.slice(0,3);
        
        this.dataSourceAllParties = new MatTableDataSource(this.parties);//remet a jour la vue
        
        this.cd.detectChanges();//detecte les changements
      })
    }else{
      let article = new Article(1,result.productName, result.productType, result.stockProduct,result.prixProduct)
      this.article_api.insert(article).subscribe(data=>{
        console.log(data);
        let newProduct = article;
        
        this.parties.push(newProduct);//ajoute l'elements au tableau 
        this.pageSlice = this.parties.slice(0,3);
        
        this.dataSourceAllParties = new MatTableDataSource(this.parties);//remet a jour la vue
        
        this.cd.detectChanges();//detecte les changements
      })
    
    }
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
    console.log(JSON.stringify(this.articleDelete))
     this.article_api.deleteProduct(this.articleDelete).subscribe(data=>{
       //this.articleDelete = []
     })
    //this.parties = this.articleDelete 
    console.log("parties "+this.parties)
    this.pageSlice = this.parties.slice(0,3);
    this.dataSourceAllParties = new MatTableDataSource(this.parties);//remet a jour la vue
    
    this.cd.detectChanges();//detecte les changements
    this.cd.markForCheck()
    
  }
  fieldsChange(values:any,val:any):void {
    console.log(values);
    console.log(val.currentTarget.checked);
    const existingItemIndex = this.articleDelete.findIndex((element) => element.productName === values);
    
    if (!val.currentTarget.checked) {
      if (existingItemIndex !== -1) {
        this.articleDelete.splice(existingItemIndex, 1);
        console.log("tableau : "+JSON.stringify(this.articleDelete))
      }
    }else{
      this.saveArticleDelete = this.saveArticleDelete.filter(object => {
        return object.productName !== values}
        );
        
        const val = this.parties.find((element) => element.productName ===values);
        
        this.articleDelete.push(val)
        console.log("tableau : "+JSON.stringify(this.articleDelete))
        this.saveArticleDelete = this.saveArticleDelete.filter(object => {
          return !this.articleDelete.includes(object); 
        }
      
      )

      }
    }
    
}
