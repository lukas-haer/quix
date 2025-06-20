import { Component, template } from "uix/components/Component.ts";
//import { lobbies } from "./lobbies.eternal.ts";
import { type Lobby } from "common/models/lobby/Lobby.ts";

const lobbies = [] as Lobby[]

@template(() => (
    <div>
        <table>
			<thead>
				<th>Lobby ID</th>
				<th>Code</th>
				<th>Endpoint</th>
				<th>Created At</th>
			</thead>
            {
				lobbies.map((lobby) => {
                	return (
						<tr>
							<td>{lobby.id}</td>
							<td>{lobby.code}</td>
							<td>{lobby.host.endpointId.toString()}</td>
							<td>{lobby.createdAt}</td>
						</tr>
					);
            	})
			}
        </table>
    </div>
))
export class Lobbies extends Component{}
