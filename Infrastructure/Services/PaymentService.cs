using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace Infrastructure.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IConfiguration _config;
        public PaymentService(IConfiguration config)
        {
            _config = config;
        }

        public async Task CreateOrUpdatePaymentIntent(UserPayment[] transactions)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];
            

            var service = new PaymentIntentService();

            PaymentIntent intent;

            var options = new PaymentIntentCreateOptions
            {
                Amount = (long) transactions.Sum(t => t.Amount * 100),
                Currency = "usd",
                PaymentMethodTypes = new List<string> {"card"}
            };
            intent = await service.CreateAsync(options); 
        }
    }
}