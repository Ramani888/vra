import React from 'react'
import AddButton from '../AddButton/AddButton'
import { AppHeaderContainer, AppHeading } from './AppHeader.styled'

interface Props {
  headerTitle: string;
  dataCount: number;
  buttonLabel?: string;
  onClick?: () => void;
  buttonHide?: boolean;
}

const AppHeader: React.FC<Props> = ({ headerTitle, dataCount, buttonLabel, onClick, buttonHide }) => {
  return (
    <AppHeaderContainer>
      <AppHeading>{`${headerTitle} (${dataCount})`}</AppHeading>
      {!buttonHide && (
        <AddButton buttonLabel={buttonLabel ?? ''} onClick={() => onClick ? onClick() : {}} />
      )}
    </AppHeaderContainer>
  )
}

export default AppHeader