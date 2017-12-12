import { Injectable } from '@angular/core';
// if you've gone with the local installation approach, you'd use the following:
import * as firebase from 'firebase';

@Injectable()
export class FirebaseDataService {
    public db: any;
    public events: any;
    public units: any;
    public tasks: any;
    public parts: any;
    constructor() {

        var config = {
            apiKey: "AIzaSyCQQ2tIB06GV3Spez7OkWks4Q-6kWFA_g8",
            authDomain: "oilpay-71f9c.firebaseapp.com",
            databaseURL: "https://oilpay-71f9c.firebaseio.com",
            storageBucket: "oilpay-71f9c.appspot.com",
            messagingSenderId: "839719262704"
        };

        firebase.initializeApp(config);
        this.db = firebase.database().ref('/');

        this.events = firebase.database().ref('/events/');
        this.units = firebase.database().ref('/units/');
        this.tasks = firebase.database().ref('/tasks/');
        this.parts = firebase.database().ref('/tasks/parts/');
    }

    init() {


        var config = {
            apiKey: "AIzaSyCQQ2tIB06GV3Spez7OkWks4Q-6kWFA_g8",
            authDomain: "oilpay-71f9c.firebaseapp.com",
            databaseURL: "https://oilpay-71f9c.firebaseio.com",
            storageBucket: "oilpay-71f9c.appspot.com",
            messagingSenderId: "839719262704"
        };

        firebase.initializeApp(config);

        /*
        const fbConf = {
            apiKey: "...",
            authDomain: "...",
            databaseURL: "https://....firebaseio.com",
            storageBucket: "..."
        };

        firebase.initializeApp(fbConf);
        */
        this.db = firebase.database().ref('/');
    }
}