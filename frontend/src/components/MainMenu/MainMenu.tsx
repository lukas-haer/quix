import {Snackbar, successSnackbarMessage, failureSnackbarMessage} from "frontend/src/components/utils/snackbar/Snackbar.tsx"

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
    },
    title: {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    buttonContainer: {
        gap: '10px',
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        border: 'none',
        backgroundColor: '#4CAF50',
        color: 'white',
    },
};


export default function mainMenu() {

    function handleJoinGame() {
        window.location.href = `${window.location.origin}/join`;
    }

    function handleCreateNewGame() {
        window.location.href = `${window.location.origin}/create`;
    }

    return (
      <div style={styles.container}>
          <h1 style={styles.title}>QUIX</h1>
          <div style={styles.buttonContainer}>
              <button style={styles.button} onclick={handleJoinGame}>Spiel Beitreten</button>
              <button style={styles.button} onclick={handleCreateNewGame}>Neues Spiel Erstellen</button>
              <a href="/login"><button type="button" id="login-btn">Log into your existing account</button></a>
			  <a href="/signup"><button type="button" id="signup-btn">Create a new account</button></a>
            <button onclick={() => successSnackbarMessage("TEST","dies ist ein test")}></button>
      </div>

          <Snackbar/>

      </div>


    );
}





