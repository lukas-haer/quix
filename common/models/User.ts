import { inferType } from "datex-core-legacy/datex_all.ts";

//struct for users
export const User = struct("User",
	class {
		@property id!: string
		@property password!: string
	}
)

export type User = inferType<typeof User>;