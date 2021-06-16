import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrintedsidesService {

  private printedsidesUrl = `http://localhost:3000/api/printedsides`;
  constructor(private http:HttpClient) { }
  public getPrintedsidesSubject:BehaviorSubject<any>=new BehaviorSubject<any>(false);

  getPrintedsides():Observable<any>{
    return this.http.get(this.printedsidesUrl);
  }

  getPrintedsidesBySubcategory(id:any){
    return this.http.get(this.printedsidesUrl+'/get_printedsides_by_subcategory/'+id);
  }

  getPrintedside(id:any){
    return this.http.get(this.printedsidesUrl+'/'+id);
  }

  addPrintedsides(printedsides: any){
    return this.http.post(this.printedsidesUrl,printedsides);
  }

  deletePrintedsides(id:any){
    return this.http.delete(this.printedsidesUrl+'/'+id);
  }

  updatePrintedsides(id:any,printedsides:any){
    return this.http.put(this.printedsidesUrl+'/'+id,printedsides);
  }
}
