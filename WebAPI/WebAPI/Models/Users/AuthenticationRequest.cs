using FluentValidation;

namespace WebAPI.Models.Users
{
    public class AuthenticationRequest
    {

        public string Username { get; set; }
        public string Password { get; set; }
    }
    
    public class AuthRequestValidator : AbstractValidator<AuthenticationRequest>
    {
        public AuthRequestValidator()
        {
            RuleFor(x => x.Username)
                .NotEmpty()
                .Matches("^[a-zA-Z0-9]*$");
            RuleFor(x => x.Password)
                .NotEmpty();
        }
    }
}

