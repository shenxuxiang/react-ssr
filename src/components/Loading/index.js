import React, { memo } from 'react';
import './index.less';

function Loading () {
  return (
    <div className="ssr-loading">loading...</div>
  );
}

export default memo(Loading);
