import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
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
import { OrderService } from '../../../shared/services/order.service';

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
        this.onQuantityChange();
    }

    initializeForm(): void {
        this.beverageOrderForm = this.formBuilder.group(
            {
                teaQuantity: [0, Validators.required],
                teaAmount: ['', this.amountValidator('teaQuantity')],
                coffeeQuantity: [0, Validators.required],
                coffeeAmount: ['', this.amountValidator('coffeeQuantity')],
                notes: [''],
                roomNumber: ['', Validators.required],
            },
            { validator: this.validateTeaAndCoffee },
        );
    }

    amountValidator(quantityControlName: string) {
        return (control: AbstractControl) => {
            const quantityControl = control.parent?.get(quantityControlName);
            if (quantityControl && quantityControl.value > 0 && !control.value) {
                return { required: true };
            }
            return null;
        };
    }
    validateTeaAndCoffee(group: FormGroup) {
        const teaQuantity = group.get('teaQuantity')!.value;
        const coffeeQuantity = group.get('coffeeQuantity')!.value;

        if (teaQuantity === 0 && coffeeQuantity === 0) return { invalidBeverageOrder: true };
        else return null;
    }

    onQuantityChange(): void {
        this.beverageOrderForm.get('teaQuantity')!.valueChanges.subscribe(() => {
            const teaAmountControl = this.beverageOrderForm.get('teaAmount');
            teaAmountControl?.updateValueAndValidity();
        });

        this.beverageOrderForm.get('coffeeQuantity')!.valueChanges.subscribe(() => {
            const coffeeAmountControl = this.beverageOrderForm.get('coffeeAmount');
            coffeeAmountControl?.updateValueAndValidity();
        });
    }

    onSubmit(): void {
        this.beverageOrderForm.markAllAsTouched();
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
