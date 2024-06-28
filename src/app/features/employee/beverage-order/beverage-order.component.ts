import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';
import { showMessageDialog } from '../../../shared/utils/dialog-utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../services/order.service';

@Component({
    selector: 'app-beverage-order',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        SpinnerComponent,
        MatSelectModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './beverage-order.component.html',
    styleUrl: './beverage-order.component.scss',
})
export class BeverageOrderComponent implements OnInit {
    private orderService = inject(OrderService);
    private formBuilder = inject(FormBuilder);
    private dialog = inject(MatDialog);
    private destroyRef = inject(DestroyRef);

    beverageOrderForm!: FormGroup;
    loading = false;

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm(): void {
        this.beverageOrderForm = this.formBuilder.group(
            {
                teaQuantity: [0, Validators.required],
                teaAmount: ['half', Validators.required],
                coffeeQuantity: [0, Validators.required],
                coffeeAmount: ['half', Validators.required],
                notes: [''],
                roomNumber: ['', Validators.required],
            },
            { validator: this.validateTeaAndCoffee },
        );
    }

    validateTeaAndCoffee(group: FormGroup) {
        const teaQuantity = group.get('teaQuantity')!.value;
        const coffeeQuantity = group.get('coffeeQuantity')!.value;

        if (teaQuantity === 0 && coffeeQuantity === 0) return { invalidBeverageOrder: true };
        else return null;
    }

    onSubmit(): void {
        if (this.beverageOrderForm.valid) {
            const formData = { ...this.beverageOrderForm.value };

            this.orderService
                .createOrder(formData)
                .pipe(
                    tap((response) => {
                        this.loading = false;
                        showMessageDialog(this.dialog, response.message, 'close');
                    }),
                    catchError((error) => {
                        this.loading = false;
                        showMessageDialog(this.dialog, error.error.message, 'close');
                        console.log(error);
                        return of(error);
                    }),
                    takeUntilDestroyed(this.destroyRef),
                )
                .subscribe();
        }
    }

    incrementQuantity(drink: string) {
        const currentQuantity = this.beverageOrderForm.get(`${drink}Quantity`)!.value;
        this.beverageOrderForm.get(`${drink}Quantity`)!.setValue(currentQuantity + 1);
    }

    decrementQuantity(drink: string) {
        const currentQuantity = this.beverageOrderForm.get(`${drink}Quantity`)!.value;
        if (currentQuantity > 0) {
            this.beverageOrderForm.get(`${drink}Quantity`)!.setValue(currentQuantity - 1);
        }
    }
}
