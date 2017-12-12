import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';


import { JsonpService } from '../../services/jsonp-service';
import { GlobalVars } from '../../providers/global';

import { EnvironmentProvider } from '../../providers/environment-provider';

import { Default } from '../default/default';
import { PurchaseListPage } from '../purchase/purchase-list';
import { WorkListPage } from '../work/work-list';
import { MemberLoginPage } from '../account/member-login';

import swal from 'sweetalert2'; 

import { TicketListPage } from '../ticket/ticket-list';
import { KakaoTalk } from 'ionic-plugin-kakaotalk';

@Component({
    selector: 'page-index',
  templateUrl: 'index.html',
  providers: [JsonpService]
})
export class IndexPage {


    slides = [
        {
            title: "예술문화 공연티켓 예매",
            description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
            image: "assets/img/ica-slidebox-img-4.png",
            key : "1"
        },
        {
            title: "졸업작품 경매",
            description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
            image: "assets/img/ica-slidebox-img-3.png",
            key: "2"
        },
        {
            title: "연습실 대관",
            description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
            image: "assets/img/ica-slidebox-img-2.png",
            key: "3"
        }
    ];


    items: Array<any>;

    webServiceUrl: string;



    constructor(public navCtrl: NavController,
        public modalCtrl: ModalController,
        private kakao: KakaoTalk
        
        

        ) {


        this.kakao.sendDefault({
            objectType: 'feed',
            content: {
                title: '딸기 치즈 케익',
                description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
                imageUrl: 'http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
                link: {
                    mobileWebUrl: 'https://developers.kakao.com',
                    webUrl: 'https://developers.kakao.com'
                }
            },
            social: {
                likeCount: 286,
                commentCount: 45,
                sharedCount: 845
            },
            buttons: [
                {
                    title: '웹으로 보기',
                    link: {
                        mobileWebUrl: 'https://developers.kakao.com',
                        webUrl: 'https://developers.kakao.com'
                    }
                },
                {
                    title: '앱으로 보기',
                    link: {
                        mobileWebUrl: 'https://developers.kakao.com',
                        webUrl: 'https://developers.kakao.com'
                    }
                }
            ]
        });


    }
    goUrl() {

        this.kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: '딸기 치즈 케익',
                description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
                imageUrl: 'http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
                link: {
                    mobileWebUrl: 'https://developers.kakao.com',
                    webUrl: 'https://developers.kakao.com'
                }
            },
            social: {
                likeCount: 286,
                commentCount: 45,
                sharedCount: 845
            },
            buttons: [
                {
                    title: '웹으로 보기',
                    link: {
                        mobileWebUrl: 'https://developers.kakao.com',
                        webUrl: 'https://developers.kakao.com'
                    }
                },
                {
                    title: '앱으로 보기',
                    link: {
                        mobileWebUrl: 'https://developers.kakao.com',
                        webUrl: 'https://developers.kakao.com'
                    }
                }
            ]
        });
    }



    rediret(slide) {
        if (slide == "1") {
            this.navCtrl.setRoot(Default);
        } else if (slide == "2") {
            this.navCtrl.setRoot(WorkListPage);
        } else if (slide == "3") {
            swal(
                'comming soon',
                'sosoksa.com',
                'warning'
            )


            //this.navCtrl.setRoot(PurchaseListPage);
        } else {
            this.navCtrl.setRoot(PurchaseListPage);
        }
   

    }







}
