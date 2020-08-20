import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import Navigator from '../navigator';
import { 
  afterFn, 
  scrollTop, 
  SH 
} from './utils';
import boxHot from './box';

export default class Waterfall extends PureComponent {
  static propTypes = {
    navSource: PropTypes.array,
    navBackground: PropTypes.string,
    tabIndex: PropTypes.number,
    extraKey: PropTypes.string.isRequired,
    renderNavItem: PropTypes.func.isRequired,
    waterfallTemplate: PropTypes.func.isRequired,
    className: PropTypes.string,
    navClassName: PropTypes.string,
    loadingText: PropTypes.string,
    loadingCompletedText: PropTypes.string,
    notMoreText: PropTypes.string,
    showLoading: PropTypes.bool,
  }

  static defaultProps = {
    navSource: [],
    navBackground: undefined,
    tabIndex: 0,
    className: '',
    navClassName: '',
    loadingText: undefined,
    loadingCompletedText: undefined,
    notMoreText: undefined,
    showLoading: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      isFixed: false,
      indicator: props.tabIndex,
      minHeight: 0,
    };
    this.waterfallRef = createRef(null);
    this.isFixed = false;
    this.scrollTopAry = [];
    this.Box = boxHot(props.waterfallTemplate);
  }

  handleScroll = () => {
    const top = Math.floor(
      this.waterfallRef.current.getBoundingClientRect().top
    )
    if (top <= 0 && !this.isFixed) {
      this.isFixed = true;
      this.setState({ isFixed: true });
    } else if (top > 0 && this.isFixed) {
      this.isFixed = false;
      this.setState({ isFixed: false });
      this.scrollTopAry.length = 0;
    }
  }

  componentDidMount() {
    this.setState({ minHeight: SH })
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  handleTouchMove = () => {
    this.isTouchMove = true;
  }

  handleTouchEnd = (index) => {
    if (this.isTouchMove) {
      this.isTouchMove = false;
      return;
    }
    this.scrollTopAry[this.state.indicator] = scrollTop();
    this.setState({ indicator: index }, () => {
      // 如果 nav 没有吸顶的话不许用通过 scrollTo 滚动到指定位置
      if (!this.state.isFixed) return;
      
      if (this.scrollTopAry[index]) {
        this.onScrollTo(this.scrollTopAry[index]);
      } else {
        this.onScrollTo(this.waterfallRef.current.offsetTop);
      }
    });
  }

  // 滚动到指定位置
  onScrollTo = (pos) => {
    if (window.scrollTo) {
      window.scrollTo(0, pos);
    } else {
      document.documentElement.scrollTop = pos;
    }
  }

  render() {
    const {
      navSource,
      navBackground,
      tabIndex,
      extraKey,
      renderNavItem,
      className,
      navClassName,
      loadingText,
      loadingCompletedText,
      notMoreText,
      showLoading,
    } = this.props;
    const { indicator, isFixed, minHeight } = this.state;
    const WaterfallBox = this.Box;
    return (
      <div
        className={`mt-waterfall${className ? ` ${className}` : ''}`}
        ref={this.waterfallRef}
        style={{ minHeight }}
      >
        <Navigator
          className={`${isFixed ? 'fixed ' : ''}${navClassName ? `${navClassName}` : ''}`}
          background={navBackground}
          tabIndex={tabIndex}
        >
          {
            navSource.map((item, index) => {
              const child = renderNavItem(item, index);
              return React.cloneElement(child, {
                onTouchMove: afterFn(child.props.onTouchMove, this.handleTouchMove),
                onTouchEnd: afterFn(child.props.onTouchEnd, () => this.handleTouchEnd(index)),
              });
            })
          }
        </Navigator>
        {
          navSource.map((item, index) =>
            <WaterfallBox
              key={item[extraKey]}
              {...this.props}
              visible={index === indicator}
              navItem={item}
              loadingText={loadingText}
              loadingCompletedText={loadingCompletedText}
              notMoreText={notMoreText}
              showLoading={showLoading}
            />
          )
        }
      </div>
    );
  }
}
