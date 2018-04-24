import React from 'react';
import {
  Animated,
  asset,
  Image,
  View,
  VrButton,
  StyleSheet,
} from 'react-vr';

const Easing = require('Easing');
const VrSoundEffects = require('VrSoundEffects');

class Button extends React.Component {

  constructor(props) {
    super();

    this.state = {
      animatedTranslation: new Animated.Value(0),
    };
    this.style=StyleSheet.create({
         button: {
              width: 0.7,
              height: 0.7,
              borderRadius:0.02,
              borderWidth: 0.05,
              borderColor: '#808080'
           },
        activebutton:{
            borderColor: '#9f6060'
        }
      });
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

  onButtonClick = () => {
    this.props.onClick();
  }
 

  render () {
      const isActiveButton=this.props.activeindex==this.props.loopingindex?true:false;
      
    return (
      <Animated.View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          margin: 0.0125,
          transform: [
            {translateZ: this.state.animatedTranslation},
          ],
          width: 0.7,
        }}
      >
        <VrButton
          onClick={this.onButtonClick}
          onClickSound={this.props.onClickSound}
          onEnter={this.animateIn}
          onExit={this.animateOut}
        >
        
          <Image
            style={[this.style.button, isActiveButton && this.style.activebutton]}
            source={asset(this.props.src)}
          >
          </Image>
        </VrButton>
      </Animated.View>
    );
  }
};

module.exports = Button;