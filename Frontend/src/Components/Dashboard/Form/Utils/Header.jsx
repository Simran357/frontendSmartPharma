import React, { useState } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton,
    Divider
} from '@mui/material'
import { Bell, Settings } from "lucide-react"
import MenuIcon from '@mui/icons-material/Menu'
import SchoolIcon from '@mui/icons-material/School'
import { useNavigate, useLocation } from 'react-router-dom'
import UserProfileMenu from '../UserProfile'

const Header = () => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems = [
        { text: 'Retailer', path: '/Dashboard/Retailer' },
        { text: 'Inventory', path: '/Dashboard/Retailer/Inventory' },
       
        { text: 'Wholesalers', path: '/Dashboard/Retailer/Order' },
        { text: 'Role Control', path: '/Dashboard/Wholesaler/AdminRoleAssign' },
        { text: 'Wholesaler Panel', path: '/Dashboard/Wholesaler' },
        { text: 'Delivery', path: '/Dashboard/Wholesaler/Delivery'},

    ]

    const isActive = (path) => location.pathname.startsWith(path)

    const handleNavigate = (path) => {
        navigate(path)
        setOpen(false)
    }

    return (
        <>
            {/* HEADER */}
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255,255,255,0.15)',
                    borderBottom: '1px solid rgba(255,255,255,0.3)',
                    color: '#000'
                }}
            >
                <Toolbar>

                    {/* LOGO */}
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        <SchoolIcon sx={{ fontSize: 32, mr: 1 }} />
                        <Box>
                            <Typography fontWeight="bold" lineHeight={1.2}>
                                SmartPharma
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Admin Portal
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />

                    {/* DESKTOP MENU */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        {menuItems.map((item) => (
                            <Button
                                key={item.text}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    color: isActive(item.path) ? '#1976d2' : '#000',
                                    fontWeight: isActive(item.path) ? 'bold' : 'normal',
                                    borderBottom: isActive(item.path)
                                        ? '2px solid #1976d2'
                                        : '2px solid transparent',
                                    borderRadius: 0
                                }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* RIGHT ACTIONS */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

                        {/* NOTIFICATION */}
                        <IconButton sx={{ position: "relative" }}>
                            <Bell size={18} />
                            <span style={{
                                position: "absolute",
                                top: 6,
                                right: 6,
                                width: 8,
                                height: 8,
                                background: "red",
                                borderRadius: "50%"
                            }} />
                        </IconButton>

                        {/* SETTINGS */}
                        <IconButton sx={{ color: "gray", "&:hover": { color: "#1976d2" } }}>
                            <Settings size={18} />
                        </IconButton>

                        {/* PROFILE MENU */}
                        <UserProfileMenu
                            username="Wholesaler"
                            role="Admin"
                        />

                    </Box>

                    {/* MOBILE MENU ICON */}
                    <IconButton
                        sx={{ ml: 2, display: { md: 'none' }, color: "gray" }}
                        onClick={() => setOpen(true)}
                        aria-label="open menu"
                    >
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>

            {/* DRAWER (MOBILE) */}
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    display: { md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: 260,
                        backgroundColor: '#fff'
                    }
                }}
            >
                <Box sx={{ p: 2 }}>

                    {/* LOGO */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <SchoolIcon sx={{ mr: 1 }} />
                        <Box>
                            <Typography fontWeight="bold">SmartPharma</Typography>
                            <Typography variant="caption">Admin Portal</Typography>
                        </Box>
                    </Box>

                    <Divider />

                    {/* MENU ITEMS */}
                    <List>
                        {menuItems.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton onClick={() => handleNavigate(item.path)}>
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            color: isActive(item.path)
                                                ? 'primary'
                                                : 'text.primary',
                                            fontWeight: isActive(item.path)
                                                ? 'bold'
                                                : 'normal'
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    )
}

export default Header