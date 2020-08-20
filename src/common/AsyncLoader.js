import React, { PureComponent } from 'react';
import Loading from '../components/Loading';

export default function(loader) {
  return class extends PureComponent {
    static import = async () => {
      return await loader();
    }
    
    state = {
      Comp: null,
    }

    componentDidMount() {
      loader()
        .then(response => this.setState({ Comp: response.default }));
    }

    render() {
      const { Comp } = this.state;
      return Comp ? <Comp {...this.props} /> : <Loading />
    }
  }
}