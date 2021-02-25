var mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

var bdd = 'bdd'
var mdpbdd = 'mdp'
    // --------------------- BDD -----------------------------------------------------
mongoose.connect(`mongodb+srv://nomuser:${mdpbdd}@cluster0.sz709.mongodb.net/${bdd}?retryWrites=true&w=majority`,
    options,
    function(err) {
        if (err) {
            console.log(`error, failed to connect to the database because --> ${err}`);
        } else {
            console.info('*** Database Ticketac connection : Success ***');
        }
    }
);
