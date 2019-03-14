//@flow

import React, {
    Component
} from 'react'
import type {
    ContextRouter
} from 'react-router-dom'
import './VideoDetail.css'
import $ from 'jquery'

let loadYT
let player
let player2

let triggerByClick = false;

let preloading1 = false;
let preloading2 = false;

const actions = ["play", "pause"];

// let syncObj = {
//     time: 0,
//     video2: {
//         time: 0,
//         action: actions[0]
//     }
// }

class VideoDetail extends Component < ContextRouter, State > {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            playBtnColor: 'default',

            timeout: '7100',
            playbackRate: '0.85',

            video1time: 0,
            video2time: 0,
            actionType: 0, //play mode
            // timeSeries: [],
            timeSeries: [{
                "time": 24,
                "video2": {
                    "time": 31,
                    "action": "play"
                }
            }, {
                "time": 44,
                "video2": {
                    "time": 0,
                    "action": "pause"
                }
            }, {
                "time": 47,
                "video2": {
                    "time": 56,
                    "action": "play"
                }
            }, {
                "time": 72,
                "video2": {
                    "time": 0,
                    "action": "pause"
                }
            }],

            video1volume: 0,
            video2volume: 0,

        };
    }

    componentDidMount() {
        if (!loadYT) {
            loadYT = new Promise((resolve) => {
                const tag = document.createElement('script')
                tag.src = 'https://www.youtube.com/iframe_api'
                const firstScriptTag = document.getElementsByTagName('script')[0]
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
                window.onYouTubeIframeAPIReady = () => resolve(window.YT)
            })
        }
        loadYT.then((YT) => {
            player = new YT.Player(this.youtubePlayerAnchor, {
                height: this.props.height || 390,
                width: this.props.width || 640,
                videoId: this.props.match.params.id,
                events: {
                    onStateChange: this.onPlayerStateChange,
                    onReady: this.onPlayerReady
                },
                playerVars: {
                    controls: 1,
                    disablekb: 1,
                    fs: 0,
                    modestbranding: 1,
                    rel: 0
                    // origin: 'mydomain'
                }
            })

            player2 = new YT.Player(this.youtubePlayerAnchor2, {
                height: this.props.height || 390,
                width: this.props.width || 640,
                // videoId: this.props.match.params.id,
                videoId: '2t4O3jrFIEo',
                events: {
                    onStateChange: this.onPlayer2StateChange,
                    onReady: this.onPlayer2Ready
                },
                playerVars: {
                    controls: 1,
                    disablekb: 1,
                    fs: 0,
                    modestbranding: 1,
                    rel: 0
                }
            })
        })
    }

    onPlayerStateChange = (e) => {
        // if (typeof this.props.onStateChange === 'function') {
        // this.props.onStateChange(e)
        // }
        console.log("Player 1 state: ", e.data);
        switch (e.data) {
            case window.YT.PlayerState.PLAYING:
                if (!triggerByClick) {
                    player.pauseVideo();
                    // player2.setPlaybackRate(0.85);
                    player2.playVideo();
                }
                break;
            case window.YT.PlayerState.PAUSED:
                break;
            case window.YT.PlayerState.BUFFERING:
                preloading1 = true;
                break;
            case window.YT.PlayerState.CUED:
                break;
            case window.YT.PlayerState.ENDED:
                break;
            default:
                break;
        }
    }

    onPlayer2StateChange = (e) => {

        console.log("Player 2 state: ", e.data);
        switch (e.data) {
            case window.YT.PlayerState.PLAYING:
                if (e.target.a.id !== "vocal-video" && !triggerByClick) {
                    player.seekTo(0);
                    player.playVideo();
                    triggerByClick = true;
                }
                break;
            case window.YT.PlayerState.PAUSED:
                break;
            case window.YT.PlayerState.BUFFERING:
                preloading2 = true;
                break;
            case window.YT.PlayerState.CUED:
                break;
            case window.YT.PlayerState.ENDED:
                break;
            default:
                break;
        }
    }

    onPlayerReady = (e) => {

        var crntVideo1Volume = player.getVolume();
        this.setState({
            video1volume: crntVideo1Volume
        });

        // bind events
        var that = this;
        var playButton = document.getElementById("play-button");
        playButton.addEventListener("click", function() {

            triggerByClick = true;
            player2.playVideo();
            that.proceed();



        });

        var pauseButton = document.getElementById("pause-button");
        pauseButton.addEventListener("click", function() {
            player.pauseVideo();
            player2.pauseVideo();
        });
    }

    onPlayer2Ready = (e) => {
        var crntVideo2Volume = player2.getVolume();
        this.setState({
            video2volume: crntVideo2Volume
        });
    }

    handleChange = (e) => {
        debugger;
        e.preventDefault(e);
        if (e.target.id === "video1time") {
            this.setState({
                video1time: parseInt(e.target.value) ? parseInt(e.target.value) : ''
            });
        } else if (e.target.id === "video2time") {
            this.setState({
                video2time: parseInt(e.target.value) ? parseInt(e.target.value) : ''
            });
        } else if (e.target.id === "actionType") {
            this.setState({
                actionType: parseInt(e.target.value)
            });
        }
    }

    handleVolumeChange = (e) => {
        var targetVolume = parseInt(e.target.value);
        if (e.target.id === "volumeVideo2Range") {
            this.setState({
                video2volume: targetVolume
            });
            player2.setVolume(targetVolume);
        }
        if (e.target.id === "volumeVideo1Range") {
            this.setState({
                video1volume: targetVolume
            });
            player.setVolume(targetVolume);
        }
    }

    addTimeSeries = () => {
        const {
            video1time,
            video2time,
            actionType,
            timeSeries
        } = this.state;
        console.log(video1time);

        let syncObj = {
            time: 0,
            video2: {
                time: 0,
                action: actions[0]
            }
        }
        syncObj.time = video1time;
        syncObj.video2.time = video2time;
        syncObj.video2.action = actions[actionType] ? actions[actionType] : syncObj.video2.action;
        timeSeries.push(syncObj);
        this.setState({
            timeSeries: timeSeries
        });
    }

    proceed = () => {

        const {
            timeSeries
        } = this.state;

        for (var i = 0; i < timeSeries.length; i++) {
            console.log(timeSeries[i]);
            this.doSetTimeout(timeSeries, i);
        }
    }

    doSetTimeout = (timeSeries, i) => {

        var that = this;
        var timeoutObj = setTimeout(function() {
            that.syncVideo(timeSeries[i].video2.time, timeSeries[i].video2.action);
            clearTimeout(timeoutObj);
        }, (timeSeries[i].time + .4) * 1000);
    }

    playVideo = (p) => {
        p.playVideo();
    }

    syncVideo = (time, action) => {
        if (action === "play") {
            this.playVideoAt(time);
        }
        if (action === "pause") {
            this.pauseVideo();
        }
    }

    playVideoAt = (time) => {
        player.seekTo(time);
        player.playVideo();
    }

    pauseVideo = () => {
        player.pauseVideo();
    }

    stopVideo = (p) => {
        p.stopVideo();
    }

    render() {
        return (

            <div className="video-container">
                <svg className="defs">
                    <defs>
                        <path id="pause-button-shape"  d="M24,0C10.745,0,0,10.745,0,24s10.745,24,24,24s24-10.745,24-24S37.255,0,24,0z M21,33.064c0,2.201-1.688,4-3.75,4
                        s-3.75-1.799-3.75-4V14.934c0-2.199,1.688-4,3.75-4s3.75,1.801,3.75,4V33.064z M34.5,33.064c0,2.201-1.688,4-3.75,4
                        s-3.75-1.799-3.75-4V14.934c0-2.199,1.688-4,3.75-4s3.75,1.801,3.75,4V33.064z"/>
                        <path id="play-button-shape"  d="M24,0C10.745,0,0,10.745,0,24s10.745,24,24,24s24-10.745,24-24S37.255,0,24,0z M31.672,26.828l-9.344,9.344
                        C20.771,37.729,19.5,37.2,19.5,35V13c0-2.2,1.271-2.729,2.828-1.172l9.344,9.344C33.229,22.729,33.229,25.271,31.672,26.828z"/>
                            <path id="toggle-button-shape" stroke="black" d="M354.75,113h-227.5C56.946,113.827,0,171.258,0,241.75s56.946,127.923,127.25,128.731c0,0.019,227.5,0.019,227.5,0.019
        c70.993,0,128.75-57.757,128.75-128.75S425.743,113,354.75,113z M128.75,340.5C74.299,340.5,30,296.201,30,241.75
        S74.299,143,128.75,143s98.75,44.299,98.75,98.75S183.201,340.5,128.75,340.5z"/>
                    </defs>
                </svg>
                <div className="time-series">{this.state.timeSeries.length !== 0 ? JSON.stringify(this.state.timeSeries) : ''}</div>
                <div id="vocal-video" className="vocal-video hidden-video" ref={(r) => { this.youtubePlayerAnchor2 = r }}></div>
                <div className="player">
                    <label className="label">Video 1 Time</label>
                    <input id="video1time" type='text' className='time-input' onChange={this.handleChange}/>
                    {/* <div>{this.state.actionType}</div> */}
                    <div className="action-video-container">
                        <div className="action-type">
                            <label className="label">Action</label>
                            <select id="actionType" value={this.state.actionType} onChange={this.handleChange}>
                                <option value="0">Play</option>
                                <option value="1">Pause</option>
                            </select>
                        </div>
                        
                        {this.state.actionType === 0 &&
                            (
                            <div className="video2-input">
                                <label className="label">Video 2 Time</label>
                                <input id="video2time" type='text' className='time-input' onChange={this.handleChange}/>
                            </div>
                            )
                        }    
                    </div>
                    <button id="add-button" className="add-button button" onClick={this.addTimeSeries}>Add</button>
                    <button id="play-button" className="play-button button">Play</button>
                    <button id="pause-button" className="pause-button button">Pause</button>
                    <button id="toggle-button" className="toggle-button button">Toggle</button>
                    <div className="slidecontainer">
                        <label className="label">Video 1 Volume: {this.state.video1volume}</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={this.state.video1volume}
                            onChange={this.handleVolumeChange}
                            className="slider"
                            id="volumeVideo1Range"/>
                    </div>
                    <div className="slidecontainer">
                        <label className="label">Video 2 Volume: {this.state.video2volume}</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={this.state.video2volume}
                            onChange={this.handleVolumeChange}
                            className="slider"
                            id="volumeVideo2Range"/>
                    </div>
                    <div className='error'>{this.state.error !== '' ? this.state.error : ''}</div>
                </div>
                <div id="lyric-video" className="lyric-video" ref={(r) => { this.youtubePlayerAnchor = r }}></div>
            </div>
        )
    }
}

