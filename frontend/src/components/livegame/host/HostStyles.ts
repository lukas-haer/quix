//TODO: Look into how to enable scss import support in deno and switch to scss.

export const styles = {
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