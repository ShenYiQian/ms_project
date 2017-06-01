import React from 'react';
import { Dimensions, Animated } from 'react-native';
import { registerApp } from 'react-native-wechat';
import { getStringForKey } from '../utils/SyncUtils';
import { requestBlob } from '../utils/RequestUtils';
import NavigationUtil from '../utils/NavigationUtil';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('../img/splash.jpg');

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1)
    };
    //registerApp('wxb24c445773822c79');
  }

  componentDidMount() {
    const { navigate } = this.props.navigation;
    Animated.timing(this.state.bounceValue, {
      toValue: 1.2,
      duration: 1000
    }).start();
    this.timer = setTimeout(async () => {
        try{
            let token = await getStringForKey('syq_mulit_site_token');
            if(token && token.length > 0) {
                let result = await requestBlob('auth/logintoken/', {
                    token
                });
                NavigationUtil.reset(this.props.navigation, 'Home');
            } else {
                navigate('Entrance', {viewState: 0});
            }
        } catch(e) {

        }
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <Animated.Image
        style={{
          width: maxWidth,
          height: maxHeight,
          transform: [{ scale: this.state.bounceValue }]
        }}
        source={splashImg}
      />
    );
  }
}

export default Splash;