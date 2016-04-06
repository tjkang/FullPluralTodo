import React from 'react-native';

const {
  View,
  Text,
  TouchableHighlight,
  Image,
} = React;

const localStyle = React.StyleSheet.create({
  doneButton: {
    borderRadius: 5,
    padding: 5,
  },
});

export default function render(styles) {
  return (
    <View style={styles.container}>
        <Text
          style={styles.label}
        >andr: {this.props.todo.task}</Text>

      <TouchableHighlight
        onPress={this.onDonePressed.bind(this)}
        style={localStyle.doneButton}
        underlayColor="#ddd"
      >
        <Image
          source={require('../images/done.png')}
        />
      </TouchableHighlight>
    </View>
  );
}
