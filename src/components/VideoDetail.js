//@flow

import React, { Component } from 'react'
import type { ContextRouter } from 'react-router-dom'
import './VideoDetail.css'

let loadYT
let player

let player2
const path={
    fill:'#010002'
}
class VideoDetail extends Component<ContextRouter, State> {

    constructor(props) {
        super(props);
        this.state = {
            beginAt: 0,
            error : ''
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
                }
            })

            player2 = new YT.Player(this.youtubePlayerAnchor2, {
                height: this.props.height || 390,
                width: this.props.width || 640,
                videoId: this.props.match.params.id,
                events: {
                    onStateChange: this.onPlayerStateChange,
                    onReady: this.onPlayerReady
                }
            })
        })
    }

    onPlayerStateChange = (e) => {
        // if (typeof this.props.onStateChange === 'function') {
            // this.props.onStateChange(e)
        // }
        switch (e.data) {
            case window.YT.PlayerState.ENDED:
                console.log(e.data);
        break;        
        }
    }

    onPlayerReady = (e) => {
        
        // bind events
        var that = this;
        var playButton = document.getElementById("play-button");
        playButton.addEventListener("click", function() {
            player.playVideo();
            if (that.state.beginAt > 0) {
                player2.seekTo(that.state.beginAt);
            } else {
                that.setState({ error: 'There is a probblem with the Playback Begin Position.'});
            }
            
        });
        
        var pauseButton = document.getElementById("pause-button");
        pauseButton.addEventListener("click", function() {
            player.pauseVideo();
            player2.pauseVideo();
        });
    }

    handleChange = (e) => {

        this.setState({
            beginAt: parseInt(e.target.value) ? parseInt(e.target.value) : ''
        });
    }

    render() {
        return (
            // <section className='youtubeComponent-wrapper'>
            
            <div className="video-detail">
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
                <div ref={(r) => { this.youtubePlayerAnchor = r }}></div>
                
                <div className="buttons box">
                    <label className="label">Enter The Begin Position In Video 2</label>
                    <input type='text' className='is-medium' placeholder={this.state.beginAt} onChange={this.handleChange}/>
                    <h1>{this.state.beginAt != '' ? "Right now your input is: " + this.state.beginAt : ''}</h1>
                    <svg className="button" id="play-button">
                        <use xlinkHref="#play-button-shape"/>
                    </svg>
                    <svg className="button" id="pause-button">
                        <use xlinkHref="#pause-button-shape"/>
                    </svg>
                    <svg viewBox="0 50 1 400" className="button" id="toggle-button" preserveAspectRatio="xMinYMin meet">
                        <use xlinkHref="#toggle-button-shape" width="100"/>
                    </svg>
                    <div className='error'>{this.state.error !== '' ? this.state.error : ''}</div>
                </div>
                <div className="hidden-video" ref={(r) => { this.youtubePlayerAnchor2 = r }}></div>
                {/* </section> */}
                {/* <button className="play-button">Play Video</button> */}
                {/* <div className="container">
        <h1 className="intro">Binding data with React</h1>
        <div className="box">
          <label className="label">Enter text here</label>
          <input className="input is-medium" type='text' id='input' value={this.state.value} onChange={this.handleChange} />
          <p className="input-value">The value of the input is: <span className="highlight">{this.state.value}</span></p>
        </div>
      </div> */}
            </div>

        )
    }
}

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
export default VideoDetail
