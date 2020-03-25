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
          this.props.navigation.navigate(user ? 'Home' : 'Login')
        })
    }
    render() {
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20, marginVertical: 16}}>{strings.loading}</Text>
            <Text style={{fontSize: 16, marginBottom: 8,color: 'grey'}}>{strings.take_a_while}</Text>
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