import React from 'react';
import {listBreweries} from '../../core/apiCore'

const Breweries = (WrappedComponent:any):any => {
  const hocComponent = ({ ...props}:any) => <WrappedComponent {...props} />
  hocComponent.getInitialProps = async (req:any, res:any) => {
    const breweries:object = await listBreweries(req.query.page)
    if(WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps(breweries, req.query.page);
      return { ...wrappedProps};
    }
  };
  return hocComponent;
};

export default Breweries