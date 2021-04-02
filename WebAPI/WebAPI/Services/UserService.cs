using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Entities;
using WebAPI.Helpers;
using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI.Services
{
    public interface IUserService
    {
        Task<User> GetUserById(Guid id);
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> AddUser(RegisterModel request);
        Task<AuthenticationResponse> Authenticate(string username, string password);
    }
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly AppSettings _appSettings;

        public UserService(IUserRepository repository, IOptions<AppSettings> appSettings)
        {
            _repository = repository;
            _appSettings = appSettings.Value;
        }

        public async Task<User> AddUser(RegisterModel request)
        {
            var response = await _repository.CheckUsernameAndEmail(request.Username, request.Email);
            if (response == null)
                return null;
            var user = new User(request.Username, request.Email, request.FirstName, request.LastName, request.Password, Role.User, request.PhoneNumber);
            return await _repository.Add(user);
        }

        public async Task<AuthenticationResponse> Authenticate(string username, string password)
        {
            var user = await _repository.GetByUsernameAndPassword(username, password);
            if (user == null)
            {
                return null;
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new AuthenticationResponse
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Username = user.Username,
                Role = user.Role,
                Token = tokenHandler.WriteToken(token)
            };
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _repository.GetAll();
        }

        public async Task<User> GetUserById(Guid id)
        {
            return await _repository.GetById(id);
        }
    }
}
