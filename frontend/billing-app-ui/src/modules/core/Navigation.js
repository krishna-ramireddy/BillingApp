import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton, { listItemButtonClasses } from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { styled } from '@mui/material/styles';
import { useLocation } from "react-router";
import Constants from '../../Constants.json'
import { Button, Container } from '@mui/material';

import { authenticationActions } from './store/authenticationSlice';

const StyledListItemButton = styled(ListItemButton)(() => ({
    [`&.${listItemButtonClasses.selected}`]: {
        backgroundColor: '#015d81'
    }
}));

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const subNavItemsInitialData = [
    {
        id: 1,
        isAdminNav: false,
        label: 'Bill Processing',
        pathKey: 'billings',
        showSubItems: false,
        children: [
            {
                id: 11,
                label: 'Manage Billings',
                path: '/billings/manage'
            },
            {
                id: 12,
                label: 'Payment Screen',
                path: '/billings/payment'
            }
        ]
    },
    {
        id: 2,
        isAdminNav: true,
        label: 'Admin Pages',
        pathKey: 'admin',
        showSubItems: false,
        children: [
            {
                id: 21,
                label: 'Admin Manage Billings',
                path: '/admin/manage/billings'
            }
        ]

    }
];

const Navigation = () => {
    const location = useLocation();
    const pagePath = location.pathname
    const [state, setState] = React.useState(false);
    const [selectedNavItem, setSelectedNavItem] = React.useState(11);
    const [subNavItemsData, setSubNavItemsData] = React.useState(subNavItemsInitialData);
    const tooggleSideNavMenu = () => {
        setState(!state);
    };


    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const loginHandler = (event) => {
        event.preventDefault();

        dispatch(authenticationActions.login());
    };
    const logoutHandler = (event) => {
        event.preventDefault();

        dispatch(authenticationActions.logout());
    };

    React.useEffect(() => {
        if (pagePath !== null && pagePath !== "" && pagePath !== "/") {
            const selItem = pagePath.split("/");
            if (selItem.length > 2 && selItem[1] !== "") {
                let selObject = subNavItemsData.filter((item) => item.pathKey === selItem[1])
                if (selObject.length > 0) {
                    if (selObject.length > 0 && selObject[0].children.length > 0 && !selObject[0].showSubItems) {
                        handleSubNavItems(selObject[0].id);
                    }
                    selObject = selObject.map((subItem) => subItem.children.filter((childItem) => childItem.path === pagePath));
                    setSelectedNavItem(selObject[0].id);
                }
            } else if (selItem.length === 2 && selItem[1] !== "") {
                let selObject = subNavItemsData.filter((item) => item.pathKey === selItem[1])
                if (selObject.length > 0) {
                    setSelectedNavItem(selObject[0].id);
                }
            }
        }
    }, [pagePath])

    const handleSubNavItems = (id) => {
        let testData = subNavItemsData.map((item) => {
            if (item.id === id) {
                item.showSubItems = !item.showSubItems;
            }
            return item;
        });
        setSubNavItemsData(testData);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar elevation={0} position="fixed" sx={{
                backgroundColor: Constants.APP_BAR_COLOR, boxShadow: 'none', mb: 2,
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}>
                <Container maxWidth="xl">
                    <Toolbar elevation={0}
                        disableGutters
                        sx={{
                            justifyContent: "space-between"
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {isAuth && <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={tooggleSideNavMenu}
                            // color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>}
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { xs: "none", md: "flex" } }}
                            >
                                LOGO
                            </Typography>
                        </div>
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            {!isAuth &&
                                <Button
                                    onClick={loginHandler}
                                    sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none' }}
                                >
                                    Login
                                </Button>}
                            {isAuth &&
                                <Button
                                    onClick={logoutHandler}
                                    sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none' }}
                                >
                                    Logout
                                </Button>
                            }
                        </Box>
                    </Toolbar>
                </Container>
                <Drawer
                    anchor='left'
                    open={state}
                    onClose={tooggleSideNavMenu}
                    sx={{

                        minWidth: 240,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { minWidth: 240, boxSizing: 'border-box', backgroundColor: Constants.SIDE_NAV_BG_COLOR },
                    }}
                >
                    <List
                        sx={{ paddingTop: "70px", width: '100%', maxWidth: 240, bgcolor: Constants.SIDE_NAV_BG_COLOR, color: 'white' }}
                        component="nav"
                    >
                        {subNavItemsData.map((item) => {
                            if (item.children?.length > 0) {
                                return (
                                    <React.Fragment key={item.id}>
                                        <StyledListItemButton onClick={() => handleSubNavItems(item.id)}>
                                            <ListItemText primary={item.label} />
                                            {item.showSubItems ? <ExpandLess /> : <KeyboardArrowRight />}
                                        </StyledListItemButton>
                                        <Collapse in={item.showSubItems} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {item.children.map((subItem) =>
                                                    <StyledListItemButton key={subItem.id} selected={selectedNavItem === subItem.id} onClick={() => { setSelectedNavItem(subItem.id); tooggleSideNavMenu() }} component={RouterLink} to={subItem.path} sx={{ pl: 4 }}>
                                                        <ListItemText primary={subItem.label} />
                                                    </StyledListItemButton>
                                                )}
                                            </List>
                                        </Collapse>
                                    </React.Fragment>
                                );
                            } else {
                                return (
                                    <StyledListItemButton key={item.id} selected={selectedNavItem === item.id} onClick={() => { tooggleSideNavMenu() }} component={RouterLink} to={item.path}>
                                        <ListItemText primary={item.label} />
                                    </StyledListItemButton>
                                )
                            }
                        })}
                    </List>
                </Drawer>
            </AppBar>
            <Offset style={{ paddingTop: '20px' }} />
        </Box >
    );
};

export default Navigation;
