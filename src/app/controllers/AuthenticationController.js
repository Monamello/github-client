import axios from 'axios';

class AuthenticationController{

    /**
    * Return all info by user from github account
    */
    async getUserInfos(req, res){
        axios({
            method: 'get',
            url: `https://api.github.com/user`,
            headers: {
                'Authorization': req.headers.authorization
            }
          }).then((response) => {
            return res.json(response.data)
          })
    }

    /**
     * Redirect to page with an option to authenticate
     * with github account
     */
    async redirectToLogin(req, res){
        res.render('login', {client_id: process.env.CLIENT_ID});
    }

    /**
     * Callback route called by github after success
     * authentication
     */
    async callbackRoute(req, res) {
        const response = await axios({
            method: 'post',
            url: `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.query.code}`,
            headers: {
                'Accept': 'application/json'
            }
          })

        res.render('index', {access_token: response.data.access_token});
    }
    /**
    * Redirect to route /login
    */
    async redirectToRouteLogin(req, res) {
        res.redirect('/login');
    }
}


export default new AuthenticationController();