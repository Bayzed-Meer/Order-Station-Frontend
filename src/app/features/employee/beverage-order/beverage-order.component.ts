import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { MatDialog } from '@angular/material/dialog';
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
        this.setUpValidators();
    }

    initializeForm(): void {
        this.beverageOrderForm = this.formBuilder.group(
            {
                teaQuantity: [null],
                teaAmount: [''],
                coffeeQuantity: [null],
                coffeeAmount: [''],
                notes: [''],
                roomNumber: ['', Validators.required],
            },
            { validator: this.validateTeaAndCoffee },
        );
    }

    setUpValidators(): void {
        const teaQuantityControl = this.beverageOrderForm.get('teaQuantity');
        const coffeeQuantityControl = this.beverageOrderForm.get('coffeeQuantity');
        const teaAmountControl = this.beverageOrderForm.get('teaAmount');
        const coffeeAmountControl = this.beverageOrderForm.get('coffeeAmount');

        teaQuantityControl?.valueChanges
            .pipe(
                tap((value) => {
                    teaAmountControl?.setValidators(value > 0 ? Validators.required : null);
                    teaAmountControl?.updateValueAndValidity();
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();

        coffeeQuantityControl?.valueChanges
            .pipe(
                tap((value) => {
                    coffeeAmountControl?.setValidators(value > 0 ? Validators.required : null);
                    coffeeAmountControl?.updateValueAndValidity();
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();

        teaAmountControl?.valueChanges
            .pipe(
                tap((value) => {
                    teaQuantityControl?.setValidators(
                        value === 'half' || value === 'full' ? Validators.required : null,
                    );
                    teaQuantityControl?.updateValueAndValidity();
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();

        coffeeAmountControl?.valueChanges
            .pipe(
                tap((value) => {
                    coffeeQuantityControl?.setValidators(
                        value === 'half' || value === 'full' ? Validators.required : null,
                    );
                    coffeeQuantityControl?.updateValueAndValidity();
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }

    validateTeaAndCoffee(group: FormGroup): Record<string, boolean> | null {
        const teaQuantity = group.get('teaQuantity')?.value;
        const coffeeQuantity = group.get('coffeeQuantity')?.value;
        const teaAmount = group.get('teaAmount')?.value;
        const coffeeAmount = group.get('coffeeAmount')?.value;

        if (
            teaQuantity === null &&
            coffeeQuantity === null &&
            teaAmount === '' &&
            coffeeAmount === ''
        )
            return { invalidBeverageOrder: true };
        else if (teaQuantity <= 0 || coffeeQuantity <= 0) return { invalidQuantity: true };
        return null;
    }

    checkPopUp(): void {
        if (
            this.beverageOrderForm.errors?.['invalidBeverageOrder'] &&
            !this.beverageOrderForm.get('roomNumber')?.errors?.['required']
        ) {
            showMessageDialog(
                this.dialog,
                'Please select at least one between tea or coffee.',
                'Close',
            );
        } else if (this.beverageOrderForm.errors?.['invalidQuantity']) {
            showMessageDialog(this.dialog, 'Quantity must be greater then zero', 'Close');
        }
    }

    onSubmit(): void {
        this.beverageOrderForm.markAllAsTouched();
        this.checkPopUp();
        if (this.beverageOrderForm.valid) {
            console.log(this.beverageOrderForm.value);

            this.loading = true;
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
}
