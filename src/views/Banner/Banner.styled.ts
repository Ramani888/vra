import styled from 'styled-components'

export const BannerContainer = styled.div`
height: auto;
width: 100%;
/* padding: 10px; */
display: flex;
flex-direction: column;
gap: 20px;
overflow-x: auto;
overflow-y: auto;
`
export const BannerHeaderContainer = styled.div`
width: 100%;
border-bottom: 1px solid black;
height: 60px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`
export const BannerHeading = styled.div`
font-size: 18px;
`
export const BannerBodyContainer = styled.div`
`
export const ImageLabel = styled.div`
font-style: italic;
cursor: pointer;
color: #1876d1;
text-decoration: underline;
`
export const ActionImg = styled.img`
`