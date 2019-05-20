using System.Collections.Generic;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services
{
    public interface IBlogService
    {
        void Delete(int blogsId);
        List<Blog> Get();
        Blog Get(int id);
        Paged<Blog> Get(int pageIndex, int pageSize);
        int Insert(BlogAddRequest model, int userId);
        void Update(BlogUpdateRequest model);
    }
}