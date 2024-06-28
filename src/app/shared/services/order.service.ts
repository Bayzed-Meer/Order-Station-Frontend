import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BeverageOrder } from '../../features/models/beverage-order.model';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private http = inject(HttpClient);
    private API = 'http://localhost:3000';

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
