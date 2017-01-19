/**
 * Created by Ju on 18.11.2016.
 */
    /*
var pg = require('pg');
//var connectionString = "postgres://postgres:admin@localhost:5432/webshop"; --> Syntax für Clientverbindung
var dbconfig = {
    user: 'postgres', //env var: PGUSER
    database: 'webshop', //env var: PGDATABASE
    password: 'admin', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 3000 // how long a client is allowed to remain idle before being closed
};
var pool = new pg.Pool(dbconfig);

exports.saveInterestedPerson = function(firstName, lastName, username, emailAddress) {
    isInterestedPersonNew(username, firstName, lastName, emailAddress, resultHandlerForQuery);
};

function resultHandlerForQuery(result, username, firstName, lastName, emailAddress){
    console.log("Ergebnis: " + result);
    if (result == true){
        console.log("Im true");
        if(first=true)return;
        else insertNewInterestedPerson(firstName, lastName, username, emailAddress);
        var first = true; // TODO: bessere Lösung für doppel-Callback-handler finden!
    }
}

// Gibt die row oder true zurück.
function isInterestedPersonNew (username, firstName, lastName, emailAddress, callback) {
    pool.connect(function (err, client, done) {
        if (err) throw err; // Errorhandling
        // Datenbankabfrage
        client.query("SELECT id FROM public.interested_persons WHERE username = '"+username+"'", function (err, result) {
            if (err) throw err; // Errorhandling
            done(); // close Clientconnection

            // If ID was found:
            if (result.rows[0] != undefined) {
                console.log("Die ID von " + username + " ist: " + result.rows[0].id);
                callback (result.rows[0].id, username, firstName, lastName, emailAddress);
            }

            // If ID was not found:
            else {
                console.log("Den Benuternamen: " + username + " gibt es nicht.");
                insertNewInterestedPerson(firstName, lastName, username, emailAddress);
                callback (true, username, firstName, lastName, emailAddress);
            }
        });
    });
}

function insertNewInterestedPerson(firstName, lastName, username, emailAddress) {

    pool.connect(function (err, client, done) {
        if (err) throw err;

        // execute a query on our database
        var queryText = "INSERT INTO public.interested_persons (name, firstname, username, email, \"isRegisteredUser\") VALUES($1, $2, $3, $4, $5) RETURNING id";
        client.query(queryText, [lastName, firstName, username, emailAddress, true], function(err, result) {
            if (err) throw err;
            else{
            done(); // close Clientconnection
            console.log("Neuer Interessent eingefuegt in Zeile: " , result.rows[0].id);
            }
        });
    });
}
        */
var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:admin@localhost:5432/webshop';
var db = pgp(connectionString);

module.exports = {
    saveInterestedPerson: saveInterestedPerson,
    getAllPersons: getAllPersons
};

function getAllPersons(req, res, next) {
    db.any('select * from interested_persons')
        .then(function (data) {
            res.status(200)
                .json({
                    //status: 'success',
                    data: data
                    //message: 'Retrieved ALL articles'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


function saveInterestedPerson(req, res, next) {
    req.body.isRegisteredUser = req.body.isRegisteredUser.toString();
    db.none('insert into interested_persons(name, firstname, username, email, isRegisteredUser\"isRegisteredUser\") values ($1, $2, $3, $4, $5)',
        [req.body.name, req.body.firstname, req.body.username, req.body.email, req.body.isRegisteredUser])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one interested_persons'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}