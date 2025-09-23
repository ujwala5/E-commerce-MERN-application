const { get_auth_service, generateToken, registerService, checkUsernameExists, getUserIdByEmail, resetPass_service, encryptedPassRes } = require("../services/user.service");
var jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const get_auth_controller = async (req, res) => {
    try {
        let bodydata = req.body;
        const get_auth_serviceRes = await get_auth_service(bodydata);
        console.log("get_auth_serviceRes ==>", get_auth_serviceRes);

        const getAuthToken = await generateToken(bodydata);
        console.log("getAuthToken ==>", getAuthToken);

        if (get_auth_serviceRes == null) {
            res.json({
                "code": 100,
                "status": "Failed",
                "message": "Invalid credentials"
            })
        } else {
            res.json({
                "code": 200,
                "status": "Success",
                "message": "Login successfully",
                "token": getAuthToken
            })
        }

    } catch (err) {
        console.log("err from get_auth_controller ==>", err.message);
        res.json({
            "code": 500,
            "status": "Failed",
            "message": "Internal server error"
        })
    }
}

const register_controller = async (req, res) => {
    try {
        const bodyData = req.body;

        const userNameExists = await checkUsernameExists(bodyData.email)

        if (!userNameExists) {
            const registerController = await registerService(bodyData);
            console.log(registerController);
            if (registerController.affectedRows > 0) {
                res.json({
                    "code": 200,
                    "status": "Success",
                    "message": "Data Inserted successfully"
                })
            }
        }
        else {
            res.json({
                "code": 100,
                "status": "failed",
                "message": "User already registered"
            })
        }


    } catch (err) {
        console.log("error in register controller", err);
    }
}

const forgotPassword_controller = async (req, res) => {
    try {
        const emailId = req.body.emailId;
        const forgotPassword_controller_res = await getUserIdByEmail(emailId);
        console.log("forgotPassword_controller_res==>>", forgotPassword_controller_res);
        if (forgotPassword_controller_res.length > 0) {

            let userId = forgotPassword_controller_res[0].id;
            console.log("userId ==>", userId);

            const JWT_SECRET = process.env.JWT_SECRET_KEY || "my_secret_key";

            // Fake user (for demo purpose)
            const payload = {
                userId: userId
            };

            let token = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
            console.log("token==>>", token);

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ID,
                    pass: process.env.APP_PASSWORD
                }
            });

            // Mail options
            let mailOptions = {
                from: process.env.EMAIL_ID,
                to: emailId,
                subject: "Reset your password",
                text: `Please click on the below link to reset your password : 
                
                http://localhost:3000/V1/forgotPassword/${token}`

            };

            // Send email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log("Error: ", error);
                }
                console.log("Email sent: " + info.response);
            });


            res.send({
                "code": 200,
                "status": "Success",
                "message": "Password reset link sent successfully",
                "data": `http://localhost:3000/V1/forgotPassword/${token}`
            })
        } else {
            res.send({
                "code": 404,
                "status": "Failed",
                "message": "Email Id is not registered"
            })
        }


    } catch (error) {
        console.log("error", error.message);
    }
}

const resetPass_controller = async (req, res) => {
    try {
        const bodyData = req.body.password;
        const id = req.params.id;

        const encryptedPass = await encryptedPassRes(bodyData);
        console.log("encryptedPass ==>>", encryptedPass);

        const resetPass_serviceRes = await resetPass_service(encryptedPass, id)
        console.log("resetPass_serviceRes ==>", resetPass_serviceRes);

        res.json({
            "code": 200,
            "status": "Success",
            "data": "Password updated successfully"
        })

    } catch (err) {
        console.log("error", err.message);

    }
}

module.exports = {
    get_auth_controller,
    register_controller,
    forgotPassword_controller,
    resetPass_controller
}