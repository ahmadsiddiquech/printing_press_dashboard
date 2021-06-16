import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdditionaloptionsService {

  private additionaloptionsUrl = `http://localhost:3000/api/additionaloptions`;
  constructor(private http:HttpClient) { }
  public getAdditionaloptionSubject:BehaviorSubject<any>=new BehaviorSubject<any>(false);

  getAdditionaloptions():Observable<any>{
    return this.http.get(this.additionaloptionsUrl);
  }

  getAdditionaloptionBySubcategory(id:any){
    return this.http.get(this.additionaloptionsUrl+'/get_additionaloption_by_subcategory/'+id);
  }

  getAdditionaloption(id:any){
    return this.http.get(this.additionaloptionsUrl+'/'+id);
  }

  addAdditionaloption(additionaloption: any){
    return this.http.post(this.additionaloptionsUrl,additionaloption);
  }

  deleteAdditionaloption(id:any){
    return this.http.delete(this.additionaloptionsUrl+'/'+id);
  }

  updateAdditionaloptions(id:any,additionaloption:any){
    return this.http.put(this.additionaloptionsUrl+'/'+id,additionaloption);
  }
}