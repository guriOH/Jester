export class ENV {

    public static currentEnvironment: string = "production";
    // public static currentEnvironment: string = "production";

    //development : 서버가 개발자에게 있을 때 지금은 서버가 웹서버에 붙어서 production 바꿔줘야 함
    public static development: any = {
        webControllInfo: "http://wwww.lemonCrown.com/aaa/",
        webServicesInfo: "http://192.168.172.191/WebServices/",
        key1: "value1",
        key2: "value2",
        jsonP: "http://localhost:6533/",
        distance: "3000000000",
        keyDaum: "19a40b3b4b31307415704b0fcdfadaed",
        webUrl: "http://192.168.172.96:6301",
        webServiceUrl: "http://www.sosoksa.com/WebServices",
        MessageCount: 10
    };
    public static production: any = {
        webControllInfo: "value1",
        webServicesInfo: "http://www.sosoksa.com/WebServices/WebService1.asmx",
        key1: "value1",
        key2: "value2",
        jsonP: "http://www.sosoksa.com/MVC/",
        distance: "3000000000",  //1000 >> 1km
        keyDaum: "19a40b3b4b31307415704b0fcdfadaed",
        webUrl: "http://www.sosoksa.com/",
        webServiceUrl: "http://www.sosoksa.com/WebServices",
        MessageCount: 10
    };

}