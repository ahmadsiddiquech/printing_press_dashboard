import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaperweightService {

  private paperweightUrl = `http://localhost:3000/api/paperweight`;
  constructor(private http:HttpClient) { }
  public getPaperweightSubject:BehaviorSubject<any>=new BehaviorSubject<any>(false);

  getPaperweights():Observable<any>{
    return this.http.get(this.paperweightUrl);
  }

  getPaperweightBySubcategory(id:any){
    return this.http.get(this.paperweightUrl+'/get_paperweight_by_subcategory/'+id);
  }

  getPaperweight(id:any){
    return this.http.get(this.paperweightUrl+'/'+id);
  }

  addPaperweight(paperweight: any){
    return this.http.post(this.paperweightUrl,paperweight);
  }

  deletePaperweight(id:any){
    return this.http.delete(this.paperweightUrl+'/'+id);
  }

  updatePaperweight(id:any,paperweight:any){
    return this.http.put(this.paperweightUrl+'/'+id,paperweight);
  }
}
