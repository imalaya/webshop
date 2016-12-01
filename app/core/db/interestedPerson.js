/**
 * Created by Ju on 18.11.2016.
 */
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

function resultHandlerForQuery(resultId, resultState, username, firstName, lastName, emailAddress){
    console.log("Ergebnis: " + resultId);
    if (resultId == true){
        console.log("Nutzer ist new");
        insertNewInterestedPerson(firstName, lastName, username, emailAddress, resultHandlerForInsert);
    }

    if (resultState == false){
        console.log ("Nutzer ist noch kein User");
        resultHandlerForInsert(resultId);
    }
}

function resultHandlerForInsert(id){
    //TODO: Schicke E-Mail
    console.log("E-Mail wird geschickt.");
}

// Gibt die row oder true zurück.
function isInterestedPersonNew (username, firstName, lastName, emailAddress, callback) {
    pool.connect(function (err, client, done) {
        if (err) throw err; // Errorhandling
        // Datenbankabfrage
        client.query("SELECT id, \"isRegisteredUser\" FROM public.interested_persons WHERE username = '"+username+"'", function (err, result) {
            if (err) throw err; // Errorhandling
            done(); // close Clientconnection

            // If ID was found:
            if (result.rows[0] != undefined) {
                console.log("Die ID von " + username + " ist: " + result.rows[0].id + result.rows[0].isRegisteredUser);
                callback (result.rows[0].id, result.rows[0].isRegisteredUser, username, firstName, lastName, emailAddress);
            }

            // If ID was not found:
            else {
                console.log("Den Benuternamen: " + username + " gibt es nicht.");
                callback (true, true, username, firstName, lastName, emailAddress);
            }
        });
    });
}

function insertNewInterestedPerson(firstName, lastName, username, emailAddress, callback) {

    pool.connect(function (err, client, done) {
        if (err) throw err;

        // execute a query on our database
        var queryText = "INSERT INTO public.interested_persons (name, firstname, username, email, \"isRegisteredUser\") VALUES($1, $2, $3, $4, $5) RETURNING id";
        client.query(queryText, [lastName, firstName, username, emailAddress, false], function(err, result) {
            if (err) throw err;
            else{
                done(); // close Clientconnection
                console.log("Neuer Interessent eingefuegt in Zeile: " , result.rows[0].id);
                callback (result.rows[0].id);
            }
        });
    });
}