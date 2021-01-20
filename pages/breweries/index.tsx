import React, {useReducer, useState, useEffect} from 'react'
import GetBreweries from '../../Components/hocs/GetBreweries'
import HeadBar from '../../Components/HeadBar'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {Container} from '@material-ui/core';
import Link from 'next/link'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import {listBreweries} from '../../core/apiCore'
import {breweriesReducer} from '../../core/reducers'
import {InitialState, BreweryInfo} from '../../core/interfaces'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '50px',
    maxWidth: theme.breakpoints.values.md
  },
  tbody:{
    minHeight: '367px'
  },
  loader:{
    margin: 'auto'
  },
  loaderContainer:{
    display: 'flex',
    height: '330px',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

const index = ({breweries, page}: {breweries:BreweryInfo[]; page: number}) => {
  const classes = useStyles();
  const router = useRouter()
  const [pageNumber, setPageNumber] = useState<number>(page-1 | 0);
  const [initialRender, setInitialRender] = useState<boolean>(true);
  const initialState:InitialState = { breweries: breweries, loading: false}
  const [pageData, dispatchData] = useReducer(breweriesReducer, initialState);

  useEffect(()=>{
    if(!initialRender){
      router.push(`/breweries/?page=${pageNumber+1}`, undefined, { shallow: true })
      dispatchData({type:'request', payload: []})
      listBreweries(pageNumber+1).then(res =>{
        dispatchData({type:'dataChange', payload:res})
      })
    } else {
      setInitialRender(false)
    }
  }, [pageNumber])

  const handleChangePage = (event:any, newPage:number) =>{
    setPageNumber(newPage)
  }

  return (
    <div>
      <HeadBar/>
      <Container className={classes.container}>
        <TableContainer component={Paper} className={classes.tbody}>
          <Table size="small" aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">Country</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageData.breweries.map((row:any) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left"><Link href={`/brewery/${row.id}`}>{row.name}</Link></TableCell>
                  <TableCell align="right">{row.city}</TableCell>
                  <TableCell align="right">{row.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {
          pageData.loading &&
            <div className={classes.loaderContainer}>
              {<CircularProgress className={classes.loader}/>}
            </div>
          }
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={-1}
          rowsPerPage={10}
          page={pageNumber}
          onChangePage={handleChangePage}
        />
      </Container>  
    </div>
  )
}

index.getInitialProps = async (breweries:object, page:number | undefined) => {
  return {breweries, page}
}

export default GetBreweries(index)
