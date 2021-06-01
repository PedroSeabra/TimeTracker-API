import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { EmailServiceException } from '../utils/Errors.js';

const port = 587;
const host = 'smtp.gmail.com';

export class Mailer {
  private _transporter: Mail | undefined;
  private _from: string;
  private _to: string[] | undefined;
  private _subject: string | undefined;
  private _content: string | undefined;
  private _contentType: 'html' | 'text' | undefined;

  constructor(user: string, password: string) {
    this._from = user;
    try {
      this._transporter = nodemailer.createTransport({
        host,
        port,
        auth: {
          user: user,
          pass: password,
        },
      });
    } catch (e) {
      console.error('Erro: ' + e);
    }
  }

  setTo = (emailList: string[]) => {
    this._to = emailList;
  };

  setSubject = (subject: string) => {
    this._subject = subject;
  };

  setContent = (type: 'html' | 'text', content: string) => {
    this._content = content;
    this._contentType = type;
  };

  sendEmail = async () => {
    try {
      if (
        this._transporter &&
        this._from &&
        this._to &&
        this._content &&
        this._contentType &&
        this._subject
      )
        await this._transporter.sendMail({
          from: this.from, // sender address
          to: this._to.join(', '), // list of receivers
          subject: this._subject, // Subject line
          text:
            this._contentType === 'text'
              ? this._content
              : this._content.replace(/<.+>/, ''), // plain text body
          html: this._contentType === 'html' ? this._content : undefined, // html body
        });
    } catch (e) {
      throw new EmailServiceException();
    }
  };

  get transporter() {
    return this._transporter;
  }

  get from() {
    return this._from;
  }

  get to() {
    return this._to;
  }

  get subject() {
    return this._subject;
  }

  get content() {
    return this._content;
  }

  get contentType() {
    return this._contentType;
  }
}
