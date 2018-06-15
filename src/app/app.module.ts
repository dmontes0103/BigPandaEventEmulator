import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StompConfig, StompService, StompRService} from '@stomp/ng2-stompjs';
import { RouterModule} from '@angular/router';
import { RouterConfigLoader } from '@angular/router/src/router_config_loader';


const stompConfig: StompConfig = {
  // Which server?
  url: 'ws://reds-admin.iglb.intel.com:8511',
  //ws://10.64.66.150:8511,ws://10.64.66.154:8511,ws://10.64.140.24:8511 
  //reds-admin.iglb.intel.com 
  // Headers
  // Typical keys: login, passcode, host
  headers: {
    // em_integration -> Monitor2020
    login : 'em_integration', 
    passcode : 'Monitor2020'
    //wait: 'True'
  },
  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 10000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnect_delay: 5000,

  // Will log diagnostics on console
  debug: false
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'bigpandaeventsim', component: AppComponent},
      {path: '', redirectTo: 'bigpandaeventsim', pathMatch: 'full'},
      {path: '**', redirectTo: 'bigpandaeventsim', pathMatch: 'full'}] , { useHash: true })
  ],
  providers: [StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
