/**
 * Created by Ju on 18.11.2016.
 */
var pg = require('pg');
var connectionString = "postgres://postgres:admin@localhost:5432/webshop";
var client = new pg.Client(connectionString);

exports.saveInterestedPerson = function(firstName, lastName, username, emailAddress) {
    var newInterestedPerson = isInterestedPersonNew(username);
    console.log("newInterestedPerson: " + newInterestedPerson);
    if (newInterestedPerson == true){
        console.log("Im true");
        insertNewInterestedPerson(firstName, lastName, username, emailAddress);
    }
//TODO
};

function isInterestedPersonNew (username) {

    client.connect(function (err) {
        if (err) throw err;
        // TODO: herausfinden, wie die callbackfunktion immplementiert wird. --> client.on('end', function(){console.log("Client was disconnected.");});
        // execute a query on our database
        client.query("SELECT id FROM public.interested_persons WHERE username = '"+username+"'", function (err, result) {
            if (err) throw err;

            // disconnect the client
            client.end(function (err) {
                if (err) throw err;
            });

            // If ID was found:
            if (result.rows[0] != undefined) {
                console.log("Die ID von " + username + " ist: " + result.rows[0].id); // outputs: { name: 'brianc' }
                var id = result.rows[0].id;
                return id;
            }

            // If ID was not found:
            else {
                console.log("Den Benuternamen: " + username + " gibt es nicht.");
                insertNewInterestedPerson(firstName, lastName, username, emailAddress);
                return true;
            }

        });
    });


}

function insertNewInterestedPerson(firstName, lastName, username, emailAddress) {

    client.connect(function (err) {
        if (err) throw err;

        // execute a query on our database
        var queryText = 'INSERT INTO public.interested_persons (name, firstname, username, email, \"isRegisteredUser\") VALUES($1, $2, $3, $4, $5) RETURNING id';
        client.query(queryText, [lastName, firstName, username, emailAddress, false], function(err, result) {
            if (err) throw err;
            else {
                var newlyCreatedUserId = result.rows[0].id;
                console.log(newlyCreatedUserId);
            }

            // disconnect the client
            client.end(function (err) {
                if (err) throw err;
            });

        });
    });

}