using Resend;

namespace Thuto.Services
{
  public class EmailService
  {
    private readonly IResend _resend;
    private readonly IConfiguration _configuration;

    public EmailService(
        IResend resend,
        IConfiguration configuration)
    {
      _resend = resend;
      _configuration = configuration;
    }

    public async Task SendPasswordResetEmailAsync(
        string recipientEmail,
        string recipientName,
        string resetLink)
    {
      var senderEmail =
          _configuration["Resend:SenderEmail"];

      if (string.IsNullOrWhiteSpace(senderEmail))
      {
        throw new InvalidOperationException(
            "Resend sender email is not configured."
        );
      }

      var html = $"""
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>ThutoData Password Reset</h2>

                    <p>Hello {System.Net.WebUtility.HtmlEncode(recipientName)},</p>

                    <p>
                        We received a request to reset your ThutoData password.
                    </p>

                    <p>
                        Click the button below to create a new password:
                    </p>

                    <p>
                        <a href="{System.Net.WebUtility.HtmlEncode(resetLink)}"
                           style="
                               display:inline-block;
                               padding:12px 20px;
                               background:#2563eb;
                               color:white;
                               text-decoration:none;
                               border-radius:6px;
                           ">
                            Reset My Password
                        </a>
                    </p>

                    <p>
                        This link will expire in <strong>30 minutes</strong>.
                    </p>

                    <p>
                        If you did not request a password reset,
                        you can safely ignore this email.
                    </p>

                    <p>
                        ThutoData
                    </p>
                </body>
                </html>
                """;

      var message = new EmailMessage
      {
        From = senderEmail,
        To = recipientEmail,
        Subject = "ThutoData Password Reset",
        HtmlBody = html
      };

      await _resend.EmailSendAsync(message);
    }
  }
}
