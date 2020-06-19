import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../providers/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../ui/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class IsNotAuthGuard implements CanActivate {
  constructor(
    private serviceAuth: AuthService,
    private dialog: MatDialog,
    private location: Location
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this.serviceAuth.isAuthenticated()) {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '500px',
          data: { message: 'Debe iniciar sesión para acceder a esta página.' },
        });
  
        dialogRef.afterClosed().subscribe((response) => {
          if (!response) {
            this.location.back();
            return false;
          }
        });
      }

    return true;
  }
  
}
