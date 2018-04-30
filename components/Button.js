import React from 'react';
import {
  Animated,
  asset,
  Image,
  View,
  VrButton,
  StyleSheet,
Text,
Plane
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
              width: 0.3,
              height: 0.3,
              borderRadius:0.02,
              borderWidth: 0.02,
              borderColor: '#808080'
           },
        activebutton:{
            borderColor: '#9f6060'
        },
        textField:{
            position:'absolute',
            width:2,
            height:.75,
            backgroundColor:'white',
            paddingLeft:.1,
            paddingRight:.1, 
            display:'none',
            transform:[
                {
                    translate:[-.50,.75,0]
                }
            ]
           },
        textstyleHeading:{
            color:'red',
            textAlign:'center',
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
            textDecorationColor: '#000',
            
        },
        textstylecontent:{
            color:'#000',
            textAlign:'left',
            
        },
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
    this.props.onEnter();
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
    this.props.onExit();
  }

  onButtonClick = () => {
    this.props.onClick();
  }
 

  render () {
      const isActiveButton=this.props.activeindex==this.props.loopingindex?true:false;
      const ishoveredIndex=this.props.onHoverindex==this.props.loopingindex?true:false;
    return (
      <Animated.View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          margin: 0.0125,
          transform: [
            {translateZ: this.state.animatedTranslation},
          ],
          width: 0.3,
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
        <View
            style={[this.style.textField,ishoveredIndex && {display:'flex'}]}>
             <Text style={this.style.textstyleHeading}>{this.props.buttonData.headingtext}</Text>
             <Text style={this.style.textstylecontent} numberOfLines={5}>{this.props.buttonData.dscrpttext}</Text>
         </View>
      </Animated.View>
    );
  }
};

module.exports = Button;