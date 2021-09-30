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
  { path: '/products', title: 'Products', icon: 'backpack', class: '' },
  { path: '/productoptions', title: 'Product Options', icon: 'playlist_add', class: '' },
  { path: '/orders', title: 'Orders', icon: 'list_alt', class: '' }
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
