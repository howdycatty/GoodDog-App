using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class BlogAddRequest
    {
        [Required]
        [MinLength(2)]
        public string Title { get; set; }

        [Required]
        [MinLength(2)]
        public string Author { get; set; }

        [Required]
        [MinLength(25)]
        public string Body { get; set; }

        [Required]
        [MaxLength(200)]
        public string Tags { get; set; }

        [Required]
        public DateTime DateToPublish { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int? StatusId { get; set; }

        [Required]
        //[MaxLength(128)]
        //[RegularExpression(@"[^\w\.@-]$")]
        //[RegularExpression(@"/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/")]
        public string Slug { get; set; }
        
        public string PhotoUrl { get; set; }


    }
}
