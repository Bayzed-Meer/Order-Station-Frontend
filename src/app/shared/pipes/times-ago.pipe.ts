import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timesAgo',
    standalone: true,
})
export class TimesAgoPipe implements PipeTransform {
    transform(value: string): string {
        const now = new Date();
        const createdAt = new Date(value);
        const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

        const days = Math.floor(diffInSeconds / 86400);
        const hours = Math.floor((diffInSeconds % 86400) / 3600);
        const minutes = Math.floor((diffInSeconds % 3600) / 60);

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return 'just now';
        }
    }
}
