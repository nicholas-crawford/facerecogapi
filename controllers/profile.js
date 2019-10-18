const handleprofile = (req, res, postgresDB) => {
    const { id } = req.params;
    postgresDB.select('*').from('users').where({
        id: id
    })
        .then(user => {
        if (user.length){
            res.json(user[0])
        } else {
            res.status(400).json('Not found')
        }
    })
    .catch(err => res.status(400).json('Error getting user'))
}

module.exports = {
    handleprofile: handleprofile
}