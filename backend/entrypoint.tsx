import { type Entrypoint } from "uix/providers/entrypoints.ts";
import { Lobbies } from "backend/lobbyManagement/Lobbies.tsx"

export default {
	    "/lobbies": () => <Lobbies />, //TODO REMOVE

} satisfies Entrypoint;
