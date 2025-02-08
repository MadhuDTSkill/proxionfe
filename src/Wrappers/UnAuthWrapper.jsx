import React from 'react';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode correctly
import Redirecting from '../Components/ui/Redirecting'

function isTokenExpired(token) {
  const decodedToken = jwtDecode(token);
  const currentTime = Math.trunc(Date.now() / 1000);
  return currentTime > decodedToken.exp;
}


function UnAuthWrapper(WrappedComponent) {
  
  const HOC = (props) => {
    const storedAccessToken = localStorage.getItem('accessToken')
    if (storedAccessToken && !isTokenExpired(storedAccessToken)) {
      return <Redirecting to="/" message='Already Signed In, Redirecting Chat ..' />;
    } else {
      return <WrappedComponent {...props} />;
    }
  }
  return HOC
}

export default UnAuthWrapper;
