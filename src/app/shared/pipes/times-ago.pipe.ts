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
            return `${days}d ${hours}h ago`;
        } else if (hours > 0) {
            return `${hours}h ${minutes}m ago`;
        } else if (minutes > 0) {
            return `${minutes}m ago`;
        } else {
            return 'just now!';
        }
    }
}
