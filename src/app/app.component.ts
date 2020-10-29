import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';
import { User } from './models/user.model';
import { AuthenticationService } from './students/services/authentication.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
      title = 'Academy';
      currentUser : User;
      showLoadingIndicator = true;
      constructor(private _router: Router, 
                  private authenticationService: AuthenticationService){
                        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
                        
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
              this.authenticationService.logout();
              this._router.navigate(['/login']);
          }
  

  
}
