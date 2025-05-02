import { List } from '@mui/material'
import React from 'react'
import { SidebarData } from './SidebarData';
import Submenu from './Submenu';

interface Props {
  open: boolean;
  handleDrawerOpen: () => void;
}

const Sidebar: React.FC<Props> = ({ open, handleDrawerOpen }) => {
  return (
    <List sx={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
    {SidebarData.map((item, index) => (
      <Submenu key={index} open={open} item={item} handleDrawerOpen={handleDrawerOpen}/>
    ))}
    </List>
  )
}

export default Sidebar