import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


//Firebase
import { AngularFireModule } from 'angularfire2';

//provider
import { EnvironmentProvider } from '../providers/environment-provider';
import { GlobalVars } from '../providers/global';


//pipes

//
//pages
import { Default } from '../pages/default/default';
import { IndexPage } from '../pages/index/index';
import { PurchaseListPage } from '../pages/purchase/purchase-list';
//PurchaseListPage
import { DefaultInfPage } from '../pages/default/default-inf';

import { ShowListPage } from '../pages/show/show-list';
import { ShowPayPage } from '../pages/show/show-pay';
import { ShowTicketPage } from '../pages/show/show-ticket';


import { MemberLoginPage } from '../pages/account/member-login';
import { MemberSignPage } from '../pages/account/member-sign';

import { WorkListPage } from '../pages/work/work-list';
import { WorkInfPage } from '../pages/work/work-inf';

//map
import { SearchAddrDaumPage } from '../pages/map/search-addr-daum';
import { SearchAddressPage } from '../pages/map/search-address';
//WorkListPage    WorkInfPage
//ShowTicketPage
//

//import
import { Jsonp, JsonpModule } from '@angular/http';
import { NumericModule } from 'ionic2-numericpicker';

import { Device } from '@ionic-native/device';
import { Geolocation } from '@ionic-native/geolocation'; 
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';


//import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

//NumericModule   //ionic2-numericpicker
import { PipesModule } from '../pipes/pipes.module'

//timeline

import { TimelineComponent } from '../components/timeline/timeline';
import { TimelineTimeComponent } from '../components/timeline/timeline';
import { TimelineItemComponent } from '../components/timeline/timeline';


//Jester Start
//BOOK
import { BookListPage } from '../pages/book/book-list';
import { BookInfPage } from '../pages/book/book-inf';
import { BookTicketPage } from '../pages/book/book-ticket';
import { BookPayPage } from '../pages/book/book-pay';
import { BookFoodPage } from '../pages/book/book-food';
import { BookPayModal } from '../pages/book/book-pay-modal';

//TICKET
import { TicketListPage } from '../pages/ticket/ticket-list';
import { TicketPayPage } from '../pages/ticket/ticket-pay';
import { TicketTicketPage } from '../pages/ticket/ticket-ticket';
//
//mypage
import { MyPageTicketPage } from '../pages/mypage/mypage-ticket';



//SearchListPage
import { SearchListPage } from '../pages/search/search-list';

import { KakaoTalk } from 'ionic-plugin-kakaotalk';

//BookPayPage
export const firebaseConfig = {

    apiKey: "AIzaSyCQQ2tIB06GV3Spez7OkWks4Q-6kWFA_g8",
    authDomain: "oilpay-71f9c.firebaseapp.com",
    databaseURL: "https://oilpay-71f9c.firebaseio.com",
    storageBucket: "oilpay-71f9c.appspot.com",
    messagingSenderId: "839719262704"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
      ListPage,
      Default,
      ShowListPage,
      ShowPayPage,
      ShowTicketPage,
      MemberLoginPage,
      MemberSignPage,
      WorkListPage,
      WorkInfPage,
      DefaultInfPage,
      IndexPage,
      PurchaseListPage,
      TimelineComponent,
      TimelineTimeComponent,
      TimelineItemComponent,
      SearchAddressPage,
      BookListPage,
      BookInfPage,
      BookTicketPage,
      BookPayPage,
      BookFoodPage,
      SearchListPage,
      BookPayModal,
      TicketListPage,
      TicketPayPage,
      TicketTicketPage,
      MyPageTicketPage,
      SearchAddrDaumPage
  ],
  imports: [
      BrowserModule,
      JsonpModule,
      PipesModule,
      IonicModule.forRoot(MyApp),
      NumericModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
      ListPage,
      Default,
      ShowListPage,
      ShowPayPage,
      ShowTicketPage,
      MemberLoginPage,
      MemberSignPage,
      WorkListPage,
      WorkInfPage,
      DefaultInfPage,
      IndexPage,
      PurchaseListPage,
      SearchAddressPage,
      BookListPage,
      BookInfPage,
      BookTicketPage,
      BookPayPage,
      BookFoodPage,
      SearchListPage,
      BookPayModal,
      TicketListPage,
      TicketPayPage,
      TicketTicketPage,
      MyPageTicketPage,
      SearchAddrDaumPage
  ],
  providers: [
    StatusBar,
      SplashScreen, EnvironmentProvider, GlobalVars, Device,
      Geolocation,
      YoutubeVideoPlayer, KakaoTalk,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
