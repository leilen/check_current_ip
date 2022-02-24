import * as Ip from 'ip';
import * as fs from 'fs';
import {path} from 'app-root-path';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config({path: `${path}/.env`});

const saveFilePath = `${path}/current_ip.txt`;

const main = async () => {
  const appName = process.env.app_name;
  let beforeIp = '';
  try {
    beforeIp = fs.readFileSync(saveFilePath, 'utf8');
  } catch (e) {}

  const currentIp = Ip.address();

  if (currentIp !== beforeIp) {
    try {
      await sendMail(
        'jh_yu@likealocal.co.kr',
        `${appName ? `[${appName}] ` : ''}IP changed: ${currentIp}`,
        `IP changed: ${currentIp}`,
      );
    } catch (e) {
      console.log(e);
      return;
    }
    fs.writeFileSync(saveFilePath, currentIp);
  }
};

const sendMail = async (to: string, title: string, content: string) => {
  return new Promise(async (resolve, reject) => {
    const host = process.env.mail_host;
    const user = process.env.mail_user;
    const pass = process.env.mail_password;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host,
      secure: true, // use SSL
      auth: {
        user,
        pass,
      },
    });
    const mailOptions = {
      from: user, // sender address
      to: to, // list of receivers
      subject: title, // Subject line
      html: `<div>${content}</div>`,
    };
    transporter.sendMail(mailOptions, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

main();