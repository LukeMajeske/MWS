using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class UserPayment
    {
        public Guid Id { get; set; }

        public decimal Amount { get; set; } = 0.00m;

        public string Description { get; set; }

        public string Service{get; set;} //Describes the type of service performed

        public string TransactionType{get; set;} = "Debit";//Type of transaction (Credit, Debit, Refund, etc)

        public DateTime CreateTime { get; set; } = DateTime.UtcNow;

        public DateTime DueTime {get; set;} = DateTime.UtcNow.AddDays(15);

        public string UserId{get; set;}
        public AppUser User { get; set; }
    }
}