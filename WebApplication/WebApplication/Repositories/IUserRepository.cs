using System.Threading.Tasks;
using WebApplication.Models;

namespace WebApplication.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        User GetByUsernameAndPassword(string username, string password);
    }
}