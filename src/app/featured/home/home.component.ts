import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LocaleService } from '@app/core/services/locale.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  locale$: Subscription;
  router$: Subscription;
  locale: string;
  currentUrl = null;
  cols : number;
  yearArray: number[] = [];
  spaceXItems: any[] = [];

  gridByBreakpoint = {
    xl: 5,
    lg: 5,
    md: 3,
    sm: 2,
    xs: 1
  }
  constructor(private router: Router, private localeService: LocaleService, private breakpointObserver: BreakpointObserver) { 
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }
    });
    let tempArray: number[] = [];
    for(let i=2006;i<=2020;i++){
      tempArray.push(i);
    }
    this.yearArray = [].concat(tempArray);
    this.router$ = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
     .subscribe((event: NavigationEnd) => {
       this.currentUrl = this.router.url;
    });
  }

  ngOnInit() {  
    this.localeService.setLocale();
    this.locale$ = this.localeService.getLocale().subscribe(locale => {
      this.locale = locale;
    });    
    this.getItems().subscribe(items => {
      this.spaceXItems.push(items);
    });
    if(this.spaceXItems.length>0){      
      this.spaceXItems = this.spaceXItems[0];
    }
    console.log(this.spaceXItems[0]);
  }

  getItems(){
    let tempArray: any[] = [];
    return this.localeService.getFoods();   
  }

  ngOnDestroy(){
    this.router$.unsubscribe();
    this.locale$.unsubscribe();
  }

  resolveHref(){
    if(this.locale === "en"){
      return `${"/bn"}${this.currentUrl}`;
    } else if(this.locale === "bn"){
      return `${"/en"}${this.currentUrl}`;
    } else{
      return `${"/en"}${this.currentUrl}`;
    }
  }
}
