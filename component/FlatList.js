/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Data from './Data';
import ListItem from './ListItem';
//import styles from '../scanStyle';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.initData = Data;
    this.state = {
      data: this.initData,
    };
  }


  handleDeleteTask = (itemId) => {
    const newData = this.state.data.filter(item => itemId !== item.id);
    this.setState({data:newData});
  }
  render() {
    const header = () => {
      return(

      <View style={styles.header}>
        <Text style={styles.headerText}>List Header</Text>
      </View>
      )
    };
    return (
      <View>
        <FlatList
          ListHeaderComponent={header}
          data={this.state.data}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator}></View>
          )}
          contentContainerStyle={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}
          renderItem={({item, index}) => <ListItem item={item} index={index} handleDeleteTask={this.handleDeleteTask} />}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
  },
  header: {
    height: 60,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  itemSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});
