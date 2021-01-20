import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link'
import ListIcon from '@material-ui/icons/List';
import Button from '@material-ui/core/Button';
import SearchBar from './SearchBar'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  toolbar:{
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    display: 'none',
    cursor: 'pointer',
    color: theme.palette.secondary.main,
    fontWeight: 900,
    fontSize: '25px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  btn:{
    backgroundColor: '#fff',
    border: '0px',
    padding: '8px',
    borderRadius: theme.shape.borderRadius,
    '&:focus':{
      outline: 'none'
    }
  },
  btnLink:{
    color: theme.palette.secondary.main,
    '& span':{
      fontSize: '16px',
      fontWeight: 'bold',
    }
  },
}));

const HeadBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
        <Link href="/">
          <Typography className={classes.title} variant="h6" component='h1' noWrap>
            Brewery Info
          </Typography>
        </Link>
          <SearchBar/>
          <Link href="/breweries">
            <Button className={classes.btn}>
              <ListIcon/>
              <Typography variant="caption" noWrap>
                All breweries
              </Typography>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeadBar