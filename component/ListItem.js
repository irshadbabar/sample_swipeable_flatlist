import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  UIManager,
  LayoutAnimation,
  Alert,
  TouchableHighlight,
} from 'react-native';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetResponder: () => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        const {dx, dy} = gestureState;
        if (dx > 5 || dx < -5 || dy > 10 || dy < -10) {
          return true;
        } else {
          return false;
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        this.onMoveX(gestureState.dx);
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.onPanResponderRelease(gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.onPanResponderRelease(gestureState);
      },
    });
  }

  onMoveX = (dx) => {
    this.refs['task'].setNativeProps({style: {transform: [{translateX: dx}]}});
  };

  onPanResponderRelease = (gestureState) => {
    if (Math.abs(gestureState.dx) < Dimensions.get('window').width / 2) {
      this.refs['task'].setNativeProps({style: {transform: [{translateX: 0}]}});
    }
    if (Math.abs(gestureState.dx) >= Dimensions.get('window').width / 2) {
        LayoutAnimation.configureNext(LayoutAnimation.create(500,'easeInEaseOut','opacity'));
      this.refs['task'].setNativeProps({
        style: {transform: [{translateX: Dimensions.get('window').width}]},
      });
      this.props.handleDeleteTask(this.props.item.id);
    }
  };


  onClick = (number) =>{
    console.log('Hello You Clicked me '+number);
    Alert.alert('Hello You Clicked me '+number);
  }
  render() {
    return (
      //<TouchableHighlight onPress={() => this.onClick(this.props.item.id)} underlayColor="white">
      <View>
        <View style={styles.absolute}>
          <Text style={[styles.textBold, {marginHorizontal: 10}]}> Delete</Text>
          <Text style={[styles.textBold, {marginHorizontal: 10}]}> Delete</Text>
        </View>
        <Animated.View  ref="task" style={styles.item}  {...this.PanResponder.panHandlers}>

         <View style={styles.itemContactMessage}>
           <Text  style={styles.textContact}>{"Irshad Babar"}</Text>
           <Text  style={styles.textMessage}>{"Hello Irshad, How are you?"}</Text>
         </View>

        <View style={styles.itemDateTime}>
          <Text  style={styles.textDate}>{"08-Jul-2016"}</Text>
          <Text  style={styles.textTime}>{"05:09 PM"}</Text>
        </View>
         
         
          
        </Animated.View>
      </View>
      //</TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({

  item:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    justifyContent:'space-between'
  },
  itemContactMessage: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  itemDateTime:{
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  absolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  textContact: {
    marginVertical: 10,
    marginHorizontal: 10,
    
    fontSize: 18,
    fontWeight:'600',
    marginLeft: 10,
    
  },
  textMessage: {
    marginVertical: 5,
    marginHorizontal: 5,
    fontSize: 14,
    fontWeight: '100',
    marginLeft: 10,
    
  },
  textDate: {
    marginVertical: 5,
    marginHorizontal: 5,
    fontSize: 14,
    fontWeight: '100',
    marginLeft: 10,
    
  },
  textTime: {
    marginVertical: 5,
    marginHorizontal: 5,
    fontSize: 14,
    fontWeight: '100',
    marginLeft: 10,
    
  },
  text: {
    marginVertical: 5,
    marginHorizontal: 5,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    
  },
  menu: {
    width: 20,
    height: 2,
    backgroundColor: 'silver',
    margin: 2,
    marginHorizontal: 10,
    borderRadius: 3,
  },
});
