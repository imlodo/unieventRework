import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { VisitedPagesService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class VisitedPagesGuard implements CanActivate {

  constructor(private visitedPagesService: VisitedPagesService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const mappedPage = 
      state.url.includes("content") ? "Contenuto" :
      state.url.includes("@") ? "Profilo Utente"
      : state.url.split('/')[1];
    const title = route.data['title'] ? route.data['title'] : mappedPage;
    this.visitedPagesService.addVisitedPage(state.url, title);
    return true;
  }
}
