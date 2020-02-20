import React from 'react';

// import { Container } from './styles';
import './MainHeader.css'

export default (props) => {
  return (
    <header className="main-header">
      {props.children}
    </header>
  );
}
