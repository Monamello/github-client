require('dotenv').config();
import app from './app';


app.set('view engine', 'ejs')

app.listen(process.env.PORT || 3333);
