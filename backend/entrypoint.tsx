import { type Entrypoint } from "uix/providers/entrypoints.ts";
import { Lobbies } from "backend/lobbyManagement/Lobbies.tsx"
import { accountPage } from "backend/UserAccounts/AccountPage.tsx";

export default {
	    "/lobbies": () => <Lobbies />, //TODO REMOVE
		"/account": accountPage

} satisfies Entrypoint;
