import { useState, Fragment } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Container,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

function NavbarComponent() {
    const [drawer, setDrawer] = useState(false);

    const toggleDrawer = () => (event) => {
        if (
            event.type === "keydown" &&
                (
                    (event).key === "Tab" || (event).key === "Shift"
                )
        ) {
            return;
        }
    
        setDrawer(!drawer);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Story
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <Fragment key="left">
                            <IconButton
                                size="large"
                                onClick={toggleDrawer()}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor={"left"}
                                open={drawer}
                                onClose={toggleDrawer()}
                            >
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton href="/add">
                                            <ListItemText primary="Add a Story" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Drawer>
                        </Fragment>
                    </Box>
                    
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Story
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            href="/add"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Add a Story
                        </Button>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavbarComponent;
