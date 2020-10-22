/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import SectionListContacts from 'react-native-sectionlist-contacts';
import ContactList from './src/mockData/ContactList';

const App = () => {
  const [data, setData] = useState(ContactList);
  const [text, setText] = useState("");

  renderItem = (item) => {
    return (
      <View>
        <View style={styles.itemContainer}>
          <View style={styles.itemAcronymContainer}>
            <Text style={styles.itemAcronymText}>{item.acronym}</Text>
          </View>
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemPrimaryText}>{item.name}</Text>
            <Text style={styles.itemSecondaryText}>{item.owner}</Text>
          </View>
        </View>
        <View style={styles.itemSeparator} />
      </View>
    )
  }

  inputOnChangeText = value => {
    setText(value);

    const list = ContactList.filter((item) => {
      return item.name.toLowerCase().includes(value.trim().toLowerCase());
    });

    setData(list);
  }

  renderHeader = () => {
    return (
      <TextInput
        onChangeText={(value) => inputOnChangeText(value)}
        value={text}
        placeholder={'Search'}
        style={styles.searchHeader}
      />
    )
  }

  renderSectionHeader = (params) => {
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeader}>{params.key}</Text>
      </View>
    )
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        <SectionListContacts
          sectionListData={data}
          renderItem={renderItem}
          letterTextStyle={{ color: 'green', fontWeight: '700' }}
          renderHeader={renderSectionHeader}
          onScroll={Keyboard.dismiss}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    height: 40,
    backgroundColor: '#E0E0E0',
    margin: 32,
    borderRadius: 5,
    paddingLeft: 16,
  },
  sectionHeaderContainer: {
    backgroundColor: '#E0E0E0',
  },
  sectionHeader: {
    fontWeight: '900',
    paddingVertical: 4,
    paddingLeft: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 16,
  },
  itemAcronymContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemAcronymText: {
    color: 'white',
    fontWeight: '500',
  },
  itemTextContainer: {
    flexDirection: 'column',
    paddingLeft: 16
  },
  itemPrimaryText: {
    fontWeight: '500',
    fontSize: 20,
  },
  itemSecondaryText: {
    fontSize: 14,
    paddingTop: 8,
  },
  itemSeparator: {
    backgroundColor: '#E0E0E0',
    height: 1,
  },
});

export default App;
