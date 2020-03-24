export class WebSocketConnectionItem {
    version: number;
    event: string;
    auth: Auth;
    body: any;
}

export interface Auth {
    uuid: string;
    token: string;
}
