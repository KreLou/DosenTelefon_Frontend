export class WebSocketResponse {
    version: number;
    event: string;
    body: any;
}

export class CallRequestBody {
    openrainbowDetails: any;
    username: string | null;
}
