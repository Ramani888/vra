import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';
import { serverGetPaymentMethod, serverUpdatePaymentMethod } from '../../services/serverApi';

const AccountMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [adminData, setAdminData] = React.useState<any>(null);
  const [codEnabled, setCodEnabled] = React.useState<boolean>(true);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('Admin')
    navigate('/Login')
  }

  const handleUpdatePaymentMethod = async (enabled: boolean) => {
    try {
      await serverUpdatePaymentMethod(enabled);
    } catch (error) {
      console.error('Error updating payment method:', error);
    }
  }

  const handleCodToggle = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setCodEnabled(checked);
    await handleUpdatePaymentMethod(checked);
  };

  const getPaymentMethodData = async () => {
    try {
      const response = await serverGetPaymentMethod();
      return response;
    } catch (error) {
      console.error('Error fetching payment method data:', error);
      return null;
    }
  }

  React.useEffect(() => {
    const res: any = localStorage.getItem("Admin");
    setAdminData(JSON.parse(res));

    // Fetch payment method status from backend
    const fetchPaymentMethod = async () => {
      const res = await getPaymentMethodData();
      if (res && typeof res?.data?.isCashOnDelivery === 'boolean') {
        setCodEnabled(res?.data?.isCashOnDelivery);
      }
    };
    fetchPaymentMethod();
  }, [])

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, background: '#ffffff', color: '#1876d1', fontWeight: 'bold', textTransform: 'capitalize' }}>{adminData?.email[0]}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
        <Avatar sx={{ width: 32, height: 32, background: '#1876d1', color: '#ffffff', fontWeight: 'bold', textTransform: 'capitalize' }}>{adminData?.email[0]}</Avatar> {adminData?.email}
        </MenuItem>
        <Divider />
        <MenuItem>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ flexGrow: 1 }}>Cash on Delivery</Typography>
            <Switch
              checked={codEnabled}
              onChange={handleCodToggle}
              color="primary"
              inputProps={{ 'aria-label': 'cash on delivery switch' }}
            />
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
