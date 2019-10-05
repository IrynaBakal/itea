import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Feedback from './feedback/feedback.component';

class App extends React.Component {
  constructor (props) {
    console.log('[App] props', props);
    super(props);
  }

  componentDidMount() {
    console.log('[App] --- componentDidMount ---');
  }

  onSend = () => {
    console.log('onSend from App.js');
  };


  render(){
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: 'bold', fontSize: 10 }}>Murtttrmur</Text>
        <Feedback
          inputValue={'dfsfsfsfs'}
          onPressHandler={this.onSend}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;