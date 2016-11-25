/**
 * Created by Ju on 18.11.2016.
 */

exports.db = function() {

    var pg = require('pg');
    var connectionString = "postgres://postgres:admin@localhost:5432/webshop";
    var client = new pg.Client(connectionString);
    console.log("hier her gekommen");
    client.connect(function (err) {
        if (err) throw err;

        // execute a query on our database
        client.query("SELECT \"email\" FROM public.interested_persons WHERE name = 'name'", function (err, result) {
            if (err) throw err;

            // just print the result to the console
            console.log(result.rows[0]); // outputs: { name: 'brianc' }

            // disconnect the client
            client.end(function (err) {
                if (err) throw err;
            });
        });
    });
};