import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/admin-users', title: 'Users', icon: 'person', class: '' },
  { path: '/categories', title: 'Categories', icon: 'view_list', class: '' },
  { path: '/subcategories', title: 'Sub Categories', icon: 'list', class: '' },
  // { path: '/finishingoptions', title: 'Finishing Options',  icon:'receipt', class: '' },
  // { path: '/additionaloptions', title: 'Additional Options',  icon:'playlist_add', class: '' },
  // { path: '/unfoldedsize', title: 'Unfolded Size',  icon:'aspect_ratio', class: '' },
  // { path: '/foldingstyle', title: 'Folding Style',  icon:'tab_unselected', class: '' },
  // { path: '/printedsides', title: 'Printed Sides',  icon:'splitscreen', class: '' },
  // { path: '/papertype', title: 'Paper Type',  icon:'feed', class: '' },
  { path: '/products', title: 'Products', icon: 'backpack', class: '' },
  { path: '/productoptions', title: 'Product Options', icon: 'playlist_add', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
