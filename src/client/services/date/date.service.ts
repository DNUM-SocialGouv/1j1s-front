export interface DateService {
    formatToHumanReadableDate(date: Date): string
    today(): Date
}

