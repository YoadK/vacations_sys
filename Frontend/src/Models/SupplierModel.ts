class SupplierModel {

	public id: number;
    public company: string;
    public country: string;
    public city: string;
    public address: string;
    public phone: string;
    public imageUrl: string;
    public image: File;

    public static companyValidation = {
        required: { value: true, message: "Missing company." },
        minLength: { value: 2, message: "Company name must be minimum 2 chars." },
        maxLength: { value: 50, message: "Company name can't exceed 50 chars." }
    };

    public static countryValidation = {
        required: { value: true, message: "Missing country." },
        minLength: { value: 2, message: "Country name must be minimum 2 chars." },
        maxLength: { value: 30, message: "Country name can't exceed 30 chars." }
    };


}

export default SupplierModel;
