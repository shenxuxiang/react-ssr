/**
 * 图片懒加载
 * @props className  { string } img 元素的 class
 * @props src        { string } img 元素的 src
 * @props defaultsrc { string } img 元素的 src（默认展示）
 * @props alt        { string } img 元素的 alt
 * @props container  { any }    被包含在哪个 DOM 节点（设置了overflow: auto / scroll）下
 * @props propName   { any }    其他可以设置在 img 元素上的 HTML 属性
 * */

import React, { memo, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import lazyImage from './lazyImage'
import defaultIMG from './default-bg.png';

Image.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  defaultsrc: PropTypes.string,
  className: PropTypes.string,
  container: PropTypes.any,
};

Image.defaultProps = {
  alt: '',
  defaultsrc: defaultIMG,
  className: '',
  container: __SERVER__ ? null : window,
};

function Image(props) {
  const imageRef = useRef(null);
  const { defaultsrc, src, container, alt } = props;
  const propsName = { ...props };

  delete propsName.defaultsrc;
  delete propsName.container;
  delete propsName.src;
  delete propsName.alt;

  useEffect(() => {
    if (!container) return;
    const lazy = lazyImage(container);
    lazy.add(imageRef.current, src);
    return () => {
      lazy.remove(imageRef.current);
    };
  }, [container]);

  return <img {...propsName} alt={alt} src={defaultsrc} ref={imageRef} />;
}

export default memo(Image)
