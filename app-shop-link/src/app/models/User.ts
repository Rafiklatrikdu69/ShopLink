export class User{
    private pseudo!:string;
    private pwd!:string;
    constructor(private pseud : string, private password: string){
            this.pseudo = pseud
            this.pwd = password
    }
    public getPseudo():string{
        return this.pseudo
    }
    public getPassword():string{
        return this.pwd 
    }

}