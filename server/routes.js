import fs from 'fs';
import path from 'path';
import mime from 'mime';
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
      res.end('Do post on /download');
    })
        
    app.post('/download', function (req, res) {
      console.log('>>>>>>>>>>>>>',req.body);
        yDownload(req.body.id, () => {
          res.status(200).json({id : req.body.id})
        })
    });

}