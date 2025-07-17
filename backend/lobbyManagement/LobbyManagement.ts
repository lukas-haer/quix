import { Endpoint } from "datex-core-legacy/datex_all.ts";
import { lobbies } from "backend/lobbyManagement/lobbies.eternal.ts";
import { type Lobby } from "common/models/lobby/Lobby.ts"

export async function registerLobby() {		
	try {
		const callerID = datex.meta.caller		
		if (!callerID) {
			throw new Error("No caller ID found. Cannot register lobby.");
		}

		// remove existing lobby if the host requests a new one
		// since it should not be possible to have multiple lobbies with the same host
		// removing only one lobby should be sufficient
		const existingLobbyIndex = lobbies.findIndex(lobby => lobby.host.endpointId === callerID);
		if (existingLobbyIndex !== -1) {
			lobbies.splice(existingLobbyIndex, 1);
		}
		
	   const gameCodeRegex = /^\d{6}$/;
	   let lobbyCode: string | undefined = undefined;
	   // Try to generate a valid, unique 6-digit code, up to 20 attempts
	   const maxTries = 20;
	   let tries = 0;
	   while (tries < maxTries) {
		   const candidate = Math.floor(100000 + Math.random() * 900000).toString();
		   if (!gameCodeRegex.test(candidate)) {
			   throw new Error("Generated game code is not a 6 digit number.");
		   }
		   if (lobbies.some(lobby => lobby.code === candidate)) {
			   tries++;
			   continue;
		   }
		   lobbyCode = candidate;
		   break;
	   }
	   if (!lobbyCode) {
		   throw new Error(`Failed to generate a unique lobby code after ${maxTries} attempts.`);
	   }
	   
	   if (!lobbyCode) {
		   throw new Error("Failed to generate a valid lobby code.");
	   }

		
		const newLobby: Lobby = {
			id: crypto.randomUUID(),
			code: lobbyCode,
			host: {
				endpointId: datex.meta.caller,
			},
			createdAt: new Date().toISOString()
		};

		lobbies.push(newLobby);

		removeLobbiesOlderThan24h()
		return newLobby;
	} catch (error) {
		console.error("Error registering lobby:", error);
		throw new Error(String(error));
	}
}

function removeLobbiesOlderThan24h() {
	const now = Date.now();
	for (let i = lobbies.length - 1; i >= 0; i--) {
		const createdAt = new Date(lobbies[i].createdAt).getTime();
		if (now - createdAt > 24 * 60 * 60 * 1000) {
			console.log("Removed Lobby older than 24h with gamecode "+lobbies[i].code);
			lobbies.splice(i, 1);
			
		}
	}

}

export async function getHostIdFromGamecode (gamecode: string): Promise<Endpoint> {
	//TODO: Investigate why === does not work
	const lobby = lobbies.find(lobby => lobby.code == gamecode);	
	if (lobby) {	
		return lobby.host.endpointId;
	} else {
		throw new Error(`Lobby with gamecode ${gamecode} not found.`);
	}	
}
