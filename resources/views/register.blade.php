<!DOCTYPE html>
<html>
    <head>
        <title>Dev - Laravel</title>

        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">

        <style>
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                display: table;
                font-weight: 100;
                font-family: 'Lato';
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
            }

            .title {
                font-size: 96px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <h1>Dev - Register Page</h1>
                <div class="row">
                    <div class="col-md-12">
                        <form method="post" action="create">
                            <p>Email</p>
                            <input name="email" type="text">
                            <p>Password</p>
                            <input name="password" type="text">
                            <p>First Name</p>
                            <input name="firstName" type="text">
                            <p>Last Name</p>
                            <input name="lastName" type="text"><br>
                            <input value="register" type="submit">
                        </form>
                    </div>
            </div>
        </div>
    </body>
</html>
