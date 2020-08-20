import React, { PureComponent, Fragment } from 'react';
import Helmet from 'react-helmet';
import { isEmpty } from '../utils';

const SEO = {
  title: '',
  description: '',
  keywords: '',
};

export default function Conatiner(Page) {
  return class Conatiner extends PureComponent {
    static getInitialProps = async (store) => {
      let data = {};
      if (typeof Page.getInitialProps === 'function') {
        data = await Page.getInitialProps(store);
      }

      return {
        SEO,
        ...data,
      }
    }

    constructor(props) {
      super();
      this.state = {}
      if (__SERVER__) {
        // 这部分是在服务端运行的，不会在 browser 内执行
        this.state = {...props.staticContext};
      } else if (window.INIT_DATA) {
        // 这部分是在 browser 内执行
        this.state = {...window.INIT_DATA};
        window.INIT_DATA = null;
      }
    }

    componentDidMount() {
      if (isEmpty(this.state)) {
        Page.getInitialProps(window.__STORE__)
          .then(response => this.setState({ ...response }))
          .catch(error => console.log(error));
      }
    }
    
    render() {
      const { SEO = {} } = this.state;
      return (
        <Fragment>
          <Helmet>
            <title>{SEO.title}</title>
            <meta name="keywords" content={SEO.keywords} />
            <meta name="description" content={SEO.description} />
          </Helmet>
          <Page {...this.state} {...this.props} />
        </Fragment>
      );
    }
  }
}
