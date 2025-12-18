using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Partify.API.Controllers.Base;
using Partify.Application.DTOs.Customers;
using Partify.Application.ServiceContracts;

namespace Partify.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : BaseController
    {
        private readonly ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerResponseDto>>> GetCustomers() => HandleResultResponse(await _customerService.GetCustomers());

        [HttpGet("{id:int}")]
        public async Task<ActionResult<CustomerResponseDto>> GetCustomerById(int id) => HandleResultResponse(await _customerService.GetCustomerById(id));

        [HttpPost]
        public async Task<ActionResult<CustomerResponseDto>> CreateCustomer([FromBody] CustomerAddDto customer)
        {
            var createdCustomer = await _customerService.CreateCustomer(customer);
            return HandleResultResponse(createdCustomer);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<CustomerResponseDto>> UpdateCustomer(int id, [FromBody] CustomerUpdateDto customer) => HandleResultResponse(await _customerService.UpdateCustomer(id, customer));

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<CustomerResponseDto>> DeleteCustomer(int id) => HandleResultResponse(await _customerService.DeleteCustomer(id));

        [HttpGet("{id:int}/outstanding")]
        public async Task<ActionResult<decimal>> GetOutstanding(int id) => HandleResultResponse(await _customerService.GetOutstanding(id));
    }
}
