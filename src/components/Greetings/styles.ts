import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
    -webkit-app-region: drag;
    height: 100vh;
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export const Button = styled.button`
  width:25px;
  height:25px;
  -webkit-app-region: no-drag;

  border:none;  
  background-repeat: no-repeat;
  margin: 0px 5px 0px 5px;
  background-size: cover;
  cursor:pointer;
  border-radius: 5px;
  position: relative;
  :focus {
    outline:none;
  }
  :hover {
    box-shadow: inset 0 0.5em 0.5em -0.4em #ffa260;
  }
`;
export const Image = styled.img`
    width: 25px;
    cursor:pointer;
    border:solid 2px #000;
    margin: 0px 5px 0px 5px;
    border-radius:5px;
    transition: 0.25s;
    :hover{
      box-shadow: 0 0.5em 0.5em -0.4em #ffa260;
    }
`
export const Text = styled.p`
    margin-top: 35px;
    font-size: 20px;
    font-weight: bold;
`
