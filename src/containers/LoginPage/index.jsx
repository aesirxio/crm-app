/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import SimpleReactValidator from 'simple-react-validator';

import './index.scss';

import { login } from '../../auth';
// import ComponentImage from 'components/ComponentImage';
import { SSOButton } from 'aesirx-sso';
import { AesirxAuthenticationApiService, Storage } from 'aesirx-lib';
import { env } from 'env';
import ComponentImage from 'components/ComponentImage';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: env.REACT_APP_DEMO_USER ?? '',
      password: env.REACT_APP_DEMO_PASSWORD ?? '',
      remember: false,
      isProcessing: false,
    };

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.usernameInput = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit() {
    if (this.validator.allValid()) {
      await login(this.state);
    } else {
      this.validator.showMessages();
      return;
    }
  }

  onKeyPress = (e) => {
    if (e.which === 13) {
      this.handleSubmit();
    }
  };

  render() {
    const { t } = this.props;
    const onGetData = async (response) => {
      const authService = new AesirxAuthenticationApiService();
      await authService.setTokenUser(response, false);
      Storage.setItem('auth', true);
      window.location.reload();
    };
    return (
      <div className="vh-100 bg-blue-9 position-relative">
        <div className="position-absolute bottom-0 start-0">
          <ComponentImage
            className="w-100 h-100 object-cover"
            alt={'bg-login'}
            src={'assets/images/login-bg.png'}
          />
        </div>
        <div className="row justify-content-center align-items-center h-100 bg-white">
          <div className="col-md-6 col-xxl-4">
            <div className="d-block p-2 p-lg-5">
              <h1 className="fs-2 text-blue-0 fw-semibold text-center mb-24 lh-base">
                {t('txt_login_text_1')}
                <img
                  className="px-1"
                  style={{ verticalAlign: 'inherit' }}
                  alt="aesirx"
                  src="/assets/images/logo/welcome-logo.png"
                />
                {t('txt_crm')}.
                <br /> {t('txt_login_text_2')}
              </h1>
              <form className="login-form">
                <SSOButton
                  className="btn w-100 fw-bold btn-blue-3 position-relative d-flex align-item-center justify-content-center mb-24 px-6 btn-small"
                  text={t('txt_sign_in_with_sso')}
                  onGetData={onGetData}
                  demoUser={env.REACT_APP_DEMO_USER ?? ''}
                  demoPassword={env.REACT_APP_DEMO_PASSWORD ?? ''}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(LoginPage);
