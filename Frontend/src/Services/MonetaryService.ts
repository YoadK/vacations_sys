class MonetaryService {

    private vat = 0.17;

    public getVat(price: number): number {
        return price * this.vat;
    }
    
}

export const monetaryService = new MonetaryService();
