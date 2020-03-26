import React from 'react'
import {View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Keyboard, Image} from 'react-native'
import { strings } from '../../constants'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome5'

const successImageUri = require('../../../image1.jpg');

interface Props {
    comments: any
    onAddComment: (comment: string) => void
    closePopup: () => void
}

class State {
    comment: string
    showAddComent: boolean
    constructor() {
        this.comment = ''
        this.showAddComent = false
    }
}

export default class Comments extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = new State()
    }
    onPressshowAddButton = () => {
        this.setState({showAddComent: true})
    }
    renderItem = (item: any) => {
        const {name, comment, date} = item.item
        const formatedDate = moment(date).fromNow();
        return (
            <View style={{marginVertical: 8, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={successImageUri} style={{height: 32, width: 32, borderRadius: 16}}/>
                <View style={{marginLeft: 8}}>
                    <Text style={styles.lightTextStyle}>{name} - {formatedDate}</Text>
                    <Text style={styles.darkTextStyle}>{comment}</Text>
                </View>
            </View>
        )
    }
    FlatListItemSeparator = () => {
        return (
          <View style={styles.seperatorStyle}/>
        );
    }

    render(): JSX.Element {
        const {comment, showAddComent} = this.state
        const {comments, onAddComment = () => {}, closePopup = () => {}} = this.props
        return (
            <View style={styles.container}>

                {
                    showAddComent ? (
                        <View style={styles.textInputContainer}>
                            <TextInput
                                style={styles.textInput}          
                                placeholder={strings.types_your_comment}
                                value={comment}
                                onChangeText={(comment) => this.setState({comment})}
                            />
                            <View style={styles.buttonContainer}>
                            {
                                comment.length > 0 ? <TouchableOpacity
                                                        onPress={() => {onAddComment(comment), this.setState({comment: '', showAddComent: false}), Keyboard.dismiss()}}
                                                        style={styles.buttonStyle}
                                                    >
                                                        <Icon name='paper-plane' size={20} color={'blue'}/>
                                                    </TouchableOpacity> :
                                                    <View/>
                            }
                            </View>
                        </View>
                    ) : <View/>
                }
                
                <View style={{flexDirection: 'row', paddingHorizontal: 16, marginTop: 16, marginBottom: 8, justifyContent: 'space-between'}}>
                    <View><Text style={styles.commentTextStyle}>{strings.comment}  {comments.length}</Text></View>
                    <TouchableOpacity onPress={() => this.onPressshowAddButton()}>
                        <Icon name='plus-circle' size={25} color='#38B2AC'/>
                    </TouchableOpacity>

                </View>
                <FlatList
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    data={comments}
                    renderItem={this.renderItem}
                    keyExtractor={(item: any) => item.id}
                    extraData={this.state}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {padding: 0, backgroundColor: '#EDF2F7'},
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#44337A',
        padding: 5,
        fontSize: 16,
        height: 40,
        elevation: 0,
        borderRadius: 2,
        backgroundColor: '#FAF5FF'
    },
    textInputContainer: {flex: 1, padding: 16},
    buttonContainer: {alignItems: 'flex-end'},
    buttonStyle: {position: 'absolute', right: 16, top: -32},
    disabledButton: {backgroundColor: 'grey'},
    whiteText: {color: 'white'},
    commentTextStyle: {fontSize: 16, color: 'black'},
    seperatorStyle: {height: 0.5, width: '100%', backgroundColor: '#C8C8C8', marginHorizontal: 16, marginVertical: 4},
    lightTextStyle: {color: '#718096'},
    darkTextStyle: {color: '#2D3748'}
})