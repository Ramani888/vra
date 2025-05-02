import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CarousalButtonNext, CarousalButtonPre, CarousalContainer, CarousalIndex, CarousalItemContainer, ImageMedia, VideoMedia } from './CarousalDialog.styled';

interface Props {
  open: boolean;
  handleClose: () => void;
  imageDataPath: any[];
  videoPath: any;
}

const CarousalDialog: React.FC<Props> = ({ open, handleClose, imageDataPath, videoPath }) => {
  const items = [
    ...(imageDataPath?.map((item, index) => (
      <CarousalItemContainer key={index}>
        <ImageMedia src={item?.path} />
      </CarousalItemContainer>
    )) ?? []),
    ...(videoPath ? [
      <VideoMedia key="video" width="100%" controls>
        <source src={videoPath} />
        Your browser does not support the video tag.
      </VideoMedia>
    ] : [])
  ];

  const [mainIndex, setMainIndex] = useState<number>(0);

  const slideNext = () => {
    if (mainIndex < items.length - 1) {
      setMainIndex(mainIndex + 1);
    }
  };

  const slidePrev = () => {
    if (mainIndex > 0) {
      setMainIndex(mainIndex - 1);
    }
  };

  useEffect(() => {
    setMainIndex(0)
  }, [open])
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    >
      <CarousalContainer>
        {items[mainIndex]}
        <CarousalIndex>{`${mainIndex + 1}/${items.length}`}</CarousalIndex>

        {mainIndex !== 0 && (
          <CarousalButtonPre onClick={slidePrev}>
            &lang;
          </CarousalButtonPre>
        )}

        {mainIndex !== (items?.length - 1)  && (
          <CarousalButtonNext onClick={slideNext}>
            &rang;
          </CarousalButtonNext>
        )}
        </CarousalContainer>
    </Dialog>
  )
}

export default CarousalDialog