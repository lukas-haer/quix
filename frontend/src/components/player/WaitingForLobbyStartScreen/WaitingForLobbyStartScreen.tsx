const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center' as const,
        fontFamily: 'sans-serif',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '10px',
    },
    text: {
        fontSize: '1.2rem',
    },
};

export default function WaitingForLobbyStartScreen() {
    return (
      <div style={styles.container}>
          <h2 style={styles.heading}>Waiting for the lobby host...</h2>
          <p style={styles.text}>The game will start once the host is ready.</p>
      </div>
    );
}