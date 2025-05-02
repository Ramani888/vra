import { styled } from "styled-components";

export const UsersContainer = styled.div`
height: auto;
width: 100%;
/* padding: 10px; */
display: flex;
flex-direction: column;
gap: 20px;
overflow-x: auto;
overflow-y: auto;
`
export const StatusLabel = styled.div<{ isActive: boolean }>`
background: ${({ isActive }) => isActive ? 'green': 'red'};
color: #ffffff;
padding: 3px 10px 3px 10px;
border-Radius: 14px;
width: 80px;
text-align: center;
`
export const ActionImg = styled.img`
`