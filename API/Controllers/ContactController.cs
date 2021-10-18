using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;

namespace API.Controllers
{
    public class ContactController : BaseApiController
    {
        [AllowAnonymous]
        [HttpPost]
        public void SendContactEmail(EmailDto email){

            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);

            smtpClient.Credentials = new System.Net.NetworkCredential("mws.webapp@gmail.com", "MWS2021?");
            // smtpClient.UseDefaultCredentials = true; // uncomment if you don't want to use the network credentials
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtpClient.EnableSsl = true;
            MailMessage mail = new MailMessage();

            //Setting From , To and CC
            mail.From = new MailAddress("mws.webapp@gmail.com", "MWS");
            mail.To.Add(new MailAddress("majeskewebservices@gmail.com"));
            mail.Subject = email.fromEmail;
            mail.Body = email.Body;

            smtpClient.Send(mail);
        }
    }
}