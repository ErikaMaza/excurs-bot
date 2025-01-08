import { transport } from "../services/email.service";

export async function sendEmail(email){
    transport.sendMail({
        from: "",
        to: email,
        subject: "Экскурсия",
        text: ""
    })
}