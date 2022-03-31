import reactDom from "react-dom";

import "./assets/reset.css";
import "./assets/style.css"

import App from "./Components/App";

function Root(){
    return(
        <App />
    );
};
const root = document.querySelector(".root");
reactDom.render(<Root/>,root);