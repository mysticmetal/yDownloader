import express from 'express';
import Routes from './routes';

var app = express();

Routes(app);


const PORT = process.env.PORT || 9000;

app.listen(PORT, function () {
    console.log('Server listening on: ' + PORT);
});
