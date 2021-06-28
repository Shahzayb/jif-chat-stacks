import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link as MuiLink,
  makeStyles,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import {useUser} from 'common/hooks/useUser';
import AccountBalance from 'components/AccountBalance';
import AccountName from 'components/AccountName';
import ConnectWalletButton from 'components/ConnectWalletButton';
import React from 'react';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import {useSignOut} from 'common/hooks/useSignOut';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  navItems: {
    display: 'flex',
    alignItems: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function MakeAPostButton(props) {
  const history = useHistory();
  const gotoPost = () => {
    history.push('/post');
  };
  return (
    <Button {...props} onClick={gotoPost} endIcon={<AddIcon />}>
      Post Jif
    </Button>
  );
}

function NameAndBalance() {
  return (
    <Box display="flex" flexDirection="column">
      <AccountName />
      <AccountBalance />
    </Box>
  );
}

function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const signOut = useSignOut();
  const isMenuOpen = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="small"
        aria-label="account of current user"
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar
        //  alt={authUser.firstName} src={authUser.profile_pic_url}
        />
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem disabled divider style={{opacity: 1}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Box mr={2}>
              <Avatar />
            </Box>
            <NameAndBalance />
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            signOut();
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  );
}

function SignedInNavItems() {
  const classes = useStyles();
  return (
    <div className={classes.navItems} display="flex" alignItems="center">
      <MakeAPostButton />
      <Divider orientation="vertical" flexItem />
      <NameAndBalance />
      <Divider orientation="vertical" flexItem />
      <AccountMenu />
    </div>
  );
}

function Navbar() {
  const {isSignedIn} = useUser();
  const classes = useStyles();

  return (
    <AppBar position="fixed" variant="outlined" color="default">
      <Container>
        <Toolbar>
          <Typography className={classes.grow} variant="h5">
            <MuiLink color="inherit" component={RouterLink} to="/">
              jif-chat-stacks
            </MuiLink>
          </Typography>
          {!isSignedIn && <ConnectWalletButton />}
          {isSignedIn && <SignedInNavItems />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
