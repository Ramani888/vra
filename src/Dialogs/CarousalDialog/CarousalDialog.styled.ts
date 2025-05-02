import { styled } from "styled-components";

export const CarousalContainer = styled.div`
position: relative;
`
export const CarousalIndex = styled.p`
position: absolute;
  top: 0.1rem;
  font-size: 0.7rem;
  font-weight: bold;
  font-family: Roboto;
  color: black;
  padding: 0.1rem 0.3rem;
  background-color: lightgray;
  left: 1rem;
  opacity: 0.75;
`
export const CarousalButtonPre = styled.div`
position: absolute;
  font-size: 50px;
  color: lightgray;
  cursor: pointer;
  top: 13rem;
  left: 1rem;
`
export const CarousalButtonNext = styled.div`
position: absolute;
  font-size: 50px;
  color: lightgray;
  cursor: pointer;
  top: 13rem;
  right: 1rem;
`
export const CarousalItemContainer = styled.div`
background-color: black;
lis
`
export const ImageMedia = styled.img`
width: 100%;
  height: 30rem;
  object-fit: contain;
`
export const VideoMedia = styled.video`
width: 100%;
  height: 30rem;
  object-fit: contain;
`