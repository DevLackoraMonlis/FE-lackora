export type WsModules =
	| "normalized-event"
	| "not-normalized-event"
	| "alert-investigation"
	| "system-logs"
	| "asset"
	| "eventsources"
	| "healthMonitoring"
	| "audit"
	| "ucm";

type WSListener = {
	cb: (data: unknown) => void;
	name: WsModules;
};

class WsClient {
	private static instance: WsClient;
	public webSocket?: WebSocket;
	private listener: WSListener | undefined = undefined;
	private listeners: WSListener[] = [];
	private onOpen = () => {};
	private onClose = () => {};
	private onError = () => {};

	private constructor(
		wsUrl: string,
		token: string,
		onOpen: VoidFunction,
		onCloseOrError: VoidFunction,
	) {
		this.onOpen = onOpen;
		this.onError = onCloseOrError;
		this.onClose = onCloseOrError;
		this.createNewWebSocket(wsUrl, token);
	}

	private createNewWebSocket(wsUrl: string, token: string) {
		this.webSocket = new WebSocket(
			`${wsUrl}/api/v1/data/event-investigation?token=${token}`,
		);

		this.webSocket.addEventListener("error", (err) => {
			console.error(err);
			this.onError();
			// void signOut({ redirect: true, callbackUrl: AppRoutes.login });
		});

		this.webSocket.addEventListener("open", () => {
			this.onOpen();
		});

		this.webSocket.addEventListener("close", () => {
			console.info("WebSocket is closed");
			this.onClose();
		});
	}

	public static getInstance(
		wsUrl: string,
		token: string,
		onOpen: VoidFunction,
		onCloseOrError: VoidFunction,
	): WsClient {
		if (!WsClient.instance) {
			WsClient.instance = new WsClient(wsUrl, token, onOpen, onCloseOrError);
		} else {
			WsClient.instance.onClose = onCloseOrError;
			WsClient.instance.onOpen = onOpen;
		}

		return WsClient.instance;
	}

	public addEventListener(newListener: WSListener) {
		const findInLastListeners = this.listeners.find(
			(item) => item.name === newListener.name,
		);

		if (!findInLastListeners) {
			this.listeners.push(newListener);
			this.listener = newListener;
			this.webSocket?.addEventListener("message", newListener.cb, true);
		}
	}
}

export { WsClient };
