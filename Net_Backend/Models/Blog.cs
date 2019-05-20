using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Blog
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Body { get; set; }
        public string Tags { get; set; }
        public DateTime DateToPublish { get; set; }
        public int StatusId { get; set; }
        public int UserId { get; set; }
        public string Slug { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int TotalCount { get; set; }
        public int cnt { get; set; }

    }
}
