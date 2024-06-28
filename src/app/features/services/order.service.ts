import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BeverageOrder } from '../models/beverage-order.model';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private http = inject(HttpClient);
    private API = 'http://localhost:3000';

    createOrder(formData: FormData): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.API}/orders/create-order`, formData);
    }

    getOrders(): Observable<BeverageOrder[]> {
        return this.http.get<BeverageOrder[]>(`${this.API}/orders/get-orders`);
    }

    deleteOrder(id: string): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.API}/orders/delete-order/${id}`);
    }
}
