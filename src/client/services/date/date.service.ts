export interface DateService {
    formatToHumanReadableDate(date: string): string
    today(): Date
}

