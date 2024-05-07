export interface DateService {
    formatToHumanReadableDate(date: string | Date): string
    today(): Date
}

