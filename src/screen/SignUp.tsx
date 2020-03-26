import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { firebaseAuth } from '../environment/config';
import { strings } from '../constants';
import { Container, Button, Card, } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5'
const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width
const successImageUri = require('../../image1.jpg');


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
            <Container>
                <ImageBackground source={successImageUri}
                    style={styles.fullwidthHeight}
                    resizeMode='cover'
                >
                    <Card style={{backgroundColor: '#FFFFF0'}}>
                        <View style={{justifyContent: 'center', alignItems: 'center', margin: 16}}>
                        <Icon name='user' size={25} color='#44337A'/>
                        <Text style={styles.heading}>{strings.sign_up}</Text>
                            {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
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
                        {/* <Button color="#44337A"
                        title={strings.already_have_an_account}
                        onPress={() => this.props.navigation.navigate('Login')}
                        /> */}
                        <View>
                            <Text>{strings.already_have_an_account}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                             <Text style={{fontSize: 20, color: '#44337A'}}>{strings.login}</Text>
                        </TouchableOpacity>
                        </View>
                        </Card>
                
            </ImageBackground>
            </Container>
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
    buttonDiv: {
        backgroundColor: 'white',
        marginTop: 16,
        marginBottom: 16,
        justifyContent: 'center',
        width: 100
    },
    buttonDivText: {
        color: 'red',
        textAlign: 'center'
    },
    marginLR: {
        marginHorizontal: 18
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
        borderRadius: 4,
        backgroundColor: '#FAF5FF'
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
    },
    fullwidthHeight: {
        width: width,
        height: height,
        justifyContent: 'center',
        padding: 16
    }
})