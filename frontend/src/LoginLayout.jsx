import React from 'react';
import styled from 'styled-components';

const LoginLayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #1a1a2e;
`;

const LoginLayout = ({ children }) => {
  return <LoginLayoutContainer>{children}</LoginLayoutContainer>;
};

export default LoginLayout;
