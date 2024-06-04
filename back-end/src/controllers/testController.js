const testController = async (req, res) => {
    res.status(200).send({ mesage: 'Hello World' });

}


module.exports = {
    testController
}