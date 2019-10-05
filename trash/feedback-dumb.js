import React from 'react';
import { View, StyleSheet, TextInput, Text,  Button, Alert, Image } from 'react-native';
import PropTypes from 'prop-types';

const imgSizes = { width: 100, height: 100 };

const Separator = () => {
  return (<View style={feedbackStyles.separator} />);
};

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    const { inputValue, name } = this.props;
    this.state = {
      inputValue,
      name,
      lastName: 'lastName'
    };
    this.history = [];
    console.log('props', props);
    console.log('state', this.state);
    console.log('--- CONSTRUCTOR ---');
  }

  UNSAFE_componentWillMount() {
    console.log('--- componentWillMount ---');
  }

  componentDidMount() {
    console.log('--- componentDidMount ---');

    // setTimeout(() => {
    //   this.setState({
    //     name: 'Iryna',
    //     inputValue: 'inputValueinput'
    //   });
    //   console.log('timeout');
    // }, 3000);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('[shouldComponentUpdate]    nextProps', nextProps, 'nextState', nextState);
    console.log('cond name', !!nextState.name, nextState.name.length);
    // ban user to change firstName to empty string or whitespaces
    if (!nextState.name  ||
      nextState.name && nextState.name.trim().length === 0) {
      console.log('not valid case');
      return false;
    }
    return true;

  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    //WORKS AFTER RENDER

    console.log('[getSnapshotBeforeUpdate]  prevProps ***', prevProps, 'prevState **', prevState);
    this.history.push(prevState.inputValue);
    return { ororo: '___' };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //WORKS AFTER getSnapshotBeforeUpdate

    // console.log('+++ componentDidUpdate +++', prevProps, prevState, snapshot);
    console.log('[componentDidUpdate] this.history', this.history);
  }

  _onChangeInput = (text) => {
    this.setState({ name: text });
  };

  _onChangeFeedback = (text) => {
    this.setState({ inputValue: text });
  };

  render() {
    const { inputValue, name } = this.state;
    console.log('--- RENDER ---');
    return (
      <View style={feedbackStyles.container}>
        <View style={feedbackStyles.imageContainer}>
          <Image
            source={require('../assets/a10.jpg')}
            style={[imgSizes, { marginBottom: 30 }]}
          />
          <Image
            source={{ uri: 'https://dynamic.brandcrowd.com/asset/logo/4c8f8b36-51b9-4ebf-b20c-00e5c25719c3/logo?v=4&text=Logo+Text+Here'}}
            style={[imgSizes, { marginBottom: 30 }]}
          />
        </View>
        <Text>Type your Feedback here!</Text>
        <TextInput
          style={feedbackStyles.smallInputField}
          onChangeText={this._onChangeInput}
          placeholder={'enter smth'}
          value={name}
        />
        <View style={{height: 140}}>
          <TextInput
            multiline
            style={feedbackStyles.inputField}
            onChangeText={this._onChangeFeedback}
            placeholder={'value'}
            value={inputValue}
          />
        </View>
        <Text>{inputValue}</Text>
        <Separator/>
        <View style={feedbackStyles.buttonsContainer}>
          <Button
            title={'Feedback'}
            color={'blue'}
            onPress={() => Alert.alert('Congratulations!', inputValue)}
          />
          <Button
            title={'Reset'}
            color={'gray'}
            disabled
            // style={feedbackStyles.button}
          />
        </View>
        { this.history.map((val, key) => {
          return <Text key={key}>{val}</Text>
        }) }
      </View>
    );
  }
}

const feedbackStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
  inputField: {
    padding: 10,
    // height: 140,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 12,
    textAlignVertical: 'top',
    flex: 1
  },
  smallInputField: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 12,
    textAlignVertical: 'top',
  },
  button: {
    width: 100,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: 'black'
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  imageContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  separator: {
    backgroundColor: 'grey',
    height: 1,
    width: '100%'
  }
});

Feedback.propTypes = {
  name: PropTypes.string,
};

Feedback.defaultProps = {
  name: 'default name'
};

export default Feedback;