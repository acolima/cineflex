import { Link } from "react-router-dom";
import styled from "styled-components";

function Header() {
  return ( 
    <PageHeader>
      <Link to="/">
        <h1>CINEFLEX</h1>
      </Link>
    </PageHeader>
  );
}

export default Header;

const PageHeader = styled.header`
  height: 67px;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #c3cfd9;

  position: fixed;
  top: 0;
  left: 0;
  
  h1 {
  font: 400 34px/40px "Roboto";
  color: #e8833a;
  }
`