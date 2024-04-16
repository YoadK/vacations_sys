class HelperFunctions {

    public static getFormattedIsraeliDate(dateInput: Date | string): string {
        // console.log('Formatting date input:', dateInput);
        
        let date: Date;
    
        if (typeof dateInput === 'string') {
            // Handle date strings in "YYYY-MM-DD" format
            const parts = dateInput.split('-');
    
            if (parts.length === 3) {
                const [year, month, day] = parts.map(part => parseInt(part, 10));
                if (day > 0 && day <= 31 && month > 0 && month <= 12 && year > 0) {
                    date = new Date(dateInput);
                } else {
                    console.error('Date parts are out of range:', day, month, year);
                    return 'Invalid Date';
                }
            } else {
                // Handle different date string formats, like "DD.MM.YYYY"
                let dateString = dateInput.replace(/\./g, '-');
                const parts = dateString.split('-');
    
                // Check if the date string is in DD-MM-YYYY format after replacing dots with dashes
                if (parts.length === 3) {
                    const [day, month, year] = parts.map(part => parseInt(part, 10));
                    if (day > 0 && day <= 31 && month > 0 && month <= 12 && year > 0) {
                        // Construct a date string in "YYYY-MM-DD" format for the Date constructor
                        dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                        date = new Date(dateString);
                    } else {
                        console.error('Date parts are out of range:', day, month, year);
                        return 'Invalid Date';
                    }
                } else {
                    console.error('Invalid date format:', dateString);
                    return 'Invalid Date';
                }
            }
        } else if (dateInput instanceof Date) {
            date = dateInput;
        } else {
            console.error('Invalid date input:', dateInput);
            return 'Invalid Date';
        }
    
        if (isNaN(date.getTime())) {
            console.error('Invalid date after processing:', dateInput);
            return 'Invalid Date';
        }
    
        const formatter = new Intl.DateTimeFormat('he-IL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    
        return formatter.format(date);
    }

    public static formatDateToISO(dateString:string):string {
        // Ensure the input is in the expected format
        if (!dateString || !dateString.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
            console.error('Invalid date format:', dateString);
            return '';
        }
    
        const parts = dateString.split('.');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
    
        // Construct the ISO date string in yyyy-MM-dd format
        return `${year}-${month}-${day}`;
    }

    //temp -works.
    // static formatDate(dateString: string): string {
    //     const date = new Date(dateString);
    //     const day = date.getDate().toString().padStart(2, '0');
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
    //     const year = date.getFullYear().toString();
    
    //     return `${day}-${month}-${year}`;
    //   }

    static isDate1BeforeDate2(date1: string, date2: string): boolean {
        // Convert date strings to "dd-mm-yyyy" format
        const formattedDate1 = this.getFormattedIsraeliDate(date1);
        const formattedDate2 = this.getFormattedIsraeliDate(date2);
    
        // Compare the formatted dates
        return formattedDate1 < formattedDate2;
      }
    
    
}
 export default HelperFunctions;