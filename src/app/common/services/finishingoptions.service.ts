import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinishingoptionsService {

  private finishingoptionsUrl = `http://localhost:3000/api/finishingoptions`;
  constructor(private http:HttpClient) { }
  public getFinishingoptionSubject:BehaviorSubject<any>=new BehaviorSubject<any>(false);

  getFinishingoptions():Observable<any>{
    return this.http.get(this.finishingoptionsUrl);
  }

  getFinishingoptionBySubcategory(id:any){
    return this.http.get(this.finishingoptionsUrl+'/get_finishingoption_by_subcategory/'+id);
  }

  getFinishingoption(id:any){
    return this.http.get(this.finishingoptionsUrl+'/'+id);
  }

  addFinishingoption(finishingoption: any){
    return this.http.post(this.finishingoptionsUrl,finishingoption);
  }

  deleteFinishingoption(id:any){
    return this.http.delete(this.finishingoptionsUrl+'/'+id);
  }

  updateFinishingoptions(id:any,finishingoption:any){
    return this.http.put(this.finishingoptionsUrl+'/'+id,finishingoption);
  }

}