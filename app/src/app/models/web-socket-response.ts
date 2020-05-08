export class WebSocketResponse {
    version: number;
    event: string;
    body: any;
}

export class CallRequestBody {
    peerId: string;
    userUuid: string | null;
    username: string | null;
    caller: boolean;
}
