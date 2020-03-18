import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { firebaseAuth } from '../environment/config';
import { strings } from '../constants';

interface Props {
    navigation: any
}
class State {
    email: string
    password: string
    errorMessage: any
    constructor() {
        this.email = ''
        this.password = ''
        this.errorMessage = null
    }
}
export default class SignUp extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = new State()
    }
    handleSignUp = () => {
        const {email, password} = this.state
        firebaseAuth.createUserWithEmailAndPassword(email,password)
                    .then(() => this.props.navigation.navigate('Home'))
                    .catch(error => this.setState({ errorMessage: error.message }));
    }
    render() {
        const {errorMessage, email, password} = this.state
        return (
            <View style={styles.container}>
                <View style={styles.headingSection}>
                </View>
                <Text style={styles.heading}>{strings.sign_up}</Text>
                    {errorMessage &&
                    <Text style={{ color: 'red' }}>
                    {errorMessage}
                    </Text>}
                    <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={email}
                    />
                    <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={password}
                    />
                    <TouchableOpacity onPress={this.handleSignUp}>
                    <View style={styles.signupBtn}>
                        <Text style={styles.buttonText}>{strings.sign_up}</Text>
                    </View>
                    </TouchableOpacity>
                    <Button color="#44337A"
                    title={strings.already_have_an_account}
                    onPress={() => this.props.navigation.navigate('Login')}
                    />
            </View>
        )
    }
}
const heightConst = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    container: {
        height: heightConst - 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingSection: {
        // borderColor: 1,
        textAlign: 'center',
        alignItems: 'center',
        marginBottom: 35
    },
    heading: {
        color: '#44337A',
        fontSize: 26,
        marginBottom: 10
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: '#44337A',
        borderWidth: 1,
        marginTop: 8,
        color: '#44337A',
        borderRadius: 4
    },
    signupBtn: {
        borderRadius: 5,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#44337A',
        width: 100,
        height: 35,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
    },
    buttonText: {
        color: '#44337A',
        textAlign: 'center'
    }
})