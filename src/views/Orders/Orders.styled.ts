import { styled } from "styled-components";

export const OrdersContainer = styled.div`
height: auto;
width: 100%;
/* padding: 10px; */
display: flex;
flex-direction: column;
gap: 20px;
overflow-x: auto;
overflow-y: auto;
`
export const ActionImg = styled.img`
`
export const OrderStatusLabel = styled.div<{ bgColor: string, color: string }>`
padding: 5px 15px 5px 15px;
border-radius: 24px;
background-color: ${({ bgColor }) => bgColor};
color: ${({ color }) => color};
`
export const OrderStatusTabContainer = styled.div`
width: 100%;
border-bottom: 1px solid #0b3157;
display: flex;
align-items: center;
gap: 40px;
overflow: auto;
`
export const OrderStatusTab = styled.div<{ isActive: boolean }>`
height: 30px;
white-space: nowrap;
cursor: pointer;
${({ isActive }) => isActive && (`
    border-bottom: 2px solid #1876d1;
    color: #1876d1;
`)}
`
export const ButtonContainer = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`
export const AcceptButton = styled.button`
background-color: #1876d1;
color: #ffffff;
padding: 8px 20px 8px 20px;
border-radius: 4px;
border: none;
font-size: 16px;
cursor: pointer;
`
export const CancelButton = styled.button`
background-color: #ffffff;
padding: 8px 20px 8px 20px;
border-radius: 4px;
border: 1px solid black;
font-size: 15px;
cursor: pointer;
`
export const ProductImage = styled.img`
height: 100px;
width: 100px;
border-radius: 7px;
cursor: pointer;
`
export const ProductName = styled.div`
`