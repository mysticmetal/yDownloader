import fs from 'fs';
import youtubedl from 'youtube-dl';
import path from 'path'

const rootDir = path.resolve(__dirname+'/../videos');

export default function download(vParam, callback) {
    
    let format='best';
    if(vParam.vQuality==='audio'){
        format='bestaudio/172/141/140/171/139';
    }else{
        if(vParam.vQuality==='low'){
            format='13/36/worst/43/17';
        }else{
            if(vParam.vQuality==='medium'){
                format='44/35/18/34';
            }else{
                format='37/46/45/best/22/44/35';
            }
        }
    }

    let video = youtubedl('https://www.youtube.com/watch?v=' + vParam.vId, [`--format=${format}`], {cwd: rootDir, maxBuffer: Infinity});

    video.on('info', function (info) {
        console.log('Download started');
        console.log('size: ' + info.size/(1024*1024));
        const title= info.title.substr(0,15);
        const videoFile = rootDir + '/' +title+'-'+vParam.vQuality+'-' +'-vId-'+ vParam.vId+'.'+ info.ext;
        video.pipe(fs.createWriteStream(videoFile));
        
    });

    video.on('error',function(err){
        console.log(err)
        callback('wrong url',{vId:vParam.vId});
    });
    
    video.on('end', () => {
        callback(null,{vId:vParam.vId});
    });

    if(vParam.subtitle){
        
        let options= {auto: false,all: false,lang: 'en',cwd: rootDir};

        youtubedl.getSubs('https://youtu.be/'+vParam.vId,options, function(err, files){ 
                                if (err){
                                    console.log('error in downloading subtitiles',err);
                                }else{
                                    console.log('subtitle files downloaded:', files);
                                }
        });
    }
    
}
