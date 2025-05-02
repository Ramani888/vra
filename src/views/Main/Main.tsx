import React, { Suspense, useEffect } from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Setting from '../Setting/Setting';
import Notification from '../Notification/Notification';
import Banner from '../Banner/Banner';
import Users from '../Users/Users';
import Category from '../Category/Category';
import LoginView from '../Login/Login';
import Product from '../Product/Product';
import Dashboard from '../Dashboard/Dashboard';
import Orders from '../Orders/Orders';
import AdsPoster from '../AdsPoster/AdsPoster';
import Pramotion from '../Pramotion/Pramotion';
import InvoiceWrapper from '../Invoice/Invoice';
import { SidebarData } from '../../components/Sidebar/SidebarData';
import AccountMenu from '../../components/AccountMenu/AccountMenu';
import DashboardIcon from '@mui/icons-material/Dashboard'
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  background: "#0a3157",
  color: "#ffffff",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: "#0a3157",
  overflowX: "hidden",
  color: "#ffffff",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    // useEffect(() => {
    //   document.title = 'Vr Fashion';
    // }, [location]);

    const getRoutes = () => {
      return (
        <Suspense>
          <Routes location={location}>
            <Route
              path="/Login"
              element={
                <Suspense>
                  <LoginView />
                </Suspense>
              }
            />
            <Route
              path="/Dashboard"
              element={
                <Suspense>
                  <Dashboard />
                  {/* <InvoiceWrapper></InvoiceWrapper> */}
                </Suspense>
              }
            />
            <Route
              path="/Pramotion"
              element={
                <Suspense>
                  <Pramotion />
                </Suspense>
              }
            />
            <Route
              path="/Banner"
              element={
                <Suspense>
                  <Banner />
                </Suspense>
              }
            />
            <Route
              path="/AdsPoster"
              element={
                <Suspense>
                  <AdsPoster />
                </Suspense>
              }
            />
            <Route
              path="/Category"
              element={
                <Suspense>
                  <Category />
                </Suspense>
              }
            />
            <Route
              path="/Product"
              element={
                <Suspense>
                  <Product />
                </Suspense>
              }
            />
            {/* <Route
              path="/Home/Stock"
              element={
                <Suspense>
                  <Product />
                </Suspense>
              }
            /> */}
            <Route
              path="/Setting"
              element={
                <Suspense>
                  <Setting />
                </Suspense>
              }
            />

            <Route
              path="/Notification"
              element={
                <Suspense>
                  <Notification />
                </Suspense>
              }
            />

            <Route
              path="/User"
              element={
                <Suspense>
                  <Users />
                </Suspense>
              }
            />

            <Route
              path="/Orders"
              element={
                <Suspense>
                  <Orders />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to={'/Dashboard'} />} />
          </Routes>
        </Suspense>
      )
    }

    const handleLogout = () => {
      localStorage.removeItem('Admin')
      navigate('/Login')
    }

    useEffect(() => {
      if (location.pathname === '/') {
        navigate('/Dashboard')
      }
    }, [])

    useEffect(() => {
      const adminDataString = localStorage.getItem('Admin');
      if (adminDataString) {
        if (location.pathname === '/Login') {
          navigate('/')
        }
        try {
          const adminData = JSON.parse(adminDataString);
        } catch (error) {
          console.error("Error parsing admin data:", error);
        }
      } else {
        navigate('/Login')
      }
    }, [location.pathname])

    const routeData = SidebarData?.find((item) => item?.path === location?.pathname);
    let Icon = DashboardIcon;

    if (routeData) {
      Icon = routeData.Icon;
    }

    return (
      <>
        {location.pathname === '/Login' ? (
          <>
            {getRoutes()}
          </>
        ) : (
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
              <Toolbar sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              {/* {open && (
                <IconButton onClick={handleDrawerClose} sx={{marginRight: '10px'}}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon sx={{color: '#ffffff'}}/> : <ChevronLeftIcon sx={{color: '#ffffff'}}/>}
                </IconButton>
              )} */}
              {open && (
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <Icon />
                  <Typography variant="h6" noWrap component="div">
                    {routeData?.title}
                  </Typography>
                </div>
              )}
              <AccountMenu />
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <DrawerHeader sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Typography variant="h1" fontSize={22} fontWeight={'bold'} marginLeft={1}>
                VR Fashion
              </Typography>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon sx={{color: '#ffffff'}} />}
              </IconButton>
              {/* <img src='/VR_Fashion_Logo.jpeg' height={60} width={60}></img> */}
              </DrawerHeader>
              <Divider sx={{background: '#1876d1'}} />
              <Sidebar open={open} handleDrawerOpen={handleDrawerOpen}/>
              {/* <LogoutContainer onClick={() => handleLogout()}>
                <LogoutIcon />
                <LogoutTitle>Logout</LogoutTitle>
              </LogoutContainer> */}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, m: 2, height: 'calc(100%)', overflowY: 'hidden' }}>
              <DrawerHeader />
              <Box component="main" sx={{ height: 'calc(100vh - 100px)', overflowX: 'hidden', overflowY: 'auto' }}>
                {getRoutes()}
              </Box>
            </Box>
          </Box>
        )}
      </>
    );
}

export default Main;
