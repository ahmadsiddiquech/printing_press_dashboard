import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoldingstyleService {

  private foldingstyleUrl = `http://localhost:3000/api/foldingstyle`;
  constructor(private http:HttpClient) { }
  public getFoldingstyleSubject:BehaviorSubject<any>=new BehaviorSubject<any>(false);

  getfoldingstyles():Observable<any>{
    return this.http.get(this.foldingstyleUrl);
  }

  getFoldingstyleBySubcategory(id:any){
    return this.http.get(this.foldingstyleUrl+'/get_foldingstyle_by_subcategory/'+id);
  }

  getFoldingstyle(id:any){
    return this.http.get(this.foldingstyleUrl+'/'+id);
  }

  addFoldingstyle(foldingstyle: any){
    return this.http.post(this.foldingstyleUrl,foldingstyle);
  }

  deleteFoldingstyle(id:any){
    return this.http.delete(this.foldingstyleUrl+'/'+id);
  }

  updateFoldingstyle(id:any,foldingstyle:any){
    return this.http.put(this.foldingstyleUrl+'/'+id,foldingstyle);
  }
}
