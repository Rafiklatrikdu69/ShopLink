import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

export class dialog{
    private dialog!:MatDialog
    animal!: string;
    name!: string;
    constructor(dialog:any){
       this.dialog = dialog
    }

   public openDialog(composant:any){
        return this.dialog.open(composant, {
            width:'300px',
            height:'auto',
            data: {name: this.name}
        })
    }
    
}