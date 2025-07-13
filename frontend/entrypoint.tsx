import { MainMenu } from './src/components/MainMenu/MainMenu.tsx';
import { HostMain } from 'frontend/src/components/livegame/host/HostMain.tsx';
import { PlayerMain } from 'frontend/src/components/livegame/player/PlayerMain.tsx';
import { CreateQuiz } from './src/components/gamecreation/createQuiz/CreateQuiz.tsx';

import { UserLoginForm } from 'frontend/src/components/userAccount/AccountAccess/UserLoginForm.tsx';
import { UserSignUpForm } from './src/components/userAccount/AccountAccess/UserSignUpForm.tsx';
import { AccountPage } from 'frontend/src/components/userAccount/AccountPage/AccountPage.tsx';

//TESTING TODO Remove
import { Datex } from 'datex-core-legacy/mod.ts';
import { LoadingScreen } from 'frontend/src/components/utils/loadingscreen/LoadingScreen.tsx';
import { HostPlayingScreen } from 'frontend/src/components/livegame/host/HostPlayingScreen/HostPlayingScreen.tsx';
import { GameStateObjects } from 'frontend/src/models/GameState.ts';
import { ObjectRef } from 'datex-core-legacy/runtime/pointers.ts';
const gameStateObjectsa: ObjectRef<GameStateObjects> = $({
    currentDeadline: new Date(),
    questions: [
        {
            id: 'c5676e6f-4067-40b0-ac05-64e480630a60',
            content: {
                questionText:
                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lore',
                answers: [
                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut l',
                    '... lediglich auf einzelne Ports gescoped ist',
                    '... skalierbar und daher unpraktikabel ist',
                    '... timeout-abhängig ist'
                ],
                correctAnswerId: 0,
                timeInSeconds: 45
            },
            isCorrect: () => false // example value, set as needed
        }
    ],
    players: []
});

export default {
    '/': () => <MainMenu />,
    '/join/:id': (_: any, { id }: { id: string }) => <PlayerMain id={id} />,
    '/join': () => redirect('/'),
    '/host/:quizId': (_: any, { quizId }: { quizId: string }) => <HostMain quizId={quizId} />,
    '/host': <HostMain quizId={''} />,
    '/create': () => <CreateQuiz />,
    '/login': <UserLoginForm />,
    '/signup': <UserSignUpForm />,
    '/account/:userId': (_: any, { userId }: { userId: string }) => <AccountPage userId={userId} />,

    '*': <LoadingScreen text={'404 Not Found'} subtext={'Please try again.'} />
};

//"/host/:quizId": (_: any, { quizId }: { quizId: string }) => setupHost(quizId),
