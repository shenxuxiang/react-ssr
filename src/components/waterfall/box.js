import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LoadMore from './load-more';
import Loading from './loading';
import './index.less';

export default function (Comp) {
  return class extends PureComponent {
    static propTypes = {
      visible: PropTypes.bool,
      loadingText: PropTypes.string,
      loadingCompletedText: PropTypes.string,
      notMoreText: PropTypes.string,
      showLoading: PropTypes.bool,
    }

    static defaultProps = {
      visible: false,
      loadingText: undefined,
      loadingCompletedText: undefined,
      notMoreText: undefined,
      showLoading: true,
    }

    constructor() {
      super();
      this.state = {
        loadingState: 'DONE',
        isFirstLoad: true,
        mockList: [1, 2, 3, 4, 5, 6],
      };
    }

    handleLoadStart = () => {
      this.setState({ loadingState: 'LOADING' });
    }

    handleLoadEnd = (status) => {
      if (status === 'DONE' || status === 'NOTMORE' || status === 'LOADING') {
        if (status !== 'LOADING' && this.state.isFirstLoad) {
          this.setState({ loadingState: status, isFirstLoad: false });
        } else {
          this.setState({ loadingState: status });
        }
      } else {
        throw Error('expected one of ["NOTMORE","DONE"]');
      }
    }

    render() {
      const { visible, loadingText, loadingCompletedText, notMoreText, showLoading } = this.props;
      const { loadingState, isFirstLoad, mockList } = this.state;
      return (
        <div
          className="mt-waterfall-wrapper-box"
          style={{ display: visible ? 'block' : 'none' }}
        >
          <Comp
            {...this.props} // disabled eslint of line
            loadingState={loadingState}
            onLoadEnd={this.handleLoadEnd}
          />
          {
            isFirstLoad &&
              <ul className="mt-waterfall-mock-list">
                {
                  mockList.map((item) =>
                    <li className="mt-waterfall-mock-list-item" key={item}>
                      <div className="mt-waterfall-mock-list-item-1" />
                      <div className="mt-waterfall-mock-list-item-2" />
                      <div className="mt-waterfall-mock-list-item-3" />
                      <div className="mt-waterfall-mock-list-item-4" />
                    </li>
                  )
                }
              </ul>
          }
          {
            !isFirstLoad &&
              <LoadMore
                onLoad={this.handleLoadStart}
                loadingState={loadingState}
                loadingText={loadingText}
                loadingCompletedText={loadingCompletedText}
                notMoreText={notMoreText}
                disabled={!visible}
              />
          }
          {
            showLoading && isFirstLoad && loadingState === 'LOADING' ? <Loading delay={2000} /> : null
          }
        </div>
      );
    }
  };
}
