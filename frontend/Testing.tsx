import { successSnackbarMessage } from "frontend/src/components/utils/snackbar/Snackbar.tsx";



export default function testing() {

    function testFunction() {
        successSnackbarMessage("TEST","dies ist ein test");
    }

    return (
      <div>
        aaaaaaaaaaaaaaaa
          <button onclick={testFunction}>Testmessage</button>
      </div>
    );
}