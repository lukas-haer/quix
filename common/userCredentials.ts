import { inferType } from "datex-core-legacy/datex_all.ts";
import { Quiz } from "common/Quiz.tsx";

//struct for users
export const User = struct("User",
	class {
		@property id!: string
		@property password!: string
		@property quizzes!: Record<string, Quiz>;
	}
)

export type User = inferType<typeof User>;

//struct, poperty