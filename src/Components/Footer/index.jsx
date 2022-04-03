import { useNavigate } from "react-router-dom";

import "./footer.css"

function Footer() {
    const navigate = useNavigate();
    return (
        <footer>
            <p onClick={()=>{navigate("/habits");}}>Hábitos</p>
            <p onClick={()=>{navigate("/today");}}>circulo</p>
            <p onClick={()=>{navigate("/historic");}}>Histórico</p>
        </footer>
    );
}
export default Footer;