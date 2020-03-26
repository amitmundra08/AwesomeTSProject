import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Slider,
  TouchableNativeFeedback,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native'
import Video from 'react-native-video'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Orientation from 'react-native-orientation'
import Comments from './components/Comments'
import { strings } from '../../src/constants'
import {videoData} from '../data-sources/videoData'
import { firebaseAuth } from '../environment/config';
import { Container } from 'native-base'
const successImageUri = require('../../image1.jpg');


const { width } = Dimensions.get('window')
const videosArray = videoData.videosArray

interface Props {
  navigation: any
}

class State {
  currentTime: number
  duration: number
  paused: boolean
  overlay: boolean
  fullscreen: boolean
  currentIndex: number
  videos: any
  showPopup: boolean
  constructor() {
    this.currentTime = 0
    this.duration = 0.1
    this.paused = false
    this.overlay = false
    this.fullscreen = false
    this.currentIndex = 0
    this.videos = videosArray
    this.showPopup = false

  }
}

export default class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = new State()
  }

  lastTap = null
  handleDoubleTap = (doubleTapCallback: any, singleTapCallback: any) => {
    const now = Date.now()
    const DOUBLE_PRESS_DELAY = 300
    if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
      clearTimeout(this.timer)
      doubleTapCallback()
    } else {
      this.lastTap = now
      this.timer = setTimeout(() => {
        singleTapCallback()
      }, DOUBLE_PRESS_DELAY)
    }
  }

  getTime = (t: any) => {
    const digit = n => n < 10 ? `0${n}` : `${n}`
    const sec = digit(Math.floor(t % 60))
    const min = digit(Math.floor((t / 60) % 60))
    const hr = digit(Math.floor((t / 3600) % 60))
    return hr + ':' + min + ':' + sec 
  }

  load = ({ duration }: any) => this.setState({ duration }) 
  progress = ({ currentTime }: any) => this.setState({ currentTime }) 

  backward = () => {
    const {currentTime} = this.state
    this.video.seek(currentTime - 5)
    clearTimeout(this.overlayTimer)
    this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000)
  }
  forward = () => {
    const {currentTime} = this.state
    this.video.seek(currentTime + 5)
    clearTimeout(this.overlayTimer)
    this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000)
  }

  onslide = (slide: any) => {
    const {duration} = this.state
    this.video.seek(slide * duration)
    clearTimeout(this.overlayTimer)
    this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000)
  }

  youtubeSeekLeft = () => {
    const { currentTime } = this.state
    this.handleDoubleTap(() => {
      this.video.seek(currentTime - 5)
    }, () => {
      this.setState({ overlay: true })
      this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000)
    })
  }

  onPressSignOut = () => {
    this.setState({showPopup: false})
    firebaseAuth.signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
  }

  youtubeSeekRight = () => {
    const { currentTime } = this.state
    this.handleDoubleTap(() => {
      this.video.seek(currentTime + 5)
    }, () => {
      this.setState({ overlay: true })
      this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000)
    })
  }

  fullscreen = () => {
    const { fullscreen } = this.state
    if(fullscreen) {
      Orientation.lockToPortrait()
    } else {
      Orientation.lockToLandscape()
    }
    this.setState({ fullscreen: !fullscreen })
  }

  onAddComment = (comment: string) => {
    const {videos, currentIndex} = this.state
    const comments = videos[currentIndex].comments
    const name = 'User'
    const date = Date.now()
    const id = comments.length.toString() + 1
    const newCommentObject = {
        id,
        name,
        comment,
        date
    }
    videos[currentIndex].comments = [...comments, newCommentObject]
    this.setState({videos: videos})
  }

  onPlayNextVideo = () => {
      const {currentIndex, videos} = this.state
      const nextIndex = currentIndex + 1
      if (nextIndex >= videos.length) {
          Alert.alert(strings.no_more_videos_on_right)
      } else {
        this.setState({currentIndex: nextIndex, currentTime: 0})
      }
  } 

  onPlayPreviousVideo = () => {
    const {currentIndex} = this.state
    const previousIndex = currentIndex - 1
    if (previousIndex < 0) {
        Alert.alert(strings.no_more_videos_on_right)
    } else {
        this.setState({currentIndex: previousIndex, currentTime: 0})
    }
  }
  
  closePopup = () => {
    this.setState({showPopup: false})
  }

  render = () => {
    const { currentTime, duration, paused, overlay, fullscreen, videos, currentIndex, showPopup } = this.state
    const videoUrl = videos[currentIndex].url
    const {totalLikes, totalViews, totalUnlikes, comments, title, subtitle} = videos[currentIndex]

    return (
      <View style={style.container}>
        <ScrollView contentContainerStyle={{backgroundColor: '#EDF2F7'}} showsVerticalScrollIndicator={false}>
        <View style={fullscreen ? style.fullscreenVideo : style.video}>
          <Video
            fullscreen={fullscreen}
            paused={paused}
            ref={ref => this.video = ref}
            source={videoUrl}
            style={{ ...StyleSheet.absoluteFill }}
            resizeMode='cover'
            onLoad={this.load}
            onProgress={this.progress}
          />
          <View style={style.overlay}>
            {overlay ? <View style={{ ...style.overlaySet, backgroundColor: '#0006' }}>
              <Icon name='backward' style={style.icon} onPress={() => this.onPlayPreviousVideo()} />
              <Icon name={paused ? 'play' : 'pause'} style={style.icon} onPress={() => this.setState({ paused: !paused })} />
              <Icon name='forward' style={style.icon} onPress={() => this.onPlayNextVideo()} />
              <View style={style.sliderCont}>
                <View style={style.timer}>
                  <Text style={{ color: 'white' }}>{this.getTime(currentTime)}</Text>
                  <Text style={{ color: 'white' }}>{this.getTime(duration)}   <Icon onPress={() => this.fullscreen()} name={fullscreen ? 'compress' : 'expand'} style={{ fontSize: 15 }} /></Text>
                </View>
                <Slider
                  maximumTrackTintColor='white'
                  minimumTrackTintColor='white'
                  thumbTintColor='white'
                  value={currentTime / duration}
                  onValueChange={this.onslide} 
                />
              </View>
            </View> : <View style={style.overlaySet}>
                <TouchableNativeFeedback onPress={() => this.youtubeSeekLeft()}><View style={{ flex: 1 }} /></TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => this.youtubeSeekRight()}><View style={{ flex: 1 }} /></TouchableNativeFeedback>
              </View>}
          </View>
        </View>
        <View style={{paddingHorizontal: 16, marginTop: 8}}>
          <Text style={{color: 'blue'}}>{title}</Text>
          <Text style={{fontSize: 16, marginVertical: 8}}>{subtitle}</Text>
          <Text style={{color: '#718096'}}>{totalViews}</Text>
        </View>
        <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 16, paddingHorizontal: 40}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon name='thumbs-up' size={20} color='grey'/>
            <Text style={{color: 'grey'}}>{totalLikes}</Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon name='thumbs-down' size={20} color='grey'/>
            <Text style={{color: 'grey'}}>{totalUnlikes}</Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon name='share' size={20} color='grey'/>
            <Text style={{color: 'grey'}}>Share</Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon name='download' size={20} color='grey'/>
            <Text style={{color: 'grey'}}>Download</Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon name='save' size={20} color='grey'/>
            <Text style={{color: 'grey'}}>Save</Text>
          </View>
        </View>
        <View style={{borderTopWidth: 1, borderTopColor: 'grey', borderBottomWidth: 1, borderBottomColor:'grey', paddingVertical: 8, flexDirection: 'row', marginTop: 16, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16}}>
          <View style={{flexDirection: 'row'}}>
            <Image style={{height: 32, width: 32, borderRadius: 16, alignSelf: 'center'}} source={successImageUri}/>
            <View style={{marginLeft: 8}}>
              <Text style={{fontSize: 18}}>The Viral Fever</Text>
              <Text style={{color: 'grey'}}>6.5M Subscribers</Text>
            </View>
          </View>
          <View>
            <Text style={{color: '#E53E3E', fontSize: 16, fontWeight: 'bold'}}>SUBSCRIBE</Text>
          </View>
        </View>
        <View>
            <Comments closePopup={() => this.closePopup()} comments={comments} onAddComment={(comment: string) => this.onAddComment(comment)}/>
        </View>
        </ScrollView>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#EDF2F7',
    flex: 1,
    paddingBottom: 8
  },
  logoutContainer: {
    alignItems: 'flex-end',
    right: 8, top: 8,
    position: 'absolute'
  },
  whiteText: {color: 'white'},
  innerContainer: {padding: 8, backgroundColor: '#44337A', width: '100%', alignItems: 'center', justifyContent: 'center'},
  popupContainer: {position: "absolute", right: 10, top: 10, width: 100, backgroundColor: 'white', elevation: 1, justifyContent: 'center', alignItems: 'center', padding: 0},
  userContainer: {marginTop: 8, marginRight: 8},
  overlay: {
    ...StyleSheet.absoluteFillObject
  },
  overlaySet: {
    flex: 1,
    flexDirection: 'row'
  },
  icon: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 25
  },
  sliderCont: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  timer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },
  video: { width, height: width * .6, backgroundColor: 'black' },
  fullscreenVideo: {
    backgroundColor: 'black',
    ...StyleSheet.absoluteFill,
    elevation: 1
  }
})