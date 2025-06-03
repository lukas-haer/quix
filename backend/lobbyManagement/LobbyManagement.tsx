import { Endpoint } from "datex-core-legacy/datex_all.ts";
import { lobbys } from "./lobbys.eternal.ts";
import { type Lobby } from "common/models/lobby/Lobby.ts"


export function registerLobby() {		
	try {
		const callerID = datex.meta.caller		
		if (!callerID) {
			throw new Error("No caller ID found. Cannot register lobby.");
		}	

		// Generate a random 6-digit lobby code
		const lobbyCode = Math.floor(100000 + Math.random() * 900000).toString();
		
		const newLobby: Lobby = {
			id: crypto.randomUUID(),
			code: lobbyCode,
			host: {
				endpointId: datex.meta.caller,
			},
			createdAt: new Date().toISOString()
		};

		lobbys.push(newLobby);
		console.log("Lobby registered:", newLobby);
		return newLobby;
	} catch (error) {
		console.error("Error registering lobby:", error);
		throw new Error("Failed to register lobby. Please try again.");
	}
}

export function getHostIdFromGamecode (gamecode: string): Endpoint {
	const lobby = lobbys.find(lobby => lobby.code === gamecode);
	if (lobby) {	
		return lobby.host.endpointId;
	} else {
		throw new Error(`Lobby with gamecode ${gamecode} not found.`);
	}
}

//TODO remove this function, it is only for testing purposes
export function getLobbys() {
	return lobbys;
}

