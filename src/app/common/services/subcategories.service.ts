import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  private subcategoriesUrl = `https://printingpressapi.herokuapp.com/api/subcategories`;
  constructor(private http: HttpClient) { }
  public getSubcategorySubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  getSubcategories(): Observable<any> {
    return this.http.get(this.subcategoriesUrl);
  }

  getSubcategory(id: any) {
    return this.http.get(this.subcategoriesUrl + '/' + id);
  }

  getSubcategoryByCategory(id: any) {
    return this.http.get(this.subcategoriesUrl + '/get_subcategory_by_category/' + id);
  }

  addSubcategory(subcategory: any) {
    return this.http.post(this.subcategoriesUrl, subcategory);
  }

  deleteSubcategory(id: any) {
    return this.http.delete(this.subcategoriesUrl + '/' + id);
  }

  updateSubcategories(id: any, subcategory: any) {
    return this.http.put(this.subcategoriesUrl + '/' + id, subcategory);
  }

  updateSubcategoriesImage(id: any, subcategory: any) {
    return this.http.put(this.subcategoriesUrl + '/upload_image/' + id, subcategory);
  }
}
