import React from 'react';
import './Playlist.css';

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
                        <h3 className="arrow arrowRed " > => </h3> 
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
                        <h3 className="arrow arrowYellow " > => </h3> 
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
                        <h3 className="arrow arrowGreen " > => </h3> 
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