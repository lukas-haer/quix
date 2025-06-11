import { Endpoint } from "datex-core-legacy/datex_all.ts";

export type Lobby = {
	id: string;
	code: string;
	host: {
		endpointId: Endpoint;
	}, 
	createdAt: string;
};