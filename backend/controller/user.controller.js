const { get_auth_service, generateToken } = require("../services/user.service");
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

module.exports = get_auth_controller;