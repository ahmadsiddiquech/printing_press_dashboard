import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AdminUsersComponent } from '../../admin-users/admin-users.component';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { AdminUsersModalComponent } from '../../admin-users-modal/admin-users-modal.component';

import { CategoriesComponent } from '../../categories/categories.component';
import { CategoryModalComponent } from '../../category-modal/category-modal.component';

import { SubcategoriesComponent } from '../../subcategories/subcategories.component';
import { SubcategoriesModalComponent } from '../../subcategories-modal/subcategories-modal.component';

import { ProductoptionsComponent } from '../../productoptions/productoptions.component';
import { ProductoptionsModalComponent } from '../../productoptions-modal/productoptions-modal.component';

import { ProductsComponent } from '../../products/products.component';
import { ProductsModalComponent } from '../../products-modal/products-modal.component';

import { ProductoptionsuploadModalComponent } from '../../productoptionsupload-modal/productoptionsupload-modal.component';
import { OrdersComponent } from '../../orders/orders.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  declarations: [
    DashboardComponent,
    AdminUsersComponent,
    UserProfileComponent,
    AdminUsersModalComponent,
    CategoryModalComponent,
    CategoriesComponent,
    SubcategoriesModalComponent,
    SubcategoriesComponent,
    ProductsComponent,
    ProductsModalComponent,
    ProductoptionsComponent,
    ProductoptionsModalComponent,
    ProductoptionsuploadModalComponent,
    OrdersComponent,
  ]
})

export class AdminLayoutModule { }
