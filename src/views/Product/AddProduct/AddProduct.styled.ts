import { styled } from "styled-components";

export const Form = styled.form`
`

export const StyledDiv = styled.div`
  /* Add your styles here */
  margin-bottom: 15px;
  // display: flex
`;

export const ImageContainer = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`
export const ImageWrapper = styled.div`
display: flex;
align-items: center;
gap: 20px;
overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For IE and Edge */
`
export const VideoContainer = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`
export const ImageLabel = styled.div`
`
export const VideoLabel = styled.div`
`
export const ImageNote = styled.div<{ isSuccess: boolean; }>`
opacity: 0.5;
display: flex;
align-items: center;
color: ${({ isSuccess }) => isSuccess ? 'red' : 'green'};
`
export const ProductSectionContainer = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
grid-gap: 20px;
`