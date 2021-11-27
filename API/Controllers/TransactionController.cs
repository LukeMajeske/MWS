using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Transactions;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Roles="SuperAdmin, Client")]
    public class TransactionController : BaseApiController
    {
        [Authorize(Roles="SuperAdmin")]
        [HttpPost]
        public async Task<IActionResult> AddTransaction(UserPayment transaction){
            return HandleResult(await Mediator.Send(new Create.Command{Transaction = transaction}));
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetTransactions(string username)
        {
            return HandleResult(await Mediator.Send(new List.Query{Username = username}));
        }
    }
}