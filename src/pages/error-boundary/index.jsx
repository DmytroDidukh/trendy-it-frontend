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
          <img
            src='https://res.cloudinary.com/d-didukh/image/upload/v1601886392/trendy-it/Asset_4_jzjeur.png'
            alt='error'
          />
          <h4>Щось пішло не так...</h4>
          <button
            className={'basic-button'}
            onClick={() => this.onBackHome(this.props)}
          >
            На головну
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const mapDispatchToProps = () => ({});

export default connect(mapDispatchToProps)(ErrorBoundary);
