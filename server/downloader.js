import fs from 'fs';
import youtubedl from 'youtube-dl';
import path from 'path'

const rootDir = path.resolve(__dirname+'/../public');

console.log(rootDir);

export default function download(videoId, callback) {
  
    var video = youtubedl('https://www.youtube.com/watch?v=' + videoId, ['--format=18'], {cwd: rootDir, maxBuffer: Infinity});

    video.on('info', function (info) {
        console.log('Download started');
        console.log('filename: ' + info._filename);
        console.log('size: ' + info.size);
    });

    const videoFile = rootDir + '/' + videoId + '.mp4';
    video.pipe(fs.createWriteStream(videoFile));

    video.on('end', () => {
        callback()
    })
}
