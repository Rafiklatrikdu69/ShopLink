export class Article{
    productName!: string;
    productType!:string;
    stockProduct!:number;
    prixProduct!:number

    constructor(prodName:string,prodType:string,prodStock:number,prodPrix:number){
        this.productName= prodName;
        this.productType = prodType;
        this.stockProduct = prodStock;
        this.prixProduct = prodPrix;
    }
  
  
}