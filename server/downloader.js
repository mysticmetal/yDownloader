import fs from 'fs';
import youtubedl from 'youtube-dl';
import path from 'path'

const rootDir = path.resolve(__dirname+'/../videos');

export default function download(vParam, callback) {

    var video = youtubedl('https://www.youtube.com/watch?v=' + vParam.vId, ['--format=18'], {cwd: rootDir, maxBuffer: Infinity});

    video.on('info', function (info) {
        console.log('Download started');
        console.log('filename: ' + info._filename);
        console.log('size: ' + info.size);
    });

    video.on('error',function(err){
        console.log(err)
        callback('wrong url',{vId:vParam.vId});
    });

    const videoFile = rootDir + '/' + vParam.vId + '.mp4';
    video.pipe(fs.createWriteStream(videoFile));

    video.on('end', () => {
        callback(null,{vId:vParam.vId});
    })
}
