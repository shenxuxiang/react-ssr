import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useReducer, reducer } from './useReducer';
import './index.less';

const initState = {
  contentWidth: 0,
  indicator: 0,
};

function Navigator(props) {
  const [state, dispatch] = useReducer(reducer, initState);
  const wrapperRef = useRef(null);
  const indicatorRef = useRef(0);

  const { contentWidth, indicator } = state;
  const { children, background, tabIndex, className } = props;

  useEffect(() => {
    const STACK_OFFSET = [];
    const SW = document.querySelector('.mt-navigator').clientWidth;
    const doc = document.querySelectorAll('.mt-navigator-wrapper-item') || [];
    let itemWidth = 0;
    let startX = 0;
    let startY = 0;
    let offsetX = 0;
    let slideX = 0;
    let slideY = 0;
    // true-表示点击行为；false-表示滑动行为
    let isClick = true;
    let slideStatus = 'slide';
    for (let i = 0; i < doc.length; i++) {
      itemWidth += doc[i].offsetWidth;
      STACK_OFFSET[i] = itemWidth;
    }
    // 最大的偏移量
    const MAX_OFFSET = itemWidth - SW > 0 ? itemWidth - SW : 0;
    dispatch(() => ({ contentWidth: itemWidth, indicator: tabIndex }));
    indicatorRef.current = tabIndex;

    computedPos(tabIndex);

    const handleTouchStart = (event) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      isClick = true;
      slideStatus = 'slide';
    };

    function handleTouchMove(event) {
      const { clientX, clientY } = event.changedTouches[0];
      slideX = clientX - startX;
      slideY = clientY - startY;
      if (Math.abs(slideX) >= Math.abs(slideY) && slideStatus === 'slide') {
        // 当横向滑动时，阻止默认行为和冒泡
        event.preventDefault();
        slideStatus = 'horizontal';
      } else if (Math.abs(slideX) < Math.abs(slideY) && slideStatus === 'slide') {
        slideStatus = 'vertical';
      }
      isClick = false;
      if (slideStatus === 'vertical') return;
      translateX(offsetX + slideX);
    }

    function handleTouchEnd(event) {
      offsetX += slideX;
      if (offsetX >= 0) {
        offsetX = 0;
      } else if (offsetX <= -MAX_OFFSET) {
        offsetX = -MAX_OFFSET;
      }
      if (isClick) {
        let { target } = event;
        while (target && !target.classList.contains('mt-navigator-wrapper-item')) {
          target = target.parentNode;
        }
        const index = +target.getAttribute('data-index');

        if (indicatorRef.current === index) return;
        dispatch(() => ({ indicator: index }));
        indicatorRef.current = index;

        computedPos(index);
      }
    }

    function computedPos(index) {
      // 元素相对可视区左边的距离
      const dist = STACK_OFFSET[index - 1] || 0;
      // 当前元素的 width
      const ow = STACK_OFFSET[index] - dist;
      // 屏幕一半的宽度
      const MW = SW / 2;

      if (dist < MW) {
        offsetX = 0;
      } else if (dist > MW && dist - MW + ow / 2 < MAX_OFFSET) {
        // 每次都移动到屏幕中间的位置
        offsetX = MW - dist - ow / 2;
      } else {
        offsetX = -MAX_OFFSET;
      }
      translateX(offsetX);
    }

    function translateX(x) {
      if (x >= 0) {
        x = 0;
      } else if (x <= -MAX_OFFSET) {
        x = -MAX_OFFSET;
      }
      wrapperRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
      wrapperRef.current.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
    }

    wrapperRef.current.addEventListener('touchstart', handleTouchStart, false);
    wrapperRef.current.addEventListener('touchmove', handleTouchMove, false);
    wrapperRef.current.addEventListener('touchend', handleTouchEnd, false);
    return () => {
      wrapperRef.current.removeEventListener('touchstart', handleTouchStart, false);
      wrapperRef.current.removeEventListener('touchmove', handleTouchMove, false);
      wrapperRef.current.removeEventListener('touchend', handleTouchEnd, false);
    };
  }, [children.length]);

  return (
    <div
      className={`mt-navigator${className ? ` ${className}` : ''}`}
      style={{ background }}
    >
      <div
        className="mt-navigator-wrapper"
        ref={wrapperRef}
        style={{
          width: contentWidth,
        }}
      >
        {
          children.map((child, idx) =>
            <div
              key={`nav-${idx}`}
              className="mt-navigator-wrapper-item"
              data-index={idx}
            >
              {
                React.cloneElement(child, {
                  className: `${idx === indicator ? 'active ' : ''}${child.props.className ? child.props.className : ''}`,
                })
              }
            </div>
          )
        }
      </div>
    </div>
  );
}

Navigator.propTypes = {
  children: PropTypes.array,
  background: PropTypes.string,
  tabIndex: PropTypes.number,
  className: PropTypes.string,
};

Navigator.defaultProps = {
  children: [],
  background: '#fff',
  tabIndex: 0,
  className: '',
};

export default memo(Navigator);
