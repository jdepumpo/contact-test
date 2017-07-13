var express = require('express');
var Mailgun = require('mailgun-js');
var app = express();

var port = process.env.PORT || 8080;

//Mailgun API key
var api_key = 'key-88275845393408d834b1942e9885649a';

//Your domain, from the Mailgun Control Panel
var domain = 'https://depumpo.com';

//Your sending email address
var from_who = 'dev@depumpo.com';

//Tell express to fetch files from the /js directory & /views directory
app.use(express.static(__dirname + '/js'));
//this solves the original CSS problem - allows express to access the directory
app.use(express.static(__dirname + '/views'));
//mailgun says to use jade - deprecated - use Pug instead
app.set('view engine', 'pug')

//Get index
app.get('/', function(req, res) {
    //render index.pug
    res.render('index', function(err, html) {
        if (err) {
            // log errors
            console.log(err); 
        }
        else { 
            //no error, send the html
            res.send(html)

        };
    });
});

// Get JS for send button
app.get('/sendbut/:mail', function(req,res) {

    //Pass the API & domain from above
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});

    var data = {
    //The email
      from: req.params.mail,
      to: 'dev@depumpo.com',
      subject: 'New Message - Contact Form',
      html: req.params.message,
    }

    //Method to send the email
    mailgun.messages().send(data, function (err, body) {
        //Error page, if error
        if (err) {
            res.render('error', { error : err});
            console.log("got an error: ", err);
        }
        //Else we can greet and leave
        else {
            //"submitted.pug" is the success landing page
            //Pass "email" for the success message
            res.render('submitted', { email : req.params.mail });
            console.log(body);
        }
    });

});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
