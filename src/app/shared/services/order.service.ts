import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BeverageOrder } from '../../features/models/beverage-order.model';
import { io } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private http = inject(HttpClient);
    private API = environment.apiUrl;
    private socket = io(this.API);

    private orderUpdatedSubject = new Subject<void>();

    constructor() {
        this.socket.on('orderUpdated', () => {
            this.orderUpdatedSubject.next();
        });
    }

    getOrderUpdates(): Observable<void> {
        return this.orderUpdatedSubject.asObservable();
    }

    createOrder(formData: FormData): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.API}/orders/create-order`, formData);
    }

    getCurrentOrders(): Observable<BeverageOrder[]> {
        return this.http.get<BeverageOrder[]>(`${this.API}/orders/get-current-orders`);
    }

    cancelOrder(id: string, role: string): Observable<{ message: string }> {
        if (role === 'employee')
            return this.http.delete<{ message: string }>(`${this.API}/orders/delete-order/${id}`);
        return this.http.patch<{ message: string }>(`${this.API}/orders/cancel-order`, { id });
    }

    aprroveOrder(id: string): Observable<{ message: string }> {
        return this.http.patch<{ message: string }>(`${this.API}/orders/approve-order`, { id });
    }

    completeOrder(id: string): Observable<{ message: string }> {
        return this.http.patch<{ message: string }>(`${this.API}/orders/complete-order`, { id });
    }

    getOrderHistory(): Observable<BeverageOrder[]> {
        return this.http.get<BeverageOrder[]>(`${this.API}/orders/get-order-history`);
    }
}
