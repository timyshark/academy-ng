import { Output, Component, EventEmitter } from '@angular/core';

@Component({
    selector: 'zippy',
    template: `
    <div class="zippy">
      <div (click)="toggle()">Toggle</div>
      <div [hidden]="!visible">
      Bla Bla Bla
        <ng-content></ng-content>
      </div>
    </div>`})
  
  export class ZippyComponent {
    visible = true;
    @Output() open = new EventEmitter<any>();  //open is output param, type EventEmitter and initialized to new instance
    @Output() close = new EventEmitter<any>(); // close is also the same
  
    toggle() {
      this.visible = !this.visible;
      if (this.visible) {
        this.open.emit("Open Emits this Event"); //declare no handler to the event , just emit
      } else {
        this.close.emit("close Emits this event");
      }
    }
  }