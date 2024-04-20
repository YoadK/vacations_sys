class HelperFunctions {

    public static getFormattedIsraeliDate(dateInput: Date | string): string {    
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
    public static formatDateToISO(dateString: string): string {
        // Check if the input is in ISO format
        if (dateString.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
            // If the input is in ISO format, extract the date part
            return dateString.slice(0, 10);
        }
    
        // If the input is in the expected "DD.MM.YYYY" format, proceed with the existing logic
        if (!dateString || !dateString.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
            console.error('Invalid date format:', dateString);
            return '';
        }
    
        const parts = dateString.split('.');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
    
        // Construct the date string in YYYY-MM-DD format
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    
    public static formatDateToYMD(dateString: string | undefined): string {
        if (dateString === undefined) {
            console.error('Date string is undefined');
            return '';
        }
    
        // Check if the input is in ISO format
        if (dateString.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
            // If the input is in ISO format, extract the date part
            return dateString.slice(0, 10);
        }
    
        // If the input is in the "DD.MM.YYYY" format
        if (dateString.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
            const parts = dateString.split('.');
            const day = parts[0];
            const month = parts[1];
            const year = parts[2];
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
    
        // If the input is in the "YYYY-MM-DD" format, return it as is
        if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return dateString;
        }
    
        console.error('Invalid date format:', dateString);
        return '';
    }


    static isDate1BeforeDate2(date1: string, date2: string): boolean {
        // Convert date strings to Date objects
        const date1Obj = new Date(date1);
        const date2Obj = new Date(date2);
       
        // Compare the Date objects
        return date1Obj < date2Obj;
    }


    static isDateInThePast(dateString: string): boolean {
        const currentDate = new Date();
        const inputDate = new Date(dateString);

        // Set the time portion of the current date to 00:00:00 in order to avoid problems with date comparison when dates are today's date but the time is different
        currentDate.setHours(0, 0, 0, 0);

        return inputDate < currentDate;
    }

    static areDatesValid(startDate: string, endDate: string): boolean {
        if (this.isDateInThePast(startDate)) {
            return false;
        }

        if (this.isDateInThePast(endDate)) {
            return false;
        }

        if (!this.isDate1BeforeDate2(startDate, endDate)) {
            return false;
        }

        return true;
    }


}
export default HelperFunctions;