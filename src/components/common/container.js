import React, { PropTypes } from 'react';
import Crumbs from './crumbs';
import './container.less';

function Container({ children, containerClass, crumbList }) {
  return (
    <div className={ containerClass }>
      <div className="crumbs">
        <Crumbs {...crumbList}/>
      </div>
      <div className="inner-container">
        { children }
      </div>
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.element.isRequired,
  containerClass: PropTypes.string.isRequired,
};

export default Container;
