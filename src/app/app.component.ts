import { Component, OnInit } from '@angular/core';
import { ActiveMQService } from './ActiveMQ.service';
import { IKeyPair } from './keyPair';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ActiveMQService ]
})

export class AppComponent implements OnInit {
  title = 'BigPanda Event Emulator';

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
  activeQueue: number = 5;
  activeSev: number = 2;

    ////////////////////////////////
  errorMessage: string; 

  addRow() {
    if(this._Key && this._Value){
      var aux: IKeyPair = {
        key: this._Key.trim(),
        value: this._Value.trim()
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
  }
  setSev(_value: string, _sev: number) {
    this.inputSeverity = _value;
    this.activeSev = _sev;
  }

  setQueue(_value:string, _active: number){
    this.inputQueue = _value;
    this.activeQueue = _active;
  }

  constructor(private _activemqService: ActiveMQService) {  
  }

  resetFields(){
    this.inputHostname = '';
    this.inputCheck= '';
    this.inputDescription= '';
    this.inputEventCat= '';
    this.inputSeverity='Critical';
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
    str = str.replace(/'/g, "'");
    str = str.replace(/\\/g, "\\\\");
    return str.replace(/\\([\s\S])|(")/g,"\\$1$2");
  }
  sendBPEvent() {
    var result = this.buildArray();
    //console.log("Results: "+ result.toString()); 
    var body = '{' + result + '"status":"' + this.inputSeverity +'","host":"'+ this.inputHostname.trim() + '","cmdb_name":"' 
    + this.inputHostname.trim() + '","check":"'+ this.inputCheck.trim() + '","event_category":"'+ this.inputEventCat.trim() + '","description":"'
    + this.escapeDoubleQuotes(this.inputDescription).trim()+ '","sender":"BP Event Emulator"}';

      //console.log("Body: ",body);
      this.loading = true;
      this._activemqService.queueEvent(this.inputQueue,body);
      setTimeout( () => { this.loading = false; 
        //this.resetFields(); 
        console.log("Event Queued"); this.dismissSuccess()}, 3000 );
  }
}


