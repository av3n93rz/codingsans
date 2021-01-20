import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeadBar from '../Components/HeadBar'
import Image from 'next/image'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  image:{
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  mainTitle:{
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '50px',
    [theme.breakpoints.down('md')]: {
      fontSize: '60px'
    },
  }
}));

const index = () => {
  const classes = useStyles();

  return (
    <>
      <HeadBar/>
      <Typography variant="h1" component="h1" className={classes.mainTitle}>
          Welcome to Breweri Info.
      </Typography>
      <div className={classes.image}>
        <Image
          src="/undraw_having_fun.svg"
          alt="People having fun"
          width={1000}
          height={500}
        />
      </div>
    </>
  );
}

export default index