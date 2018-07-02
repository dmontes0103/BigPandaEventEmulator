import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpErrorResponse } from "@angular/common/http/src/response";
import { StompService } from "@stomp/ng2-stompjs";


@Injectable()
export class ActiveMQService {

    constructor(private _http: HttpClient, private _stomp: StompService) {}

    // postEvent(_data: string):Observable<string>{
    //     let body = JSON.parse(_data);
    //     console.log(btoa('em_integration' + ':'+ 'Monitor2020'));
    //     let headers = new HttpHeaders();
    //     headers.set('Authorization','Basic '+ btoa('em_integration' + ':'+ 'Monitor2020'));
    //     this._http.options.arguments.headers.common['Authorization'] = 'Basic ' + btoa('em_integration' + ':'+ 'Monitor2020');  
    //     return this._http.post(this._postAlertURL,_data,{headers}).catch(this.handleError);
    // };

    queueEvent(_queue :string , _data: string){ //Should received the queue name i.e Event_Management_xxxxxx
        //console.log(this._stomp.connected());
        //console.log("Data Received: ", _data); 
        var payload = JSON.stringify(_data);
        console.log("Payload",_data);
        this._stomp.publish(_queue,_data,{'Authorization:':'Basic '+ btoa('em_integration' + ':'+ 'Monitor2020')});

    }
    private handleError(err: HttpErrorResponse) {
        console.log(err.statusText);
        return Observable.throw(err.statusText);
    }
}