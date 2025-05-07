import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import UserAuth from '../Api/AuthFunction_Call';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Avatar, Icon } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, Leaderboard, Logout, Search, SearchOff, Feedback, Power, NewReleases, Celebration, Pages, RocketLaunch, BookOnline, Support } from '@mui/icons-material';
import './Navbar.css';
import { FaAnchor, FaBook, FaGoogle, FaHome, FaIcons, FaInbox, FaPen, FaSearch, FaSignInAlt, FaStar, FaTeamspeak, FaUserFriends, FaUserNinja } from 'react-icons/fa';


function NavBar() {
    const [menuActive, setMenuActive] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const authContext = useContext(AuthContext); 
    const { setUser, user, auth, data, setData } = useContext(AuthContext);
    const navigate = useNavigate();
    const { handleGoogleSignIn, handleEmailSignup, EmailSignin, handleForgotPassword, handleLogout } = UserAuth();
    const email = authContext.user?.email;

    const logout = () => {
        handleLogout();
    }

    const toggleDrawer = (open) => () => {
        setMenuActive(open);
    };

    return (
        <AppBar position="fixed" className="nav-container" style={{ backgroundColor: 'var(--bg-color)' }}>
            <Toolbar className="nav-elements">
                <div className="nav-brand">
                    <div className='navbrand'>
                        <img src="./Icons/cat.png" alt="" style={{ height: '30px', width: '30px' }} className='m-3' />
                        <Typography variant="h6" className="nav-brand-name">
                            Educome
                        </Typography>
                    </div>
                    <div>
                        {window.innerWidth <= 1005 ? (
                            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                        ) : null}
                    </div>
                </div>
                
                <div className="nav-links">
                    {window.innerWidth > 1005 && 
                        <>
                            <Link to="/pacifics-path"><a href="#" className="nav-link">Home</a></Link>
                            <a href="#" className="nav-link">About</a>
                            {/* {email!=null&& */}
                            {/* <> */}
                            <div className="nav-dropdown" >
                                <button className="nav-dropdown-button nav-link-explore" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                    Explore
                                </button>
                                <div className={`nav-dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                                    <Link to="/github-profile" className="nav-dropdown-item"><FaSearch style={{position:'relative', right: '4px', top: '2px'}} />Search</Link>
                                    <Link to="/projects" className="nav-dropdown-item"><FaStar style={{position:'relative', right: '4px', top: '2px'}} /> Projects</Link>
                                    <Link to="/read-books" className="nav-dropdown-item"><FaBook style={{position:'relative', right: '4px', top: '2px'}} /> Books</Link>
                                    <Link to="/join-community" className="nav-dropdown-item"><Support style={{position:'relative', right: '4px', top: '2px'}} /> Find Community</Link>
                                    <Link to="/git-mate" className="nav-dropdown-item"><FaUserFriends style={{position:'relative', right: '4px', top: '2px'}} /> Find Mates</Link>
                                    <Link to="/learderboard" className="nav-dropdown-item"><Leaderboard style={{position:'relative', right: '4px', top: '2px'}} /> LeaderBoard</Link>
                                    <Link to="/selfLearn" className="nav-dropdown-item"><FaGoogle style={{position:'relative', right: '4px', top: '2px'}} /> Learn With Ai</Link>
                                    <Link to="/cover-letter" className="nav-dropdown-item"><FaPen style={{position:'relative', right: '4px', top: '2px'}} /> Cover Letter</Link>
                                    <Link to="https://forms.gle/JaN34JzzDWhtjAUv5" className='nav-dropdown-item' ><Feedback style={{position:'relative', right: '4px', top: '2px'}} /> Feedback</Link>
                                </div>
                            </div>
                            {/* </>} */}
                            <a href="#dev" className="nav-link">Us</a>
                            {email == null ? (
                                <>
                                    <Link to="/login"><button className="nav-login-btn">login</button></Link>
                                </>
                            ) : (
                                <div className='log-out-btns' style={{display:"flex", gap: "8px"}}>
                                    <Link to="Compare"><a className='nav-compare-btn'><Leaderboard /></a></Link>
                                    <a onClick={() => logout()} className='nav-logout-btn'><Logout /></a>
                                </div>
                            )}
                        </>
                    }
                    {email == null ? (
                        <Link to="/signup"><button className="nav-login-btn">SignUp</button></Link>
                    ) : (
                        null
                    )}
                </div>
            </Toolbar>
            <Drawer
                anchor="right"
                open={menuActive}
                onClose={toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: 'black',
                        color: 'white',
                        textAlign: 'end',
                        
                    },
                }}
            >
                <div className="drawer-header">
                    <IconButton onClick={toggleDrawer(false)}>
                        <CloseIcon style={{ color: 'white' }} />
                    </IconButton>
                </div>
                <List style={{justifyContent: 'end', textAlign:'end',alignItems: 'end'}}>
                     <ListItem button component={Link} to="/pacifics-path">
                        <FaHome style={{position:'relative', right: '6px', top: '-1px'}} /> <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component="a" href="#dev">
                        <FaIcons style={{position:'relative', right: '6px', top: '-1px'}}  /> <ListItemText primary="About" />
                    </ListItem>
                    {/* {email &&<> */}
                    <ListItem button component={Link} to="/github-profile">
                        <FaSearch style={{position:'relative', right: '6px', top: '-1px'}} /><ListItemText primary="Search" />
                    </ListItem>
                    <ListItem button component={Link} to="Compare">
                                <Leaderboard style={{position:'relative', right: '6px', top: '-1px'}}/><ListItemText primary="Compare" />
                  </ListItem>
                     <ListItem button component={Link} to="/projects">
                        <FaStar style={{position:'relative', right: '6px', top: '-1px'}} /> <ListItemText primary="Projects" />
                    </ListItem>
                     <ListItem button component={Link} to="/read-books">
                        <FaBook style={{position:'relative', right: '6px', top: '-1px'}} /><ListItemText primary="Books" />
                    </ListItem>
                     <ListItem button component={Link} to="/git-mate">
                       <FaUserFriends style={{position:'relative', right: '6px', top: '-1px'}} /><ListItemText primary="Find Mate" />
                    </ListItem>
                    <ListItem button component={Link} to="/join-community">
                       <Support style={{position:'relative', right: '6px', top: '-1px'}} /><ListItemText primary="Find Community" />
                    </ListItem>
                     <ListItem button component={Link} to="/learderboard">
                        <Leaderboard style={{position:'relative', right: '6px', top: '-1px'}} /> <ListItemText primary="Leader Board" />
                    </ListItem>
                    <ListItem button component={Link} to="/selfLearn">
                        <FaGoogle style={{position:'relative', right: '6px', top: '-1px'}} /><ListItemText primary="Learn With Ai" />
                    </ListItem>
                    <ListItem button component={Link} to="/cover-letter">
                        <FaPen style={{position:'relative', right: '6px', top: '-1px'}}/><ListItemText primary="Cover Letter" />
                    </ListItem>
                    <ListItem button component={Link} to="https://forms.gle/JaN34JzzDWhtjAUv5">
                        <Feedback style={{position:'relative', right: '6px', top: '-1px'}} /><ListItemText primary="Feedback" />
                    </ListItem>
                    {/* </> 
                    } */}
                    {email!=null&&<>
                     <ListItem button onClick={() => logout()}>
                                <Logout style={{position:'relative', right: '6px', top: '-1px'}}/>Logout
                            </ListItem>
                    </>}
                    {email == null&&
                        <>
                            <ListItem button component={Link} to="/login">
                                <FaSignInAlt style={{position:'relative', right: '6px', top: '-1px'}}/><ListItemText primary="Login" />
                            </ListItem>
                            <ListItem button component={Link} to="/signup">
                                <Celebration style={{position:'relative', right: '6px', top: '-1px'}} /><ListItemText primary="SignUp" />
                            </ListItem>
                        </>
                    }
                            {/* <ListItem>
                            //     <Avatar src={data.photoURL} onClick={() => navigate("/profile")} alt="Profile" />
                            // </ListItem> */}
                </List>
            </Drawer>
        </AppBar>
    );
}

export default NavBar;
