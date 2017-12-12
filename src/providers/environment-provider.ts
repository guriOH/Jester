import { Injectable } from '@angular/core';
import { ENV } from './environment';

@Injectable()
export class EnvironmentProvider {


    //webControllInfo
    public getWebControllInfo(): string {
        if (ENV.currentEnvironment === "development") {
            return ENV.development.webControllInfo;
        } else if (ENV.currentEnvironment === "production") {
            return ENV.production.webControllInfo;
        }
    }

    public webServicesInfo(): string {
        if (ENV.currentEnvironment === "development") {
            return ENV.development.webServicesInfo;
        } else if (ENV.currentEnvironment === "production") {
            return ENV.production.webServicesInfo;
        }
    }


    public getJsonP(): string {
        if (ENV.currentEnvironment === "development") {
            return ENV.development.jsonP;
        } else if (ENV.currentEnvironment === "production") {
            return ENV.production.jsonP;
        }
    }

    public getDistance(): string {
        if (ENV.currentEnvironment === "development") {
            return ENV.development.distance;
        } else if (ENV.currentEnvironment === "production") {
            return ENV.production.distance;
        }
    }

    public getkeyDaum(): string {
        if (ENV.currentEnvironment === "development") {
            return ENV.development.keyDaum;
        } else if (ENV.currentEnvironment === "production") {
            return ENV.production.keyDaum;
        }
    }

    public getWebUrl(): string {
        if (ENV.currentEnvironment === "development") {
            return ENV.development.webUrl;
        } else if (ENV.currentEnvironment === "production") {
            return ENV.production.webUrl;
        }
    }

    public getWebServiceUrl(): string {
        if (ENV.currentEnvironment === "development") {
            return ENV.development.webServiceUrl;
        } else if (ENV.currentEnvironment === "production") {
            return ENV.production.webServiceUrl;
        }
    }

    //keyDaum

    public getKey1(): string {
        if (ENV.currentEnvironment === "development") {
            return ENV.development.key1;
        } else if (ENV.currentEnvironment === "production") {
            return ENV.production.key1;
        }
    }

    public getKey2(): string {
        if (ENV.currentEnvironment === "development") {
            return ENV.development.key2;
        } else if (ENV.currentEnvironment === "production") {
            return ENV.production.key2;
        }
    }
    public getMessageCount(): string {
        if (ENV.currentEnvironment === "development") {
            return ENV.development.MessageCount;
        } else if (ENV.currentEnvironment === "production") {
            return ENV.production.MessageCount;
        }
    }

    //MessageCount

}

