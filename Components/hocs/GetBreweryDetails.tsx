import React from 'react';
import {getBrewery} from '../../core/apiCore'

const BreweryProps = (WrappedComponent:any):any => {
  const hocComponent = ({ ...props}:any) => <WrappedComponent {...props} />
  hocComponent.getInitialProps = async (req:any, res:any) => {
    const brewery:object = await getBrewery(req.query.id)
    if(WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps(brewery);
      return { ...wrappedProps};
    }
  };
  return hocComponent;
};

export default BreweryProps