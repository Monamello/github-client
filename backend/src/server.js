require('dotenv').config();
import app from './app';


app.set('view engine', 'ejs')

app.listen(3333);
