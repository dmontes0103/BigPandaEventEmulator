import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpHeaderResponse, HttpErrorResponse } from "@angular/common/http/src/response";
import { IKeyPair } from "./keyPair";
import { headersToString } from "selenium-webdriver/http";


@Injectable()
export class ActiveMQService {
    //admin/index.jsp
    private _postAlertURL = "http://10.64.66.154:8611/api/message/Event_Management_Testing";
    //private _postAlertURL = "https://api.bigpanda.io/data/v2/alerts"; 

    constructor(private _http: HttpClient) {       

    }

    postEvent(_data: string):Observable<string>{
        //let body = JSON.parse(_data);
        let headers = new HttpHeaders({'Authorization':'Basic '+ btoa('Event_Manage_0_so' + ':' +'gTmS23a632l29Fb'), 'Content-Type':'application/json','Accept':'application/json'});
        let params = new HttpParams().set('type','queue');
        //params = params.append('type','queue');
        //headers = headers.append('Authorization','Basic '+ btoa('Event_Manage_0_so:gTmS23a632l29Fb'));
        //headers = headers.append("Access-Control-Allow-Credentials", "true"); 
        //headers = headers.append("Content-Type","application/json");
        //headers =  headers.append("Accept","application/json");
        
        return this._http.post(this._postAlertURL,_data,{headers: headers, params:params}).catch(this.handleError);
    };
    private handleError(err: HttpErrorResponse) {
        console.log(err.statusText);
        return Observable.throw(err.statusText);
    }
}