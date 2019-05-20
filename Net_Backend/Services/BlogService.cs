using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class BlogService : IBlogService
    {
        private IDataProvider _dataProvider;

        public BlogService(IDataProvider dataProvider) // IDataProvider  injected as an Interface
        {
            _dataProvider = dataProvider;
        }

        public int Insert(BlogAddRequest model, int userId)
        {
            int blogId = 0;
            if (model == null)
            {
                throw new ArgumentNullException("A parameter model is required");
            }
            string storedProc = "[dbo].[Blogs_Insert]";

            _dataProvider.ExecuteNonQuery(storedProc
                , delegate (SqlParameterCollection sqlParams)
                {
                    MapParameters(model, sqlParams);
                    sqlParams.AddWithValue("@UserId", userId);

                    SqlParameter idParameter = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                    idParameter.Direction = System.Data.ParameterDirection.Output;

                    sqlParams.Add(idParameter);
                }
                , returnParameters: delegate (SqlParameterCollection param)
                {
                    int.TryParse(param["@Id"].Value.ToString(), out blogId);
                }
                ///////////////////



                ////////////////////////
                );
            return blogId;
        }

        public void Update(BlogUpdateRequest model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("A parameter model is required");
            }
            string storedProc = "[dbo].[Blogs_Update]";

            _dataProvider.ExecuteNonQuery(storedProc
                , delegate (SqlParameterCollection sqlParams)
                {
                    sqlParams.AddWithValue("@Id", model.Id);
                    MapParameters(model, sqlParams);
                });
        }

        public List<Sabio.Models.Domain.Blog> Get()
        {
            string storedProc = "[dbo].[Blogs_SelectAll]";

            List<Sabio.Models.Domain.Blog> list = null;
            _dataProvider.ExecuteCmd(storedProc
               , inputParamMapper: delegate (SqlParameterCollection paramCollection)
               {
               }
               , singleRecordMapper: delegate (IDataReader reader, short set)
               {
                   Blog blog = MapBlog(reader);
                   if (list == null)
                   {
                       list = new List<Sabio.Models.Domain.Blog>();
                   }

                   list.Add(blog);
               }
               );

            return list;
        }

        private static Blog MapBlog(IDataReader reader)
        {
            Sabio.Models.Domain.Blog blog = new Blog();
            int startingIndex = 0;
            blog.Id = reader.GetSafeInt32(startingIndex++);
            blog.Title = reader.GetSafeString(startingIndex++);
            blog.Author = reader.GetSafeString(startingIndex++);
            blog.Body = reader.GetSafeString(startingIndex++);
            blog.Tags = reader.GetSafeString(startingIndex++);
            blog.DateToPublish = reader.GetSafeDateTime(startingIndex++);
            blog.StatusId = reader.GetSafeInt32(startingIndex++);
            blog.UserId = reader.GetSafeInt32(startingIndex++);
            blog.Slug = reader.GetSafeString(startingIndex++);
            blog.PhotoUrl = reader.GetSafeString(startingIndex++);
            blog.DateCreated = reader.GetSafeDateTime(startingIndex++);
            blog.DateModified = reader.GetSafeDateTime(startingIndex++);
            

            return blog;
        }

        public Sabio.Models.Domain.Blog Get(int id)
        {
            Sabio.Models.Domain.Blog blog = null;
            string procName = "[dbo].[Blogs_SelectById]";
            _dataProvider.ExecuteCmd(procName
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);

                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    blog = MapBlog(reader);

                }
                );
            return blog;
        }


        /// ////////////////////////////////////////////////
        public Paged<Blog> Get(int index, int size)
        {
            List<Blog> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Blogs_PaginationWithCount]";
            _dataProvider.ExecuteCmd(procName
              , inputParamMapper: delegate (SqlParameterCollection paramCollection)
              {
                  paramCollection.AddWithValue("@PageIndex", index);
                  paramCollection.AddWithValue("@PageSize", size);
              }
              , singleRecordMapper: delegate (IDataReader reader, short set)
              {
                  int startingIndex = 12;
                  Blog blog = MapBlog(reader);
                  blog.TotalCount = reader.GetSafeInt32(startingIndex++);
                  blog.cnt = reader.GetSafeInt32(startingIndex++);
                  if (totalCount == 0)
                  {
                      totalCount = blog.TotalCount;
                  }

                  if (list == null)
                  {
                      list = new List<Blog>();
                  }

                  list.Add(blog);
              }
              );

            Paged<Blog> page = null;
            if (list != null)
            {
                page = new Paged<Blog>(list, index, size, totalCount);
            }

            return page;
        }
        /// //////////////////////////////////////////////////////

        public void Delete(int blogsId)
        {
            string storedProc = "[dbo].[Blogs_Delete]";

            _dataProvider.ExecuteNonQuery(storedProc
                , delegate (SqlParameterCollection sqlParams)
                {
                    sqlParams.AddWithValue("@Id", blogsId);

                });
        }

        private static void MapParameters(BlogAddRequest model, SqlParameterCollection sqlParams)
        {
            sqlParams.AddWithValue("@Title", model.Title);
            sqlParams.AddWithValue("@Author", model.Author);
            sqlParams.AddWithValue("@Body", model.Body);
            sqlParams.AddWithValue("@Tags", model.Tags);
            sqlParams.AddWithValue("@DateToPublish", model.DateToPublish);
            sqlParams.AddWithValue("@StatusId", model.StatusId);
            sqlParams.AddWithValue("@Slug", model.Slug);
            sqlParams.AddWithValue("@PhotoUrl", model.PhotoUrl);
        }
    }
}
