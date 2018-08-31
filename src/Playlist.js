import React from 'react';
import './Playlist.css';
import  arrowGreen from './arrowGreen.png';
import arrowYellow from './arrowYellow.png';
import arrowRed from './arrowRed.png';

const  Playlist =(props)=>{
  return(
    <div className="videoPlaylistHolder">
      
      <div className="playlistHeader">
        <h1 className="heading" >Videos list</h1>
      </div>

      <div className="videoPlaylist" >
          { props.state.map((element,index) =>{
              if(element.status==='error'){
                return (
                    <div className="videoDescription">
                      <div className="downloadStatus" >
                        <img className="arrow arrowRed " alt="Downloading Error" src={arrowRed} /> 
                      </div>
                      <div className="videoTitle" >
                        <h3 className="videoTitleText" > {element.vId}</h3>
                      </div>
                    </div>
                  );
              }else{
                if(element.status==='active'){
                  return (
                    <div className="videoDescription">
                      <div className="downloadStatus" >
                        <img className="arrow arrowYellow" alt="Downloading" src={arrowYellow} /> 
                      </div>
                      <div className="videoTitle" >
                        <h3 className="videoTitleText" > {element.vId}</h3>
                      </div>
                    </div>
                  );
                }else{
                  return (
                    <div className="videoDescription">
                      <div className="downloadStatus" >
                        <img className="arrow arrowGreen " alt="Download Complete" src={arrowGreen} /> 
                      </div>
                      <div className="videoTitle" >
                        <h3 className="videoTitleText" > {element.vId}</h3>
                      </div>
                    </div>
                  );
                }
              }}
            )
          }
      </div>

    </div>
  );
}
  
export default Playlist;