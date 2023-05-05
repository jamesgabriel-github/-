import { mailOptions, transporter} from "@/config/nodemailer";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

const handler = async (req, res) => {
    if(req.method === "POST"){
        const data = req.body;
        console.log("SEND EMAIL: ");
        console.log(req.body[1]);

        let username = data[0];
        let token = data[1];
        try{
            await transporter.sendMail({
                ...mailOptions,
                subject: "Email Activation",
                html: `
                        <center>
                        <h3>Hello ${username}</h3>
                        <p>Please Activate your Account by clicking this link below:</p>
                        <br>
                        <a href="http://localhost:3000/verify_email?token=${token}">Activate Account</a>
                        </center>
                        `
            });
            return res.status(200).json({success: true});
        }catch(error){
            console.log(error);
            return res.status(400).json({message: error.message});
        }
    }
    res.status(400).json({name: 'Bad Request'});
}

export default handler;