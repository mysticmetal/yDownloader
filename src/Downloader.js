import React from 'react';
import {SERVER_URL} from './appConfig';
import Playlist from './Playlist';
import Yimage from './youtube.png';
class Downloader extends React.Component{
  constructor(){
    super();
    this.state={
      url:'',
      fetched:false,
      vId:'',
      vQuality:'medium',
      subtitle:false,
      playlist:[
        {
          status:'active',
          vId:'jV3xxOoWe-4',
          completed:false
        },
        { status:'error',
          vId:'M-P4QBt-FWw',
          completed:false
        },
        {
          status:'completed',
          vId:'hT_nvWreIhg'
        }
      ]
    }
    this.handleChange=this.handleChange.bind(this);
    this.onDownload=this.onDownload.bind(this);
  }

  handleChange(e){
    
    switch(e.target.name){
      case 'urlInput':{
        this.setState({url:e.target.value});
        break;
      }
      case 'fetchBtn':{
        let urlParts = this.state.url.split('?v=')
        let vId = urlParts.length > 1 ? urlParts[1] : this.state.url
        this.setState({fetched:true,vId});
        break;
      }
      case 'subInput':{
        this.setState({subtitle:e.target.checked});
        break;
      }
      case 'videoQuality':{
        this.setState({vQuality:e.target.value});
        break;
      }
      default :{
        console.log('make a case for selection');
        break;
      }
    }
  }

  onDownload(e){
    
    if(this.state.fetched){
      
      let indx = this.state.playlist.map( v=> v.vId).indexOf(this.state.vId);
      let newPlaylist=[...this.state.playlist];

      if(indx===-1){
        console.log('downloading');
        fetch(SERVER_URL+'/download',{
          method:"POST",
          mode:"cors",
          credentials:"omit",
          headers:{
            "Content-type":"application/json; charset=utf-8"
          },
          body:JSON.stringify({
            vId:this.state.vId,
            vQuality:this.state.vQuality,
            subtitle:this.state.subtitle
          })
        })
        .then(res=>res.json())
        .then(res=>{
          console.log(res)
          if(res.status){
            let indx = this.state.playlist.map( v=> v.vId).indexOf(res.vInfo.vId) ;
            let newPlaylist = [...this.state.playlist];
            newPlaylist=[...newPlaylist.slice(0,indx),{status:'error',vId:res.vInfo.vId,...newPlaylist.slice(indx+1)}];
            this.setState({playlist:newPlaylist});
          }
        });

        newPlaylist=[...newPlaylist,{status:'active',vId:this.state.vId}];
      
      }else{
        if(newPlaylist[indx].status){
          
          console.log('downloading');
          fetch(SERVER_URL+'/download',{
            method:"POST",
            mode:"cors",
            credentials:"omit",
            headers:{
              "Content-type":"application/json; charset=utf-8"
            },
            body:JSON.stringify({
              vId:this.state.vId,
              vQuality:this.state.vQuality,
              subtitle:this.state.subtitle
            })
          })
          .then(res=>res.json())
          .then(res=>{
            console.log(res)
            if(res.status){
              let indx = this.state.playlist.map( v=> v.vId).indexOf(res.vInfo.vId) ;
              let newPlaylist = [...this.state.playlist];
              newPlaylist=[...newPlaylist.slice(0,indx),{status:'error',vId:res.vInfo.vId,...newPlaylist.slice(indx+1)}];
              this.setState({playlist:newPlaylist});
            }
          });  
        
          newPlaylist=[...newPlaylist.slice(0,indx),{status:'active',vId:this.state.vId},...newPlaylist.slice(indx+1)];
        }
      
      }
      
      this.setState({fetched:false,playlist:newPlaylist});
    
    }

  }

  render(){
    return(
      <div className="downloader downloaderLayout">
       
        <div className="header">
        <h1 className="heading" >Ydownloader for downloading videos from youtube</h1>
        </div>

        <div className="searchBar" >  
          <input className="urlInput" name="urlInput" onChange={this.handleChange} placeholder="enter the url of video" type="url" value={this.state.url} /> 
          <button className="btn btnFetch" onClick={this.handleChange} name="fetchBtn" > Fetch </button>
        </div>
        
        <div className="videoContainer" >
        {
          !(this.state.fetched) && !(this.state.vId) &&
          <img className="imagePreview" width="420" height="315" alt="video preview"
          src={Yimage} />
        }
        {  this.state.vId &&
          <iframe className="videoPreview" width="420" height="315" src={ "https://www.youtube.com/embed/"+ this.state.vId}></iframe>
        }
        </div>
        
        <div className="videoAttributes" >
        
          <div className="videoQualitySelector">
            <label className="labelText" htmlFor="qualitySelect" >Select Quality</label>
            <select className="videoQuality" name="videoQuality" id="qualitySelect" defaultValue="medium"  onChange={this.handleChange} >
              <option value="audio" >Audio Only</option> 
              <option value="low">Low</option>
              <option value="medium" >Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        
          <div className="subtitleSelector"> 
            <label className="labelText" htmlFor="subInput" >With Subtitle</label>
            <input className="subtitleCheckbox" type="checkbox" id="subInput" name="subInput" onChange={this.handleChange} />
          </div>

        </div>
        
        <div className="videoDownload">
          <button className="btn btnDownload" onClick={this.onDownload} name="downloadBtn" > Download </button>
        </div>

        <Playlist state={this.state.playlist} />

      </div>
    )
  }

}

export default Downloader;