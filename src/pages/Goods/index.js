import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Waterfall from '../../components/waterfall';
import GoodsList from '../../components/GoodsList';
import * as actions from '../../actions/goods';
import Container from '../../common/Container';
import './index.less';

const mapStateToProps = (state) => ({
  ...state.goods,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch),
});

class Goods extends PureComponent {
  static defaultProps = {
    nav_list: {},
  }

  constructor() {
    super();
    this.state = {};
  }

  renderNavItem = (item) => {
    return (
      <div
        key={item.value}
        className="goods-page-nav-item-x"
      >
        {item.label}
      </div>
    );
  }

  render() {
    const { nav_list = {} } = this.props;
    return (
      <div className="goods-page">
        <Waterfall
          renderNavItem={this.renderNavItem}
          navSource={nav_list.items || []}
          waterfallTemplate={GoodsList}
          extraKey="value"
          tabIndex={0}
          navBackground='#fff'
          className="goods-page-waterfall"
          navClassName="goods-page-nav"
          getGoodsList={this.props.getGoodsList}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container(Goods));

Goods.getInitialProps = async function(store) {
  const { dispatch } = store;
  const navListPromise = dispatch(actions.getNavList());
  return {
    nav_list: await navListPromise,
    SEO: {
      title:'goods',
      keywords:'前端技术江湖 goods',
      description:'前端技术江湖 goods page',
    },
  };
}