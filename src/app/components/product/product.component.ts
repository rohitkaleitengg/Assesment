import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { TableModule } from 'primeng/table';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [TableModule, ReactiveFormsModule, NgxChartsModule, ButtonModule, InputTextModule, FloatLabelModule, FormsModule, InputIconModule, IconFieldModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  products: Product[] = [{ id: 1, name: 'Samsung', price: 100, category: 'Category A' },
  { id: 2, name: 'Apple', price: 200, category: 'Category A' },
  { id: 3, name: 'Nokia', price: 300, category: 'Category B' }];
  productForm: FormGroup;
  isEditing: boolean = false;
  currentProductId: number | null = null;
  chartData: any[] = [];
  colorScheme = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal
  };

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.updateChartData()
  }

  updateChartData() {
    this.chartData = this.products.map(product => ({
      name: product.name,
      value: product.price,
    }));
  }

  addProducts() {
    if (this.productForm.valid) {
      const newProduct: Product = {
        id: this.products.length + 1,
        ...this.productForm.value
      };
      this.products = [...this.products, newProduct]
      this.cdr.detectChanges();
      this.updateChartData();
      this.productForm.reset();
    }
  }

  editProduct(product: Product) {
    this.isEditing = true;
    this.currentProductId = product.id;
    this.productForm.patchValue(product);
  }

  updateProduct() {
    if (this.productForm.valid && this.currentProductId !== null) {
      const updatedProduct = this.products.find(p => p.id === this.currentProductId);
      if (updatedProduct) {
        Object.assign(updatedProduct, this.productForm.value);
      }
      this.isEditing = false;
      this.productForm.reset();
      this.currentProductId = null;
      this.updateChartData();
    }
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id);
    this.updateChartData();
  }
}
