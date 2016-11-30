/**
 * Created by Ju on 18.11.2016.
 */

exports.db = function(username) {

    var pg = require('pg');
    var connectionString = "postgres://postgres:admin@localhost:5432/webshop";
    var client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) throw err;

        // execute a query on our database
        client.query("SELECT email FROM public.interested_persons WHERE username = '"+username+"'", function (err, result) {
            if (err) throw err;

            // just print the result to the console
            //console.log(result.rows); // outputs: { name: 'brianc' }

            // result in String:

            if (tester != undefined) {
                console.log(test1[3]);
            }
            else console.log("Den Usernamen: " +username + " gibt es nicht.")

            // disconnect the client
            client.end(function (err) {
                if (err) throw err;
            });
        });
    });
};