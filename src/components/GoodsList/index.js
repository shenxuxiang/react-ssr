import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Image from '../lazy-image';
import './index.less';

export default class GoodsList extends PureComponent {
  static propTypes = {
    navItem: PropTypes.object,
    loadingState: PropTypes.oneOf([
      'LOADING',
      'DONE',
      'NOTMORE',
    ]),
    onLoadEnd: PropTypes.func,
    visible: PropTypes.bool,
  }
 
  static defaultProps = {
    navItem: {},
    loadingState: 'DONE',
    onLoadEnd: () => {},
    visible: false,
  }
 
  constructor(props) {
    super(props);
    this.state = {
      source: [],
    }
    this.offset = 0;
  }
 
  componentDidMount() {
    if (this.props.visible && this.state.source.length <= 0) {
      // 如果当前这个类目的 GoodsList 是显示的，且 goodslist 是空的
      // 就可以调用 onLoadEnd 回调函数，修改父组件的 loadingState
      // 回调函数接受的 value 是 string 类型；只有三个值： DONE、LOADING、NOTMORE
      // 当父组件执行 onLoadEnd 完成后，就会触发当前组件的 WillReceiveProps 
      this.props.onLoadEnd('LOADING');
    }
  }
 
  UNSAFE_componentWillReceiveProps (nextProps) {
    if (
      nextProps.loadingState === 'LOADING' && 
      nextProps.loadingState !== this.props.loadingState
    ) {
      // 如果父组件的 loadingState 由其他值转变成 LOADING 的话
      // 我们可以理解为组件正在进行加载
      // 每当数据加载完成后，都需要调用一下 props.onLoadEnd('DONE') 或 props.onLoadEnd('NOTMORE'); 
      // 通知父组件加载完成了
      this.handleLoadMore();
    }
 
    if (
      nextProps.visible &&
      !this.props.visible &&
      this.state.source.length <= 0
    ) {
      this.props.onLoadEnd('LOADING');
    }
  }
 
  handleLoadMore = () => {
    this.props.getGoodsList({ offset: this.offset })
      .then(data => {
        this.setState(prevState => ({ source: prevState.source.concat(...data.items)}));
 
        this.offset = data.offset;
        if (!data.offset || data.items.length <= 0) {
          this.props.onLoadEnd('NOTMORE');
        } else {
          this.props.onLoadEnd('DONE');
        }
      })
      .catch(() => {
        this.props.onLoadEnd('DONE');
      });
  }
 
  render() {
    const { source } = this.state;
    return (
      <ul className="mt-goods-list">
        {
          source.map(item =>
            <li className="mt-goods-list-item" key={item.goods_id}>
              <Image 
                src={item.url}
                alt="商品图片"
                className="mt-goods-list-item-avator"
              />
              <div className="mt-goods-list-item-name">{item.name}</div>
              <div className="mt-goods-list-item-price">{(item.price / 100 || 0).toFixed(2)}</div>
              <div className="mt-goods-list-item-button">去抢购</div>
            </li>
          )
        }
      </ul>
    );
  }
}