using FluentValidation;
using Partify.Application.DTOs.Customers;

namespace Partify.Application.DTOs.Customers.Validators;

public class CustomerAddDtoValidator : AbstractValidator<CustomerAddDto>
{
    public CustomerAddDtoValidator()
    {
        RuleFor(c => c.Name)
            .NotEmpty().WithMessage("Name is required")
            .MaximumLength(100).WithMessage("Name must be at most 100 characters");
         
        RuleFor(c => c.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Email must be a valid email address")
            .MaximumLength(150).WithMessage("Email must be at most 150 characters");

        RuleFor(c => c.PhoneNumber)
            .NotEmpty().WithMessage("Phone number is required")
            .Matches("^[+0-9]{7,20}$").WithMessage("Phone number must contain only digits and optional leading +, length 7-20");

        RuleFor(c => c.Address)
            .NotEmpty().WithMessage("Address is required")
            .MaximumLength(250).WithMessage("Address must be at most 250 characters");

        RuleFor(c => c.PlateNumber)
            .MaximumLength(20).WithMessage("Plate number must be at most 20 characters");
    }
}
