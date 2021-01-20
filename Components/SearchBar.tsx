import React, {useEffect, useReducer, useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Link from 'next/link'
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import {search} from '../core/apiCore'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {Results, SearchState} from '../core/interfaces'
import {SearchReducer} from '../core/reducers'
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.9),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    '&:focus-within':{
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  loading: {
    display: 'flex',
    width:'100px',
    justifyContent: 'center',
    minWidth: '235.69px',
    padding: '15px'
  },
  popper:{
    zIndex: 999
  }
}));

const SearchBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [keyword, setKeyword] = useState<string>('');
  const searchState:SearchState = { results: [], loading:false}
  const [searchRes, dispatch] = useReducer(SearchReducer, searchState);
   
  useEffect(()=>{
    dispatch({type:'request', payload: []})
    displayResults()
  }, [keyword])

  useEffect(()=>{
    setAnchorEl(document.getElementById('anchor'))
  }, [])

  const displayResults = async() =>{
    if(keyword.length > 0){
      search(keyword).then(res =>{
        dispatch({type:'result', payload: res})
      })
    } else {
      dispatch({type:'clear', payload:[]})
    }
  }

  const handleClickAway = () =>{
    dispatch({type:'clear', payload:[]})
    setKeyword('')
  }

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              id='anchor'
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={keyword}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e)=>setKeyword(e.target.value)}
            />
          </div>
            <Popper
              className={classes.popper}
              anchorEl={anchorEl}
              keepMounted
              open={(searchRes.results.length > 0 || searchRes.loading) ? true: false}
              placement='bottom'
            >
              <Paper>
                {searchRes.loading && <div className={classes.loading}><CircularProgress/></div>}
                {searchRes && searchRes.results.map((i:Results)=>(
                  <Link href={`/brewery/${i.id}`} key={i.id}>
                    <MenuItem onClick={handleClickAway}>{i.name}</MenuItem>
                  </Link>
                ))}
              </Paper>  
            </Popper>
        </div>
      </ClickAwayListener>
    </>
  )
}

export default SearchBar