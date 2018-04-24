import React from 'react';
import {
  AppRegistry,
  Animated,
  View,
  Pano,
  asset,
  Image,
  StyleSheet
} from 'react-vr';



import Button from './components/Button';
import Loader from './components/Loader';

const VrSoundEffects = require('VrSoundEffects');
const Easing = require('Easing');

export default class GalleryExample extends React.Component {
  constructor(props) {
    super();
    this.state = {  
      activeindex:0,
      previousIndex:-1,      
      loaderUrl:'loading.gif',
      EnterSound:'onEnterSound.ogg',
      jsonFile:'hotelDataMini.json',
      rotateZ:new Animated.Value(0)
    };
    this.style=StyleSheet.create({
         sideBar: {
              
              flexWrap: 'wrap',              
              transform: [
                  {rotateX: -8},
                  {translate: [-2, 0, -3]},
               ],
             width: 5,
           },
        desktopSideBar:{
            flexDirection: 'row',
        },
        mobileSideBar:{
            flexDirection: 'column',
        }
      });
  }
componentDidMount(){
    fetch(asset(this.state.jsonFile).uri).then((response)=>response.json())
        . then((responsedata)=>{
            this.setState({config:responsedata.photos})
       }).done();
    
}

initializeRotate(){
    Animated.timing(
        this.state.rotateZ,{
        toValue:100,
        duration:100,
        easing:Easing.in
        }).start();
}
  render() {
      const imgData=this.state.config?this.state.config:[];
      const imgObj=imgData.length>0?imgData[this.state.activeindex].uribig:'';
      let isLoading=this.state.activeindex!=this.state.previousIndex?true:false;
      const buttons = imgData.map((button,index) =>
          <Button
            key={index}
            onClick={()=>{
              this.setState({activeindex:index});
            }}
            onClickSound={asset(this.state.EnterSound)}
            src={button.urismall}
            activeindex={this.state.activeindex}
            loopingindex={index}
          />
      );
   const isSmallDevice=window.innerWidth<770?true:false;
 console.log(isSmallDevice);
    return (
      <View>
        {isLoading&&
          <Loader imgurl={this.state.loaderUrl}/>
        }
        <Pano source={asset(imgObj)} style={{
                                            position:'absolute'
                                           }} onLoad={()=>{
                                              this.setState({
                                                  previousIndex:this.state.activeindex
                                                 });
                                            } }/>
    
        <View
        style={[this.style.sideBar,isSmallDevice && this.style.mobileSideBar,!isSmallDevice && this.style.desktopSideBar]}
      >
        {buttons}
      </View>
    </View>
    );
  }
};
AppRegistry.registerComponent('GalleryExample', () => GalleryExample);
