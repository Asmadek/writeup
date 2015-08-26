process.env.MAIL_URL = 'smtp://postmaster@writeup.pro:8c6eb1323a4a03b2387936f6fcd5e227@smtp.mailgun.org:25';

Accounts.emailTemplates.siteName = "WriteUp";
Accounts.emailTemplates.from = "WriteUp Admin <admin@writeup.pro>";

Accounts.emailTemplates.resetPassword.subject = function (user) {
   return "WriteUp - Восстановление пароля";
};
Accounts.emailTemplates.resetPassword.text = function (user, url) {
   return "Вы запросили восстановление пароля.\n"
     + " Чтобы назначить новый пароль, перейдите по следующей ссылке:\n\n"
     + url;
};
