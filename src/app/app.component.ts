import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from './user/_models/user.model';
import { UserService } from './user/_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
      title = 'Academy';
      user : User;
      showLoadingIndicator = true;
      colorTheme = 'theme-dark-blue';
      bsConfig: Partial<BsDatepickerConfig>;
      constructor(private _router: Router, 
                  private userService: UserService){

                    this.bsConfig = Object.assign({}, 
                      { containerClass: this.colorTheme, 
                        showWeekNumbers: true,
                        minDate: new Date(1950,1,1),
                        maxDate: new Date(2020,3,21),
                        dateInputFormat: 'YYYY-MM-DD'
                      });
                        this.userService.user.subscribe(x => this.user = x);
                        
                        this._router.events.subscribe(
                        (routerEvent: Event) =>{
                          if (routerEvent instanceof NavigationStart) {
                            this.showLoadingIndicator=true;
                          }
                          if (routerEvent instanceof NavigationEnd ||
                            routerEvent instanceof NavigationCancel ||
                            routerEvent instanceof NavigationError) {
                            this.showLoadingIndicator=false;
                          }
                        }
                        )
                  }
      logout() {
              this.userService.logout();
              this._router.navigate(['/users/login']);
          }
  

  
}
