import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import './style.scss';

class ErrorBoundary extends React.Component {
  state = {
    hasError: this.props.error || false
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  onBackHome(props) {
    props.dispatch(push('/'));
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={'error-boundary'}>
          <h2>GG WP</h2>
          <button
            className={'basic-button'}
            onClick={() => this.onBackHome(this.props)}
          >
            на головну
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const mapDispatchToProps = () => ({});

export default connect(mapDispatchToProps)(ErrorBoundary);
