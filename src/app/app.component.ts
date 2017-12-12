import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

//pages
import { Default } from '../pages/default/default';
import { ShowListPage } from '../pages/show/show-list';
import { ShowPayPage } from '../pages/show/show-pay';

import { MemberLoginPage } from '../pages/account/member-login';
import { WorkListPage } from '../pages/work/work-list';

import { IndexPage } from '../pages/index/index';
import { PurchaseListPage } from '../pages/purchase/purchase-list';

//provider
import { GlobalVars } from '../providers/global';
import { JsonpService } from '../services/jsonp-service';
import { EnvironmentProvider } from '../providers/environment-provider';

import { BookListPage } from '../pages/book/book-list';


import { TicketListPage } from '../pages/ticket/ticket-list';

//mypage
import { MyPageTicketPage } from '../pages/mypage/mypage-ticket';

@Component({
    templateUrl: 'app.html'
    , providers: [JsonpService, EnvironmentProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IndexPage;

  pages: Array<{ title: string, component: any, icon: string }>;


  isAuthority: boolean = false;
  webUrl: string = '';
  items: Array<any>;
  rsvCount: number = 0;
  imgAlias: string = '';
  alias: string = '로그인이 필요합니다';
  mail: string = '';


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen
  
      , private globalVars: GlobalVars
      , private jsonpService: JsonpService
      , private environmentProvider: EnvironmentProvider
      , private events: Events
      )

  {

      this.webUrl = environmentProvider.getWebUrl();
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
        { title: '로그인', component: MemberLoginPage, icon: 'lock' },
        { title: 'BookListPage', component: BookListPage, icon: 'medkit' },
        { title: '예술문화 공연예매', component: Default, icon: 'person'},
        { title: 'TicketListPage', component: TicketListPage, icon: 'person' },
        { title: 'my tickets', component: MyPageTicketPage, icon: 'settings' },
        { title: '구매내역', component: PurchaseListPage, icon: 'medkit' }
        
    ];

  }


  gotoMeProfilePage() {
      this.nav.setRoot(MemberLoginPage);
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });


    this._createEvent();
  }

  _createEvent() {

      this.events.subscribe('event:authority', () => {

          this.isAuthority = this.globalVars.isAuthorityCheck();

          if (this.isAuthority) {
              this.alias = this.globalVars.vars[0].alias;
              this.imgAlias = this.globalVars.vars[0].img;
              this.mail = this.globalVars.vars[0].email;
              //this.getBaseketListData(); 
          }

      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
