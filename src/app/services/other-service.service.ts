import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherServiceService {
  private _subject = new Subject<any>();

  newEvent(event:any){
    this._subject.next(event);
  }

  getEvent():Observable<any>{
    return this._subject.asObservable();
  }


  private _action = new Subject<any>();

  newAction(event:any){
    this._action.next(event);
  }

  getAction():Observable<any>{
    return this._action.asObservable();
  }



  private _actionNoPet = new Subject<any>();

  newActionNoPet(event:any){
    this._actionNoPet.next(event);
  }

  getActionNoPet():Observable<any>{
    return this._actionNoPet.asObservable();
  }



  private _actionChangeProfPic = new Subject<any>();

  newActionChangeProfPic(event:any){
    this._actionChangeProfPic.next(event);
  }

  getActionChangeProfPic():Observable<any>{
    return this._actionChangeProfPic.asObservable();
  }
}
