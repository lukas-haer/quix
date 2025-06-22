// Wrapper component that surrounds all elements.
// Use this to mount global UI components like Snackbar.
import { Component } from "uix/components/Component.ts";
import {Snackbar} from "./src/components/utils/snackbar/Snackbar.tsx";

//TODO type von children im wiki finden
export default function Wrapper({children}: any) {

    return (
      <div>
          <Snackbar/>
          {children}
      </div>
    );
}