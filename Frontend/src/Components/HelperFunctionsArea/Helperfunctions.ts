class HelperFunctions {

    public static getFormattedIsraeliDate(dateInput: Date | string): string {
        console.log('Formatting date input:', dateInput);
        
        let date: Date;

        if (typeof dateInput === 'string') {
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
    
}
 export default HelperFunctions;