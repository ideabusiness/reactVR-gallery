import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
    VrButton,
    Image
} from 'react-vr';

 class Thumbnails extends React.Component{
  constructor(props){
    super();
 }
  render(){ 
      
      return (
          <View style={{
          alignItems: 'center',
          flexDirection: 'row',
          margin: 0.0125,          
          width: 0.7,
        }}>
            <VrButton>
               <Image style={{
                        height:0.7,
                        width:0.7
                }}
               source={asset(this.props.imgurl)}
                />
            </VrButton>
          </View>
          
      )
  }
}

module.exports=Thumbnails;