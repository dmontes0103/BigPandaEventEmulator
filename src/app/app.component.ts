import { Component, OnInit } from '@angular/core';
import { ActiveMQService } from './ActiveMQ.service';
import { IKeyPair } from './keyPair';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ActiveMQService]
})

export class AppComponent implements OnInit {
  title = 'Big Panda Event Simulator';

  private suscription
  //Event Data
  inputHostname: string;
  inputCheck: string;
  inputDescription: string;
  inputEventCat: string;
  inputSeverity: string = 'Warning';
  _Value: string;
  _Key: string;
  fieldArray: IKeyPair[] = [];

    ////////////////////////////////
    errorMessage: string;

  addKeyPairValue() {
    var aux: IKeyPair = {
      key: this._Key,
      value: this._Value
    };
    // console.log(this._Key);
    // console.log(this._Value);
    this.fieldArray.push(aux);
    this._Key = '';
    this._Value = '';
  }

  removeLastRow() {
    this.fieldArray.pop();
  }

  ngOnInit() {
    console.log("App Started");
    //this.sendBPEvent();
  }
  setSev(_value: string) {
    this.inputSeverity = _value;
    console.log(this.inputSeverity);
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

  sendBPEvent() {
    var result = this.buildArray();
    console.log("Results: "+ result.toString()); 

    let body = `{` + result + `
      "status":"` + this.inputSeverity + `",
      "host":"` + this.inputHostname + `",
      "cmdb_name":"` + this.inputHostname + `",
      "check":"` + this.inputCheck + `",
      "event_category":"`+ this.inputEventCat + `",
      "description":"`+ this.inputDescription + `" }`;
      
    console.log("Body:",body);

    this._activemqService.postEvent(body)
          .subscribe(error => this.errorMessage = <any>error,
          () => this.resetFields());
  }
}


