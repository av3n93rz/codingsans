import React from 'react'
import GetBreweryDetails from '../../../Components/hocs/GetBreweryDetails'
import HeadBar from '../../../Components/HeadBar'
import {BreweryInfo} from '../../../core/interfaces'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Container} from '@material-ui/core';
import ErrorPage from 'next/error'
import Link from 'next/link'
import moment from 'moment'
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
  paper:{
    position: 'relative',
    margin: '50px 0',
    backgroundColor:theme.palette.secondary.main,
    padding: '50px',
    '& *':{
      color: theme.palette.primary.main,
    }
  },
  marginBtm:{
    marginBottom: '25px'
  },
  link:{
    cursor: 'pointer',
    textDecoration: 'underline',
    textTransform: 'lowercase',
  },
  updated:{
    textAlign: 'center',
    marginTop: '25px'
  },
  svg:{
    position: 'absolute',
    zIndex: 0,
    bottom: '100px',
    right: '30px',
    opacity: '0.4'
  },
  dataContainer:{
    position: 'relative',
    zIndex: 10,
  }
}));

const index = (details:BreweryInfo) => {
  if(!details.id){
    return <ErrorPage statusCode={404}/>
  }
  const classes = useStyles();

  return (
    <div>
      <HeadBar/>
      <Container maxWidth='sm'>
        <Paper className={classes.paper}>
          <div className={classes.svg}>
            <Image src={'/undraw_beer.svg'} alt={'beer_svg'} width={'233px'} height={'170px'}/>
          </div>
          <div className={classes.dataContainer}>
            <div className={classes.marginBtm}>
              <Typography variant="h5" component="h1">
                {details.name}
              </Typography>
              {details.brewery_type && 
                <Typography variant="caption" component="p">
                  Type: {details.brewery_type}
                </Typography>
              }
              <Typography variant="caption" component="p">
                Id: {details.id}
              </Typography>
            </div>
            {details.website_url &&
              <Link href={details.website_url}>
                <Typography variant="button" component="p" className={classes.link}>
                  {details.website_url}
                </Typography>
              </Link>
            }
            <Typography variant="button" component="p" className={classes.marginBtm}>
              Phone: {details.phone ? details.phone:'-'}
            </Typography>
            {details.city && 
              <Typography variant="caption" component="p">
                {details.city}
              </Typography>
            }
            {details.street &&
              <Typography variant="caption" component="p">
                {details.street}
              </Typography>
            }
            {details.address_2 &&
              <Typography variant="caption" component="p">
                {details.address_2}
              </Typography>
            }
            {details.address_3 &&
              <Typography variant="caption" component="p">
                {details.address_3}
              </Typography>
            }
            {details.postal_code && 
              <Typography variant="caption" component="p">
                {details.postal_code}
              </Typography>
            }
            {details.state &&
              <Typography variant="caption" component="p">
                { details.state}
              </Typography>
            }
            {details.county_province &&
              <Typography variant="caption" component="p">
                { details.county_province}
              </Typography>
            }
            {details.country && 
              <Typography variant="caption" component="p">
                {details.country}
              </Typography>
            }
            {details.latitude && 
              <Typography variant="caption" component="p">
                Lat: {details.latitude}, Long: {details.longitude}
              </Typography>
            }
            <Typography variant="caption" component="p" className={classes.updated}>
              Updated at: {moment(details.updated_at).format('MM.DD.YYYY')}
            </Typography>
          </div>
        </Paper>
      </Container>
    </div>
  )
}

index.getInitialProps = async (details:object) => {
    return details
}

export default GetBreweryDetails(index)
