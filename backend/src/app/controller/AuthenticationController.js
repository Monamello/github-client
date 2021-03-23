import axios from 'axios';

class AuthenticationController{
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
        res.render('pages/login', {client_id: process.env.CLIENT_ID});
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
        console.log(response.data.access_token)

        res.render('pages/index', {access_token: response.data.access_token});
    }
}


export default new AuthenticationController();