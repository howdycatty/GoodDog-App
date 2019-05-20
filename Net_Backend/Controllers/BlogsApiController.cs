using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    [AllowAnonymous]
    [Authorize(Roles = "Admin")]
    [RoutePrefix("api/blogs")]

    public class BlogsApiController : BaseApiController
    {
        private IAuthenticationService<int> _auth;
        IBlogService _service = null;
        public BlogsApiController(IBlogService service, IAuthenticationService<int> auth)
        {
            _service = service;
            _auth = auth;
        }

        [Route, HttpPost]
        public HttpResponseMessage Add(BlogAddRequest model)
        {
            int userId = _auth.GetCurrentUserId();
            if (!ModelState.IsValid)
            {
                return CreateErrorResponse();
            }
            int id = _service.Insert(model, userId);
            ItemResponse<int> resp = new ItemResponse<int>();
            resp.Item = id;

            return Request.CreateResponse(HttpStatusCode.Created, resp);
        }

        [Route("{id:int}"), HttpPut]
        public HttpResponseMessage Update(int id, BlogUpdateRequest model)
        {
            if (!ModelState.IsValid)
            {
                return CreateErrorResponse();
            }
            _service.Update(model);
            SuccessResponse resp = new SuccessResponse();

            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }

        [Route, HttpGet]
        public HttpResponseMessage Get()
        {
            ItemsResponse<Blog> response = new ItemsResponse<Blog>();
            response.Items = _service.Get();
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage Get(int id)
        {
            ItemResponse<Blog> response = new ItemResponse<Blog>();
            response.Item = _service.Get(id);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            _service.Delete(id);
            SuccessResponse resp = new SuccessResponse();
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }

        [Route("{pageIndex:int}/{pageSize:int}"), HttpGet]
        public HttpResponseMessage Get(int pageIndex, int pageSize)
        {
            ItemResponse<Paged<Blog>> response = new ItemResponse<Paged<Blog>>();
            response.Item = _service.Get(pageIndex, pageSize);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

    }
}
