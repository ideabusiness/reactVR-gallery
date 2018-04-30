import React from 'react';
import {
  AppRegistry,
  Animated,
  View,
  Pano,
  asset,
  Image,
  StyleSheet,
  Text
} from 'react-vr';



import Button from './components/Button';
import Loader from './components/Loader';
import Popup from './components/Popup';

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
      opacity:new Animated.Value(0),
     
      loopingIndex:0,
      onHoverindex:-1,
    };
    this.style=StyleSheet.create({
         sideBar: {
              
              flexWrap: 'wrap',              
              transform: [
                  
                  {translate: [-1.25, -0.75, -3]},
               ],
             width: 5,
             position:'relative'
           },
        desktopSideBar:{
            flexDirection: 'row',
        },
        mobileSideBar:{
            flexDirection: 'column',
        },
        outerwrapper:{
            flexDirection:'column',
            alignItems: 'center',
            height:2,
            transform:[
                {
                    translate:[0,-.5,0]
                }
            ]
        }
        
      });
  }
componentDidMount(){
    fetch(asset(this.state.jsonFile).uri).then((response)=>response.json())
        . then((responsedata)=>{
            this.setState({config:responsedata.photos})
       }).done();
    
}


  render() {
      const imgData=this.state.config?this.state.config:[];
      const imgObj=imgData.length>0?imgData[this.state.activeindex].uribig:'';
      let isLoading=this.state.activeindex!=this.state.previousIndex?true:false;
      let hovertext=imgData.length>0?imgData[this.state.loopingIndex].headingtext:'';
      let descriptiontext=imgData.length>0?imgData[this.state.loopingIndex].dscrpttext:'';
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
            onHoverindex={this.state.onHoverindex}
            buttonData={button}
            onEnter={()=>{
                     this.setState({loopingIndex:index,onHoverindex:index});
                    }}
           onExit={()=>{
                     this.setState({onHoverindex:-1});
                    }}
          />
      );

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
      
        <View style={this.style.outerwrapper}>
           
        <View
        style={[this.style.sideBar,this.style.desktopSideBar]}
      >
       
        {buttons}
        
      </View>
      </View>
    </View>
    );
  }
};
AppRegistry.registerComponent('GalleryExample', () => GalleryExample);
