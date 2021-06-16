import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnfoldedsizeService {

  private unfoldedsizeUrl = `http://localhost:3000/api/unfoldedsize`;
  constructor(private http:HttpClient) { }
  public getUnfoldedsizeSubject:BehaviorSubject<any>=new BehaviorSubject<any>(false);

  getUnfoldedsizes():Observable<any>{
    return this.http.get(this.unfoldedsizeUrl);
  }

  getUnfoldedsizeBySubcategory(id:any){
    return this.http.get(this.unfoldedsizeUrl+'/get_unfoldedsize_by_subcategory/'+id);
  }

  getUnfoldedsize(id:any){
    return this.http.get(this.unfoldedsizeUrl+'/'+id);
  }

  addUnfoldedsize(unfoldedsize: any){
    return this.http.post(this.unfoldedsizeUrl,unfoldedsize);
  }

  deleteUnfoldedsize(id:any){
    return this.http.delete(this.unfoldedsizeUrl+'/'+id);
  }

  updateUnfoldedsize(id:any,unfoldedsize:any){
    return this.http.put(this.unfoldedsizeUrl+'/'+id,unfoldedsize);
  }
}
