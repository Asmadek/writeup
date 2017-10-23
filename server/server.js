process.env.MAIL_URL = '';

Accounts.emailTemplates.siteName = "WriteUp";
Accounts.emailTemplates.from = "WriteUp Admin <admin@writeup.pro>";

Accounts.emailTemplates.resetPassword.subject = function (user) {
	return "WriteUp - Восстановление пароля";
};
Accounts.emailTemplates.resetPassword.text = function (user, url) {
    return "Вы запросили восстановление пароля.\n" +
    " Чтобы назначить новый пароль, перейдите по следующей ссылке:\n\n" +
    url;
};

if (process.env.ROOT_URL == "http://urfu.writeup.pro")
	Kadira.connect('', '');
