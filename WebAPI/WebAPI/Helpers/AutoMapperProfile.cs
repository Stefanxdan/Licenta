using AutoMapper;
using WebAPI.Entities;
using WebAPI.Models;
using WebAPI.Models.Users;

namespace WebAPI.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, AuthenticationResponse>();
            CreateMap<RegisterModel, User>();
            CreateMap<UpdateModel, User>();

        } 
    }
}