using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.ProgressNotes
{
    public class ProgressNoteDto
    {

        public int Id { get; set; }

        public string Body { get; set; }

        public string Author { get; set; }

        public int ProgressAmount {get; set;} 

        public DateTime CreateAt { get; set; }
        
    }
}