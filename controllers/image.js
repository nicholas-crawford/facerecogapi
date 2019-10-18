const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '0e1a432fd5754beda381e43cdeca8476'
   });  

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Incorrect API'))
}

const handleImage = (req, res, postgresDB) => {
    const { id } = req.body;
    postgresDB('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}