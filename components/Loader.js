import React from 'react';
import {
  Animated,
  asset,
  Image,
  View,
  VrButton,
} from 'react-vr';

const Easing = require('Easing');

class Loader extends React.Component {

  constructor(props) {
    super();
      this.state={
          animatedTranslation: new Animated.Value(0)
      }

  }

  animateIn = () => {
    Animated.timing(
      this.state.animatedTranslation,
      {
        toValue: 0.125,
        duration: 100,
        easing: Easing.in,
      }
    ).start();
  }

  animateOut = () => {
    Animated.timing(
      this.state.animatedTranslation,
      {
        toValue: 0,
        duration: 100,
        easing: Easing.in,
      }
    ).start();
  }


  render () {
    return (
      <View
         style={{ 
         position:'absolute',
         transform:[{
          translate:[0,0,-2],
          rotate:'110deg'
          }
         ]
        }}>
      
        <Image source={asset(this.props.imgurl)} 
               style={{
                        width:0.2,
                        height:0.2
                         }}
            />
      </View>
    );
  }
};

module.exports = Loader;