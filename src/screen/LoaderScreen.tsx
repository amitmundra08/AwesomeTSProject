import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { firebaseAuth } from '../environment/config';
import { strings } from '../constants';

interface Props {
    navigation: any
}

export default class LoaderScreen extends React.Component<Props> {
    componentDidMount() {
        firebaseAuth.onAuthStateChanged((user: any) => {
          this.props.navigation.navigate(user ? 'Home' : 'SignUp')
        })
    }
    render() {
    return (
        <View style={styles.container}>
            <Text>{strings.loading}</Text>
            <ActivityIndicator size="large" color='#44337A'/>
        </View>
    )}
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    }
})