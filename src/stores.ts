class Store<T> {
	value: T;
	listeners: Record<number, (value: T) => void> = {}
	set(value: T) {
		this.value = value
		Object.values(this.listeners).forEach(l => l(value));
	}
	get(): T {
		return this.value;
	}
	private _lisid = 0
	onUpdate(listener: (value: T) => void) {
		const listenerId = this._lisid++;
		this.listeners[listenerId] = listener;
		return listenerId;
	}
	offUpdate(id: number) {
		delete this.listeners[id]
	}
	constructor(value:T) {
		this.value = value;
	}
}
export default function store<T>(value: T) {
	return new Store<T>(value)
}

export const redirUrl = store<string | undefined>(undefined);
