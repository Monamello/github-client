import axios from 'axios';


class RepositoryController {

    /**
    * Returns a repository by user;
    */
    async repository(req, res) {
        const { user } = req.params;
        const { repo } = req.params;
        axios({
            method: 'get',
            url: `https://api.github.com/repos/${user}/${repo}`,

        }).then((response) => {
            return res.json({
                    id_repo: response.data.id,
                    name: response.data.name,
                    description: response.data.description,
                    url: response.data.owner.url
            });
        })
    }

    /**
    * Returns all repositories by user;
    */
    async repositories(req, res) {
        const { user } = req.params;
        axios({
            method: 'get',
            url: `https://api.github.com/users/${user}/repos`,

        }).then((response) => {
            return res.json(response.data.map((repo) => {
                return {
                    id_repo: repo.id,
                    name: repo.name,
                    description: repo.description,
                    url: repo.owner.url
                }}));
        });
    }

    /**
    * Returns all starred repositories by user;
    */
   async repositoriesStarred(req, res) {
    const { user } = req.params;
    axios({
        method: 'get',
        url: `https://api.github.com/users/${user}/starred`,
        headers: {
            'Authorization': req.headers.authorization
        }
    }).then((response) => {
        return res.json(response.data.map((repo) => {
            return {
                id_repo: repo.id,
                name: repo.name,
                description: repo.description,
                url: repo.owner.url
            }}));
        })
    }
}

export default new RepositoryController();