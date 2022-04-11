import * as models from './models';

export interface go {
}

declare global {
	interface Window {
		go: go;
	}
}
