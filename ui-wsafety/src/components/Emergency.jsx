import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink, BrowserRouter, Link } from "react-router-dom";
import Header from './Header';
import alertify from 'alertifyjs';
import {RecordRTC, RecordRTCPromisesHandler} from 'recordrtc';

let recorder;
class Emergency extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      resp: "",
      src: null,
      data: null,
      blobUrl: null,
      dataUrl: null,
      location: "",
      arrEmail: []
    };
    this.videoRef = React.createRef();
  }


  locate = () => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      alertify.error("geolocation not Available");
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      this.setState({
        location: position.coords
      },()=>{
        //console.log(this.state.location)
        this.sendLocationEmail()
      })
    });

  }

  sendLocationEmail = () => {
    let email=this.props.location.state.email;
    const {location, arrEmail } =this.state;
    if(!email || !location || arrEmail.length==0){
      alertify.error("Error occurred. Try again!")
      return;
    }
    fetch("http://localhost:9000/emergency/locate", {
        method: 'POST',
        headers: {
        'Content-type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          location: location,
          arrEmail: arrEmail
        })
      })
      .then((res) => {
        this.setState({
          status: res.status
        })
        return res.json()
      })
      .then((res) => {
          if(this.state.status==200){
            alertify.success(res.msg);
          }
          else{
            alertify.error(res.msg)
          }
        })
      .catch(err => {
          console.log(err);
          //alertify.error("error");
      });
  }

  sendRecordingEmail = () => {
    let email=this.props.location.state.email;
    const {location, arrEmail, data, blobUrl, dataUrl} =this.state;
    if(!email || !location || arrEmail.length==0){
      alertify.error("Error occurred. Try again!")
      return;
    }
    fetch("http://localhost:9000/emergency/record", {
        method: 'POST',
        headers: {
        'Content-type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          location: location,
          arrEmail: arrEmail,
          data: data,
          blobUrl: blobUrl,
          dataUrl: dataUrl
        })
      })
      .then((res) => {
        this.setState({
          status: res.status
        })
        return res.json()
      })
      .then((res) => {
          if(this.state.status==200){
            alertify.success(res.msg);
          }
          else{
            alertify.error(res.msg)
          }
        })
      .catch(err => {
          console.log(err);
          //alertify.error("error");
      });
  }

  startVideo = () => {
    navigator.mediaDevices.getUserMedia({
      audio: true, 
      video: true
    })
  .then((stream) => {
      console.log(stream, " dfd");
      // Display a live preview on the video element of the page
      //setSrcObject(stream, video);
      this.videoRef.srcObject = stream;

      this.setState({
        stream: stream
      })
      // this.setState({ src: window.URL.createObjectURL(stream) });

      // Start to display the preview on the video element
      // and mute the video to disable the echo issue !
      // video.play();
      this.videoRef.play();
      // video.muted = true;
      //this.setState({
        console.log("hey exec")
        //recorder= RecordRTC(stream, { type: 'video' })
        recorder = new RecordRTCPromisesHandler(stream, {
          mimeType: 'video/webm',
          bitsPerSecond: 128000
      });
      //},()=>{
        
        //console.log(this.state.recorder," jhbghf")
        console.log(recorder," jhbghf")
        // Initialize the recorder
            // this.state.recorder = new RecordRTCPromisesHandler(stream, {
            //     mimeType: 'video/webm',
            //     bitsPerSecond: 128000
            // });

            // Start recording the video
            recorder.startRecording()
            .then(() => {
              console.info('Recording video ...');
            }).catch( (error) => {
                console.error('Cannot start video recording: ', error);
            });
          recorder.stream = stream;

          setTimeout(
            ()=>{ this.stopVideo() }, 
            10000
          );

      })
      
        .catch((error) => {
            console.error("Cannot access media devices: ", error);
        });

    }
    
  stopVideo = () => {
    recorder.stopRecording()
    .then(() => {
      console.info('stopRecording success',recorder.recordRTC.toURL());
      this.setState({
        data: recorder.getBlob(),
        blobUrl: recorder.recordRTC.toURL(),
        dataUrl: recorder.getDataURL()
      },()=>{
        //this.videoRef.play();
       // this.videoRef.srcObject = this.state.data;
       //this.videoRef.src=recorder.recordRTC.toURL();
        console.log("blob",this.state.data)
        this.sendRecordingEmail();
      })
      // Retrieve recorded video as blob and display in the preview element
      //var videoBlob = recorder.getBlob();
      // video.src = URL.createObjectURL(videoBlob);
      //this.videoRef.srcObject = stream;
     //this.videoRef.play();
     recorder.stream.stop();
      // Unmute video on preview
      //video.muted = false;

      // Stop the device streaming
      
    })
    .catch((error) => {
        console.error('stopRecording failure', error);
    });
  
}

  fetchEmergencyEmails = () => {
    let email=this.props.location.state.email;
    fetch("http://localhost:9000/emergency", {
        method: 'POST',
        headers: {
        'Content-type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
        })
      })
      .then((res) => {
        this.setState({
          status: res.status
        })
        return res.json()
      })
      .then((res) => {
          if(this.state.status==200){
            alertify.success(res.msg);
            console.log(res.arrEmail)
            this.setState({
              arrEmail: res.arrEmail
            },()=>{
              this.locate();
            })
          }
          else{
            alertify.error(res.msg)
          }
        })
      .catch(err => {
          console.log(err);
          //alertify.error("error");
      });
  }
  componentDidMount() {
    console.log(this.props.location.state.email)
    if(this.props.location.state.email){
      this.fetchEmergencyEmails();
      this.startVideo();
    }
  }
  
  render(){
    const { resp }=this.state;
    if (!this.props.location.state.email) {
      return (
        <div>
          <h1>Error</h1>
          <Link to="/">Go to Women-Safety app</Link>
        </div>
      )
    }
    return (
      <div>
          <Header email={this.props.location.state.email}/>
        {/* <button onClick={this.handleMsg}>SMS</button> */}
        {/* <Button onClick={this.locate}>Location</Button> */}
        {/* <button>Siren</button>
        <button>Audio</button>         */}
        {/* <button onClick={this.startVideo}>START Video</button> */}
        {/* <button onClick={this.stopVideo}>STOP Video</button> */}
    
         <video className="row col-6 mt-5 mx-auto justify-content-center" ref={videoRef => {this.videoRef = videoRef}} controls autoPlay style={{height:"55vh"}}/>
      </div>
    );
  }
  
}

export default Emergency;
