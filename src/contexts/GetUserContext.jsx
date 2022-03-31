import { useContext } from "react";

import UserContext from "./UserContext";

const GetUserContext = ()=>useContext(UserContext);
export default GetUserContext