import { Component, OnInit } from '@angular/core';
import { ActiveMQService } from './ActiveMQ.service';
import { IKeyPair } from './keyPair';
import { StompService } from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ActiveMQService ]
})

export class AppComponent implements OnInit {
  title = 'BigPanda Event Simulator';

  loading: boolean = false;
  success: boolean = false;
  inputQueue : string = "Event_Management_Testing";
  inputHostname: string = "";
  inputCheck: string= "";
  inputDescription: string= "";
  inputEventCat: string = "";
  inputSeverity: string = 'Warning';
  _Value: string;
  _Key: string;
  fieldArray: IKeyPair[] = [];

    ////////////////////////////////
  errorMessage: string;

  addRow() {
    if(this._Key && this._Value){
      var aux: IKeyPair = {
        key: this._Key,
        value: this._Value
      };
      this.fieldArray.push(aux);
      this._Key = '';
      this._Value = '';
    }else{
      console.log("Can't add empty values");
    }   
  }

  removeLastRow() {
    if(this.fieldArray.length>0){
      this.fieldArray.pop();
    }else{
      console.log("Nothing to delete");
    }    
  }

  ngOnInit() {
    console.log("App Started");
    //this._activemqService.queueEvent();
    //this.sendBPEvent();
  }
  setSev(_value: string) {
    this.inputSeverity = _value;
    console.log(this.inputSeverity);
  }

  setQueue(_value:string){
    this.inputQueue = _value;
    //console.log(this.inputQueue);
  }

  constructor(private _activemqService: ActiveMQService) {  
  }

  resetFields(){
    this.inputHostname = '';
    this.inputCheck= '';
    this.inputDescription= '';
    this.inputEventCat= '';
    this.inputSeverity='Warning';
    this.fieldArray = [];
  }
  
  buildArray(){
    var result='';
    var arrayLength = this.fieldArray.length;
    if(arrayLength > 0){
      for( var i = 0; i < arrayLength; i++){  
        result += '"'+this.fieldArray[i].key + '":' + '"'+ this.fieldArray[i].value + '",'
      }    
    }
    return result;       
  }

  dismissSuccess(){
    this.success = true;
    setTimeout( () => { this.success = false;}, 5000 );
  }

  escapeDoubleQuotes(str) {
    return str.replace(/\\([\s\S])|(")/g,"\\$1$2");
  
  }
  sendBPEvent() {
    var result = this.buildArray();
    //console.log("Results: "+ result.toString()); 
    var body = '{' + result + '"status":"' + this.inputSeverity +'","host":"'+ this.inputHostname + '","cmdb_name":"' 
    + this.inputHostname + '","check":"'+ this.inputCheck + '","event_category":"'+ this.inputEventCat + '","description":"'
    + this.escapeDoubleQuotes(this.inputDescription) + '","sender":"BP Event Emulator"}';

      console.log("Body: ",body);
      this.loading = true;
      this._activemqService.queueEvent(this.inputQueue,body);
      setTimeout( () => { this.loading = false; this.resetFields(); console.log("Event Queued"); this.dismissSuccess()}, 3000 );
  }
}


