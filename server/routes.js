import cors from 'cors';
import bodyParser from 'body-parser'
import yDownload from './downloader'


export default (app) => {
    
  app.use(cors({
    origin:'*',
    optionsSuccessStatus: 200,
    credentials:true
  }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/',function(req,res){
      return res.end('Do post on /download');
    })
        
  
    app.post('/download', function (req, res) {
    
      console.log('>>>>>>body>>>>>>>',req.body);
    
      const callback = (error,vInfo) => {
        if(error){
          return res.json({error:"wrong url",vInfo});
        }
        return res.json({error:null,vInfo});
      }
    
      const vParam={
        vId:req.body.vId,
        vQuality:req.body.vQuality,
        subtitle:req.body.subtitle
      }

      if(!vParam.vId){
        return res.json('provide video id');
      }

      yDownload(vParam, callback);
    
    });

}