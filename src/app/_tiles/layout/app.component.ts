import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';
import { User } from 'src/app/users/_models/user.model';
import { UserService } from 'src/app/users/_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
      title = 'Academy';
      user : User;
      showLoadingIndicator = true;
            constructor(private _router: Router, 
                  private userService: UserService){

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
