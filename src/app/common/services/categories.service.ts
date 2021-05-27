import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesUrl = `http://localhost:3000/api/categories`;
  constructor(private http:HttpClient) { }
  public getCategorySubject:BehaviorSubject<any>=new BehaviorSubject<any>(false);

  getCategories():Observable<any>{
    return this.http.get(this.categoriesUrl);
  }

  getcategory(id:any){
    return this.http.get(this.categoriesUrl+'/'+id);
  }

  addCategory(category: any){
    return this.http.post(this.categoriesUrl,category);
  }

  deleteCategory(id:any){
    return this.http.delete(this.categoriesUrl+'/'+id);
  }

  updateCategories(id:any,category:any){
    return this.http.put(this.categoriesUrl+'/'+id,category);
  }

  updateCategoriesImage(id:any,category:any){
    return this.http.put(this.categoriesUrl+'/upload_image/'+id,category);
  }
}
