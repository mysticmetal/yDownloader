import React from 'react';
import './Playlist.css';

const  Playlist =(props)=>{
  return(
    <div>
      <h1 className="heading" >Videos list</h1>
      { props.state.map((element,index) =>{
          if(element.error){
            return <h3 className="errorVideo" key={index}> {element.vId}</h3>
          }else{
            return <h3 key={index}> {element.vId}</h3>
          }
          
        })
      }
    </div>
  );
}
  
export default Playlist;