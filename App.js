import React, { Component } from 'react';
import {
    ActivityIndicator,
    ListView,
    Text,
    View,
    Image,
    Button,
    TextInput,
} from 'react-native';

import StarWarsDataComponent from './components/StarWarsDataComponent.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      url: 'https://swapi.co/api/people?page=1',
      next: '',
      prev: '',
      pageNumber: '',
      page: 1,
    }
  }

  componentDidMount() {
    return this.fetchData()
  }

  nextUrl() {
      if(this.state.page >= this.state.pageNumber) {
          return;
      }
      this.setState({
          isLoading: true,
          url: this.state.next,
          page: this.state.page+1,
      }, this.fetchData)
  }

  prevUrl() {
      if(this.state.page <= 1) {
          return;
      }

      this.setState({
          isLoading: true,
          url: this.state.previous,
          page: this.state.page-1,
      }, this.fetchData)
  }

  setPage(page) {
      if(page > this.state.pageNumber || page < 1) {
          return;
      }
      this.setState({
          isLoading: true,
          page: parseInt(page),
          url: `https://swapi.co/api/people/?page=${page}`,
      }, this.fetchData)
  }

  fetchData() {
      return fetch(this.state.url)
        .then((response) => response.json())
        .then((responseJson) => {
          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson.results),
            next: responseJson.next,
            previous: responseJson.previous,
            pageNumber: parseInt(responseJson.count / 10 + 1)
          }, function() {
            // do something with new state
          });
        })
        .catch((error) => {
          console.error(error);
        });
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 20}}>
          <View style={{ alignItems: 'center', paddingBottom: 20}}>
              <Image
                  source={{uri: 'http://weclipart.com/gimg/E2B73EDAF9EE7F6E/eTMAX7roc.gif'}}
                  style={{width: 300, height: 141}}
                  />
          </View>
          { this.state.isLoading && <ActivityIndicator /> }
          { !this.state.isLoading &&
              <StarWarsDataComponent
                  state={this.state}
                  setPage={this.setPage.bind(this)}
                  prevUrl={this.prevUrl.bind(this)}
                  nextUrl={this.nextUrl.bind(this)}
              /> }
      </View>
    );
  }
}
