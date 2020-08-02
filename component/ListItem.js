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
        if (dx > 2 || dx < -2 || dy > 5 || dy < -5) {
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
        LayoutAnimation.configureNext(LayoutAnimation.create(2000,'easeInEaseOut','opacity'));
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
      <TouchableHighlight onPress={() => this.onClick(this.props.item.id)} underlayColor="white">
      <View>
        <View style={styles.absolute}>
          <Text style={[styles.textBold, {marginHorizontal: 10}]}> Delete</Text>
          <Text style={[styles.textBold, {marginHorizontal: 10}]}> Delete</Text>
        </View>
        <Animated.View  ref="task" style={styles.item} {...this.PanResponder.panHandlers}>
          <Text  style={[styles.text, {flex: 1}]}>{this.props.item.text}</Text>
          <TouchableOpacity>
            <View style={styles.menu}></View>
            <View style={styles.menu}></View>
            <View style={styles.menu}></View>
          </TouchableOpacity>
        </Animated.View>
      </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
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
  text: {
    marginVertical: 20,
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
