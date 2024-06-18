import nodemailer from "nodemailer";

export const sendMessageToEmail = (receiver,theme,message) =>{
    let mailData = {
        from: 'nikitakarebo810@gmail.com',
        to: receiver,
        subject: theme,
        html: message
    }
    nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: false,
        service: 'gmail',
        auth: {
            user: 'nikitakarebo810@gmail.com', 
            pass: 'tioglimudrtemvgw'
        }
    }).sendMail(mailData, (err,info) => {
        if(err) return console.log(err)
        else console.log('Email send successful')
    })
}