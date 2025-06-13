import { type Entrypoint } from "uix/providers/entrypoints.ts";
import { Lobbys } from "backend/lobbyManagement/Lobbys.tsx"

export default {
	    "/lobbys": () => <Lobbys /> //TODO REMOVE
} satisfies Entrypoint;
