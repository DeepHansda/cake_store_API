var otpGenerator = require('otp-generator');
const smsService =async (req, res, next) => {

    try {
        const {core_type} = req.params
        switch(core_type){
            case 'OTP' : {
                const otp = await otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false });
                console.log(otp)
                
            }
        }
        next();
    }
    catch (err) {
        console.error(err)
    }
    

}