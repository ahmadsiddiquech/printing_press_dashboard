import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { AdminUsersComponent } from '../../admin-users/admin-users.component';
import { CategoriesComponent } from '../../categories/categories.component';
import { SubcategoriesComponent } from '../../subcategories/subcategories.component';
import { FinishingoptionsComponent } from '../../finishingoptions/finishingoptions.component';
import { ProductsComponent } from '../../products/products.component';
import { AdditionaloptionsComponent } from '../../additionaloptions/additionaloptions.component';
import { UnfoldedsizeComponent } from '../../unfoldedsize/unfoldedsize.component';
import { FoldingstyleComponent } from '../../foldingstyle/foldingstyle.component';
import { PrintedsidesComponent } from '../../printedsides/printedsides.component';
import { PapertypeComponent } from '../../papertype/papertype.component';
import { ProductoptionsComponent } from '../../productoptions/productoptions.component';

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
    { path: 'finishingoptions', component: FinishingoptionsComponent },
    { path: 'additionaloptions', component: AdditionaloptionsComponent },
    { path: 'unfoldedsize', component: UnfoldedsizeComponent },
    { path: 'foldingstyle', component: FoldingstyleComponent },
    { path: 'printedsides', component: PrintedsidesComponent },
    { path: 'papertype', component: PapertypeComponent },
    { path: 'productoptions', component: ProductoptionsComponent },
    { path: 'products', component: ProductsComponent },


];