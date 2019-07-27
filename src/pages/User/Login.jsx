import React, { Component } from 'react';
import { connect } from 'dva';
// import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
// import Link from 'umi/link';
// import { Checkbox, Alert, Modal, Icon } from 'antd';
import { Alert } from 'antd';

import Vcode from 'react-vcode';
// import router from 'umi/router';
import Login from '@/components/Login';
import styles from './Login.less';
// import { getAuthority } from '@/utils/authority';
// import { getPageQuery } from '@/utils/utils';

const { Tab, UserName, Password, Submit, VerfyCode } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    imgVcode: '',
  };

  componentDidMount() {
    // if (getAuthority()) {
    //   // 判断是否登录了
    //   const urlParams = new URL(window.location.href);
    //   const params = getPageQuery();
    //   let { redirect } = params;
    //   if (redirect) {
    //     const redirectUrlParams = new URL(redirect);
    //     if (redirectUrlParams.origin === urlParams.origin) {
    //       redirect = redirect.substr(urlParams.origin.length);
    //       if (redirect.match(/^\/.*#/)) {
    //         redirect = redirect.substr(redirect.indexOf('#') + 1);
    //       }
    //     } else {
    //       redirect = null;
    //     }
    //   }
    //   router.push(redirect || '/');
    // }
  }

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  // 图片验证码
  changeVcode(imgVcode) {
    this.setState({
      imgVcode,
    });
  }

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { type, imgVcode } = this.state;

    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="账号登录">
            {
              login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              // this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials'}))
              this.renderMessage('app.login.message-invalid-credentials')
            }
            <UserName
              name="username"
              // placeholder={`${formatMessage({ id: 'app.login.userName' })}`}
              placeholder="app.login.userName"
              rules={[
                {
                  required: true,
                  // message: formatMessage({ id: 'validation.userName.required' }),
                  message: 'validation.userName.required',
                },
              ]}
            />
            <Password
              name="password"
              // placeholder={`${formatMessage({ id: 'app.login.password' })}`}
              placeholder="app.login.password"
              rules={[
                {
                  required: true,
                  // message: formatMessage({ id: 'validation.password.required' }),
                  message: 'validation.password.required',
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
            />
            <div>
              <div className={styles.yzm}>
                <VerfyCode
                  name="verfyCode"
                  rules={[
                    {
                      required: true,
                      pattern: imgVcode,
                      message: '请填写正确的验证码！',
                    },
                  ]}
                />
              </div>
              <div className={styles.code}>
                <Vcode
                  length={4}
                  width={120} // number  容器宽度(px)
                  height={38} // number  容器高度(px)
                  onChange={v => {
                    this.changeVcode(v);
                  }}
                  options={{
                    codes: [
                      // 所有可能出现的字符
                      'a',
                      'b',
                      'c',
                      'd',
                      'e',
                      'f',
                      'g',
                      'h',
                      'i',
                      'j',
                      'k',
                      'l',
                      'm',
                      'o',
                      'p',
                      'q',
                      'r',
                      's',
                      't',
                      'x',
                      'u',
                      'v',
                      'y',
                      'z',
                      'w',
                      'n',
                      '0',
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      '8',
                      '9',
                    ],
                    lines: 20, // 生成多少根干扰线
                    fontSizeMin: 18, // 字体尺寸最小值
                    fontSizeMax: 26, // 字体尺寸最大值
                  }}
                />
              </div>
            </div>
          </Tab>
          <Submit loading={submitting}>
            {
              /*
               <FormattedMessage id="app.login.login" />
              */
            }
            登录
          </Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
