import React from 'react'
import {View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Keyboard} from 'react-native'
import { strings } from '../../constants'
import moment from 'moment'

interface Props {
    comments: any
    onAddComment: (comment: string) => void
    closePopup: () => void
}

class State {
    comment: string
    constructor() {
        this.comment = ''
    }
}

export default class Comments extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = new State()
    }
    renderItem = (item: any) => {
        const {name, comment, date} = item.item
        const formatedDate = moment(date).fromNow();
        return (
            <View style={{marginVertical: 8, paddingHorizontal: 16}}>
                <Text style={styles.lightTextStyle}>{name} - {formatedDate}</Text>
                <Text style={styles.darkTextStyle}>{comment}</Text>
            </View>
        )
    }
    FlatListItemSeparator = () => {
        return (
          <View style={styles.seperatorStyle}/>
        );
    }

    render(): JSX.Element {
        const {comment} = this.state
        const {comments, onAddComment = () => {}, closePopup = () => {}} = this.props
        return (
            <View onStartShouldSetResponder={() => closePopup()} style={styles.container}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}          
                        placeholder={strings.types_your_comment}
                        value={comment}
                        onChangeText={(comment) => this.setState({comment})}
                    />
                </View>
                <View onStartShouldSetResponder={() => closePopup()} style={styles.buttonContainer}>
                    {
                        comment.length > 0 ? <TouchableOpacity
                                                onPress={() => {onAddComment(comment), this.setState({comment: ''}), Keyboard.dismiss()}}
                                                style={styles.buttonStyle}
                                            >
                                                <Text style={styles.whiteText}>{strings.add_comment}</Text>
                                            </TouchableOpacity> :
                                            <View style={[styles.buttonStyle, styles.disabledButton]}>
                                                     <Text style={styles.whiteText}>{strings.add_comment}</Text>
                                            </View>
                    }
                </View>
                    <Text style={styles.commentTextStyle}>{strings.comment}  {comments.length}</Text>
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
    container: {padding: 0},
    textInput: {
        borderWidth: 1,
        borderColor: '#44337A',
        padding: 5,
        fontSize: 16,
        height: 40,
        elevation: 0,
        borderRadius: 2
    },
    textInputContainer: {flex: 1, padding: 16},
    buttonContainer: {alignItems: 'flex-end', paddingHorizontal: 16},
    buttonStyle: {justifyContent: 'center', alignItems: 'center', width: '40%', height: 50, padding: 16, backgroundColor: '#44337A', borderRadius: 4},
    disabledButton: {backgroundColor: 'grey'},
    whiteText: {color: 'white'},
    commentTextStyle: {fontSize: 16, color: 'black', padding: 16},
    seperatorStyle: {height: 0.5, width: '100%', backgroundColor: '#C8C8C8'},
    lightTextStyle: {color: '#718096'},
    darkTextStyle: {color: '#2D3748'}
})