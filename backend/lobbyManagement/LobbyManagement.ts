import { Endpoint } from "datex-core-legacy/datex_all.ts";
import { lobbies } from "backend/lobbyManagement/lobbies.eternal.ts";
import { type Lobby } from "common/models/lobby/Lobby.ts"

export async function registerLobby() {		
	try {
		const callerID = datex.meta.caller		
		if (!callerID) {
			throw new Error("No caller ID found. Cannot register lobby.");
		}

		// Generate a random 6-digit lobby code
		const lobbyCode = Math.floor(100000 + Math.random() * 900000).toString();

		//Checks if gamecode consists of exactly 6 numbers. This is currently pointless, but a safety feature, we may sometime appriciate
		const gameCodeRegex = /^\d{6}$/; 
        if (!gameCodeRegex.test(lobbyCode.toString())) {
			throw new Error("Gamecode is not a 6 digit number")
        }

		var newLobbyId: string = "";
		var checkId = true;
		while (checkId) {
			newLobbyId = crypto.randomUUID();
			for (var i = 0; i <= lobbies.length; i++) {
				if (i == lobbies.length) {
					checkId = false;
				}else{
					if (newLobbyId == lobbies[i].id) {
						break;
					}
				}
			}
		}
		
		const newLobby: Lobby = {
			id: newLobbyId,
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
		throw new Error("Failed to register lobby. Please try again.");
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
