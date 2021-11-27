using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Transactions
{
    public class TransactionDto
    {
        public Guid Id { get; set; }

        public decimal Amount { get; set; }

        public string Description { get; set; }

        public string Service{get; set;}

        public string TransactionType{get; set;}
        public DateTime CreateTime { get; set; } = DateTime.UtcNow;

        public DateTime DueTime {get; set;} = DateTime.UtcNow.AddDays(15);

        public string Username {get; set;}
    }
}