import koa from 'koa';
import serve from 'koa-static';
import mount from 'koa-mount';
import cors from 'koa-cors';

import home from './routes/home.js';

import api from './api';


const app = koa();

app.use(cors({origin: 'http://localhost:8080'}));

app.use(mount('/assets', serve('public')));

app.use(api.routes());

/*app.use('/assets', express.static('public'));

app.set('views', './views');
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
*/

app.use(home.routes());
//app.use(home.routes());

var port = process.env.PORT || 3000;

app.listen(port, ()=>{
  console.log('Server running on port 3000...');
});
