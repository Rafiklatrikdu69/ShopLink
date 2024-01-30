export class Article{
    id!:number
    productName!: string;
    productType!:string;
    stockProduct!:number;
    prixProduct!:number

    constructor(id:number,prodName:string,prodType:string,prodStock:number,prodPrix:number){
        this.id = id
        this.productName= prodName;
        this.productType = prodType;
        this.stockProduct = prodStock;
        this.prixProduct = prodPrix;
    }
  
  
}