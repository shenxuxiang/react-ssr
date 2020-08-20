import React, { memo, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { throttle, SH, scrollTop } from '../utils';
import './index.less';

function loadMore(props) {
  const isLoading = useRef(false);
  const { onLoad, loadingState, notMoreText, loadingCompletedText, loadingText, disabled } = props;
  useEffect(() => {
    function handleScroll() {
      if (isLoading.current) return;
      const top = scrollTop();
      const { scrollHeight } = document.documentElement || document.body;
      const value = scrollHeight - SH - top;
      if (value <= 200) {
        isLoading.current = true;
        onLoad();
      }
    }

    const onScroll = throttle(handleScroll, 200);
    if (disabled) {
      window.removeEventListener('scroll', onScroll, false);
    } else {
      window.addEventListener('scroll', onScroll, false);
    }
    return () => {
      window.removeEventListener('scroll', onScroll, false);
    };
  }, [disabled]);

  useEffect(() => {
    if (loadingState === 'LOADING' || loadingState === 'NOTMORE') {
      isLoading.current = true;
    } else {
      isLoading.current = false;
    }
  }, [loadingState]);

  const contentText = useMemo(() => {
    switch (loadingState) {
      case 'DONE':
        return loadingCompletedText;
      case 'LOADING':
        return (loadingText);
      default:
        return (notMoreText);
    }
  }, [loadingState, loadingCompletedText, loadingText, notMoreText]);

  return <div className="mt-waterfall-loadmore">{contentText}</div>;
}

loadMore.propTypes = {
  onLoad: PropTypes.func,
  loadingState: PropTypes.oneOf(['LOADING', 'NOTMORE', 'DONE']),
  loadingText: PropTypes.string,
  loadingCompletedText: PropTypes.string,
  notMoreText: PropTypes.string,
  disabled: PropTypes.bool,
};

loadMore.defaultProps = {
  onLoad: () => {},
  loadingState: 'DONE',
  loadingText: '努力加载中 · · ·',
  loadingCompletedText: '上拉加载更多信息',
  notMoreText: '我也是有底线的',
  disabled: false,
};

export default memo(loadMore);
