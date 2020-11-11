import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-async-test',
  template: `<div><code>observable|async</code>:
  Time: {{ time | async  }}</div><zippy (open)="onOpen($event)" (close)="onClose($event)">Zippy Zippy Zippy</zippy>`
})
export class AsyncTestComponent implements OnInit {
  private i  =0;
  time = new Observable<string>(observer => {  //this is the return value => pass it on to the following code
    
    setInterval((a =this.i++) =>{  observer.next('parameter: ' + a+ ' New: ' + new Date().toString());
                                /*console.log('Printing ' + a );*/}, 1000)}); //up to here it is toPromise() (sync)
                // if used,then it is async by natuture and these handles will execute when there is observer response              
                 // .subscribe ((ts) => console.log('Process completed successfuly ' + this.i ), //declare function (param...) {function code.param..}
                 //             (err) => console.log('Process has an Error'),    //declare error handler (param...) {function code.param..}
                 //             () => console.log('All completed Completed'))   //must declare empty function (void) {function code...}
  
  
  constructor() { }
  onOpen(e) {
    console.log('Received open: ' + e);
  }
  onClose(e){
    console.log('Recieved close: ' + e);
    
  }
  ngOnInit(): void {
  }

}
