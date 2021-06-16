import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PapertypeService {

  private papertypeUrl = `http://localhost:3000/api/papertype`;
  constructor(private http:HttpClient) { }
  public getPapertypeSubject:BehaviorSubject<any>=new BehaviorSubject<any>(false);

  getPapertypes():Observable<any>{
    return this.http.get(this.papertypeUrl);
  }

  getPapertypeBySubcategory(id:any){
    return this.http.get(this.papertypeUrl+'/get_papertype_by_subcategory/'+id);
  }

  getPapertype(id:any){
    return this.http.get(this.papertypeUrl+'/'+id);
  }

  addPapertype(papertype: any){
    return this.http.post(this.papertypeUrl,papertype);
  }

  deletePapertype(id:any){
    return this.http.delete(this.papertypeUrl+'/'+id);
  }

  updatePapertype(id:any,papertype:any){
    return this.http.put(this.papertypeUrl+'/'+id,papertype);
  }
}
