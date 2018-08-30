import React from 'react';

class Downloader extends React.Component{
  constructor(){
    super();
    this.state={
      url:'dsds',
      isTemplate:'',
      fetched:false,
      videoId:''

    }
    this.handleChange=this.handleChange.bind(this);
    this.onDownload=this.onDownload.bind(this);
  }

  handleChange(e){
    let value=e.target.value;
    switch(e.target.name){
      case 'urlInput':{
        this.setState({url:value});
        break;
      }
      case 'fetchBtn':{
        let urlParts = this.state.url.split('?v=')
        let videoId = urlParts.length > 1 ? urlParts[1] : this.state.url
        this.setState({fetched:true,videoId});
        console.log(this.state);
      }
    }
  }

  onDownload(e){
  }

  render(){
    return(
      <div>
        <h1 className="heading" >Ydownloader for downloading videos from youtube</h1>
        <input className="urlInput" name="urlInput" onChange={this.handleChange} placeholder="enter the url of video" type="url" value={this.state.url} /> 
        {console.log(!!(this.state.url))}
        
        { (!!(this.state.ulr)) && 
          <button className="btn btnClear" onClick={this.handleChange} name="clearBtn" > Clear </button>
        }
        
        <button className="btn btnFetch" onClick={this.handleChange} name="fetchBtn" > Fetch </button>
        {
          this.state.videoId &&
          <iframe width="420" height="315" src={ "https://www.youtube.com/embed/"+ this.state.videoId}></iframe>
        }
        
        
        <label htmlFor="qualitySelect" >Select Quality</label>
        <select name="videoQuality" id="qualitySelect" defaultValue="medium" >
          <option vlaue="audio" >Audio Only</option> 
          <option value="low">Low</option>
          <option value="medium" >Medium</option>
          <option value="high">High</option>
        </select>
        
        <label htmlFor="subInput" >With Subtitle</label>
        <input type="checkbox" id="subInput" name="subInput" />


        <button className="btn btnDownload" onClick={this.onDownload} name="downloadBtn" > Download </button>
      </div>
    )
  }

}

export default Downloader;