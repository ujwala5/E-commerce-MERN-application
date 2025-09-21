const { get_auth_service, generateToken, registerService, checkUsernameExists, getUserIdByEmail, resetPass_service, encryptedPassRes } = require("../services/user.service");
var jwt = require('jsonwebtoken');

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
        const bodyData = req.body.emailId;
        const forgotPassword_controller_res = await getUserIdByEmail(bodyData);
        console.log("forgotPassword_controller_res==>>", forgotPassword_controller_res);
        let userId = forgotPassword_controller_res[0].id;
        console.log("userId ==>", userId);

        const JWT_SECRET = process.env.JWT_SECRET_KEY || "my_secret_key";

        // Fake user (for demo purpose)
        const payload = {
            userId: userId
        };

        let token = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
        console.log("token==>>", token);

        res.send({
            "code": 200,
            "status": "Success",
            "message": "Data Inserted successfully",
            "data": `http://localhost:3000/V1/forgotPassword/${token}`
        })

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