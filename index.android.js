/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

var REQUEST_URL = "http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=WegsXOcxa4Y8sasrlKgBnIix";

import { Button, Card } from 'react-native-material-design';

class weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results[0].index),
          loaded: true,
        });
      })
      .done()
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderWeather}
      />
    );
  }

  renderLoadingView() {
    return (
      <View>
        <Text>Loading weather...</Text>
      </View>
    );
  }

  renderWeather(city) {
    return (
      <View>
        <Card>
          <Card.Body>
            <Text>{ city.des }</Text>
          </Card.Body>
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('weather', () => weather);
