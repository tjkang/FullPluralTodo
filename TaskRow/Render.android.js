import React from 'react-native';

const {
  View,
  Text,
  TouchableHighlight,
} = React;

export default function render(styles) {
  return (
    <View style={styles.container}>
        <Text
          style={styles.label}
        >andr: {this.props.todo.task}</Text>

      <TouchableHighlight
        onPress={this.onDonePressed.bind(this)}
        style={styles.doneButton}
      >
        <Text>Done</Text>
      </TouchableHighlight>
    </View>
  );
}
