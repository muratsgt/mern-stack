exports.authRegister = (req, res) => {
    // TODO: register func.
    const { firstName, lastName, email, password } = req.body;

    console.log(
        `Fields:`,
        firstName,
        lastName,
        email,
        password
    );

    // TODO: validate the fields
    // TODO: is already registered before
    // TODO: crypt password
    // TODO: save the user to DB

    res.send("Register Completed.");
};

exports.authLogin = (req, res) => {
    // TODO: login func.
    res.send("Login Completed.");
};