import { Injectable } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2'
@Injectable()
export class FirebaseMessageService {

    firelist: FirebaseListObservable<any>;
    fireMessagelist: FirebaseListObservable<any>;
    limitCount: number = 5;
    limitMessageCount: number = 5;

    fireDatalist = [];
    fireSendlist = [];

    constructor(public af: AngularFire) { }

    createChat(messageKey) {
        // var session = JSON.parse(window.localStorage['session'] || '{}');

        var url = '/chats/' + messageKey;
        console.log(url);
        this.af.database.list(url).remove();
        this.firelist = this.af.database.list(url, {
            query: {
                limitToLast: this.limitCount
                }
        });

        //firelist.subscribe(data => this.fireDatalist = data);

        return this.firelist;
    }

    sendChat(messageKey) {
        // var session = JSON.parse(window.localStorage['session'] || '{}');

        var url = '/chats/' + messageKey;
        console.log(url);
        this.firelist = this.af.database.list(url, {
            query: {
                limitToLast: this.limitCount
            }
        });


        //firelist.subscribe(data => this.fireSendlist = data);
        return this.firelist;
    }

    createMessageChat() {
        // var session = JSON.parse(window.localStorage['session'] || '{}');

        var url = '/messages';
        console.log(url);

        this.fireMessagelist = this.af.database.list(url, {
            query: {
                limitToLast: this.limitMessageCount
            }
        });

        return this.fireMessagelist;
    }


    /*
    retrieveChats() {

        //console.log('user start');
        //var currentUser = firebase.auth().currentUser;
        //console.log(currentUser);

        var ref = firebase.database().ref('chats');
   
        return new Observable(observer => {
            var query = ref.orderByChild("timestamp");
            query.on('value', (snapshot) => {
                var arr = [];

                snapshot.forEach(function (childSnapshot): any {
                    var data = childSnapshot.val();
                    data['id'] = childSnapshot.key;
                    arr.push(data);
                });
                observer.next(arr);
                console.log('OK', arr);
            },
                (error) => {
                    console.log('ERROR', error);
                    observer.error(error);
                });
        });

    }

    retrieveMessages(id: any) {

        id = '01063185544';
        var ref = firebase.database().ref('messages/' + id);

        return new Observable(observer => {
            var query = ref.orderByChild("timestamp");
            query.on('value',
                (snapshot) => {
                    var arr = [];

                    snapshot.forEach(function (childSnapshot): any {
                        var data = childSnapshot.val();
                        data['id'] = childSnapshot.key;
                        arr.push(data);
                    });
                    observer.next(arr);
                },
                (error) => {
                    console.log('Error:', error);
                    observer.error(error);
                });
        });
    }

    sendMessage(chatId, messageData) {
        var session = JSON.parse(window.localStorage['session'] || '{}');

        var newMessageKey = firebase.database().ref().child('messages').push().key;
        var updates = {};
        updates['/messages/' + chatId + '/' + newMessageKey] = messageData;

        return firebase.database().ref().update(updates);
    }
    */
}
