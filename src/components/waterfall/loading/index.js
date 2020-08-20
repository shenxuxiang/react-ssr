import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.less';

function loading(props) {
  const [visible, setVisible] = useState(false);
  const { delay } = props;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="mt-waterfall-loading">
      <div className="mt-waterfall-loading-img" />
    </div>
  );
}

loading.propTypes = {
  delay: PropTypes.number,
};
loading.defaultProps = {
  delay: 2000,
};

export default memo(loading);
