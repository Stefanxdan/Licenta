using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using WebAPI.Entities;
using WebAPI.Helpers;
using WebAPI.Models.Users;
using WebAPI.Repositories;

namespace WebAPI.Services
{
    public interface IUserService
    {
        Task<User> GetUserById(Guid id);
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> AddUser(RegisterModel request);
        Task<bool> DeleteUser(Guid id);
        Task<bool> UpdateUser(Guid id, UpdateUserModel request);
        Task<AuthenticationResponse> Authenticate(string username, string password);
        Task<IEnumerable<Post>> GetFavoritePosts(Guid userId);
    }
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IFavoritePostRepository _favoritePostRepository;
        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;

        public UserService(IUserRepository repository, IOptions<AppSettings> appSettings, IMapper mapper, IFavoritePostRepository favoritePostRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _favoritePostRepository = favoritePostRepository;
            _appSettings = appSettings.Value;
        }

        public async Task<User> AddUser(RegisterModel request)
        {
            var response = await _repository.CheckUsernameAndEmail(request.Username, request.Email);
            if (response != null)
                return null;
            var user = _mapper.Map<User>(request);
            user.Role = Role.User;
            //var user = new User(request.Username, request.Email, request.FirstName, request.LastName, request.Password, Role.User, request.PhoneNumber);
            return await _repository.Add(user);
        }

        public async Task<bool> DeleteUser(Guid id)
        {
            var status = await _repository.Remove(id);
            return status;        
        }

        public async Task<bool> UpdateUser(Guid id, UpdateUserModel request)
        {
            var status = await _repository.Update(id, _mapper.Map<User>(request));
            return status;
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

            var response = _mapper.Map<AuthenticationResponse>(user);
            response.Token = tokenHandler.WriteToken(token);
            return response;
        }

        public async Task<IEnumerable<Post>> GetFavoritePosts(Guid userId)
        {
            return await _favoritePostRepository.GetFavPostsByUserId(userId);
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
