import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { AdminUsersComponent } from '../../admin-users/admin-users.component';
import { CategoriesComponent } from '../../categories/categories.component';
import { SubcategoriesComponent } from '../../subcategories/subcategories.component';
import { ProductsComponent } from '../../products/products.component';
import { ProductoptionsComponent } from '../../productoptions/productoptions.component';
import { OrdersComponent } from '../../orders/orders.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'admin-users', component: AdminUsersComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'subcategories', component: SubcategoriesComponent },
    { path: 'productoptions', component: ProductoptionsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'orders', component: OrdersComponent },


];