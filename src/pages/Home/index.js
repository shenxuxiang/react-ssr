import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Container from '../../common/Container';
import * as actions from '../../actions/home';

const mapStateToProps = (state) => ({
  ...state.home,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch),
});

class Home extends PureComponent {
  static propTypes = {
    user_info: PropTypes.object,
    user_context: PropTypes.object,
  }
  
  static defaultProps = {
    user_info: {},
    user_context: {},
  }
  
  render () {
    const { user_info = {}, user_context = {} } = this.props;
    return (
      <div>
        <h1>hello world</h1>
        <p>
          <strong>user name:</strong>{user_info.name}
        </p>
        <p>
          <strong>user age:</strong>{user_info.age}
        </p>
        <p>
          <strong>user sex:</strong>{user_info.sex}
        </p>
        <p>
          <strong>user id:</strong>{user_info.id}
        </p>
        <h2>{user_context.text}</h2>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container(Home));

Home.getInitialProps = async (store) => {
  const user_info = store.dispatch(actions.getUserInfo());
  const user_context = store.dispatch(actions.getUserContext());
  const SEO = {
    title: 'home',
    description: 'home page',
    keywords: 'home page',
  }
  return {
    SEO,
    user_info: await user_info,
    user_context: await user_context,
  };
}