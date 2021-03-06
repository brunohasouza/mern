import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from "react-transition-group";

// import { Container } from './styles';
import './SideDrawer.css'

export default (props) => {
  const content = (
    <CSSTransition 
      in={props.show} 
      timeout={200} 
      classNames="slide-in-left" 
      mountOnEnter 
      unmountOnExit
    >
      <aside className="side-drawer">
        { props.children }
      </aside>
    </CSSTransition>
  )

  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
}