export default VideoDetail

// VideoDetail.propTypes = {
//     YTid: PropTypes.string.required,
//     width: PropTypes.number,
//     height: PropTypes.number,
//     onStateChange: PropTypes.func
// }
// reactjs youtube iframe https://stackoverflow.com/questions/39517830/render-iframe-video-using-youtubes-js-api-with-reactjs
// button https://codepen.io/jessenoseworthy/pen/KawYod
// button, youtube api https://css-tricks.com/play-button-youtube-and-vimeo-api/
// https://codepen.io/lionelB/pen/gckDu
// https://codepen.io/philbaker/pen/XgGLVj
// router https://codesandbox.io/s/vvoqvk78?from-embed

// We recommend that you set this parameter to false while the user drags the mouse along a video progress bar and then set it to true when the user releases the mouse. This approach lets a user scroll to different points of a video without requesting new video streams by scrolling past unbuffered points in the video. When the user releases the mouse button, the player advances to the desired point in the video and requests a new video stream if necessary.
// Youtube Get Current Second Api Demo. https://gist.github.com/mangreen/607fcc6c84379c2025ae
// https://stackoverflow.com/questions/19896430/keeping-two-youtube-videos-in-sync-with-each-other
// https://stackoverflow.com/questions/42716093/youtube-api-websockets-make-sure-two-videos-are-in-sync-video-1-pauses-when-v?rq=1

// https://stackoverflow.com/questions/36403101/toggle-class-in-react/36404061

// https://stackoverflow.com/questions/5226285/settimeout-in-for-loop-does-not-print-consecutive-values
// https://www.w3schools.com/howto/howto_js_rangeslider.asp
// https://stackoverflow.com/questions/36122034/jsx-react-html5-input-slider-doesnt-work

// https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e
// https://reactjs.org/docs/conditional-rendering.html

// https://nhacpro.net/the-loai-ca-si/nhac-thieu-nhi.html?page=1