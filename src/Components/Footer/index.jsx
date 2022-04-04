import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import GetUserContext from "../../contexts/GetUserContext";
import styled from 'styled-components';

import 'react-circular-progressbar/dist/styles.css';

function Footer() {
    const { globalData } = GetUserContext();
    const { percentage } = globalData;
    const navigate = useNavigate();
    return (
        <FooterStyle>
            <p onClick={() => { navigate("/habits"); }}>Hábitos</p>
            <article onClick={() => { navigate("/today"); }}>
                <Progress>
                    <CircularProgressbar
                        value={percentage}
                        text={`Hoje`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}
                    />
                </Progress>
            </article>
            <p onClick={() => { navigate("/historic"); }}>Histórico</p>
        </FooterStyle>
    );
}
const FooterStyle = styled.footer`
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 70px;
    font-size: 17.976px;
    line-height: 22px;
    color: #52B6FF;
    background-color: white;
    right: 0;
    left: 0;
    z-index: 1;
`;
const Progress = styled.div`
    width: 91px;
    height: 91px;
    position: absolute;
    top: -30px;
    margin: 0 auto 0 auto;
    left: 0;
    right: 0;
`;
export default Footer;