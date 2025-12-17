using Microsoft.EntityFrameworkCore;
using Partify.Domain.Entities;
using Partify.Infrastructure.AppDbContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Partify.Infrastructure.Seed
{
    public class DatabaseSeeder
    {
        private readonly PortifyDbContext _context;

        public DatabaseSeeder(PortifyDbContext context)
        {
            _context = context;
        }

        public async Task SeedAsync()
        {
            await _context.Database.EnsureCreatedAsync();

            // Check if data already exists
            if (_context.Customers.Any() || _context.Suppliers.Any())
            {
                return; // Data already seeded
            }

            // Seed Customers
            var customers = new List<Customer>
            {
                new Customer
                {
                    Name = "Ahmed",
                    LastName = "Hussain",
                    Email = "ahmed.hussain@email.com",
                    PhoneNumber = "+93-700-123-456",
                    Address = "Kabul, Afghanistan",
                    CarModel = "Toyota Camry",
                    PlateNumber = "KAB-123-45",
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new Customer
                {
                    Name = "Fatima",
                    LastName = "Zahra",
                    Email = "fatima.zahra@email.com",
                    PhoneNumber = "+93-701-234-567",
                    Address = "Herat, Afghanistan",
                    CarModel = "Honda Civic",
                    PlateNumber = "HRT-234-56",
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new Customer
                {
                    Name = "Mohammad",
                    LastName = "Rahman",
                    Email = "mohammad.rahman@email.com",
                    PhoneNumber = "+93-702-345-678",
                    Address = "Mazar-i-Sharif, Afghanistan",
                    CarModel = "Ford Explorer",
                    PlateNumber = "MZR-345-67",
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new Customer
                {
                    Name = "Aisha",
                    LastName = "Khan",
                    Email = "aisha.khan@email.com",
                    PhoneNumber = "+93-703-456-789",
                    Address = "Kandahar, Afghanistan",
                    CarModel = "Nissan Altima",
                    PlateNumber = "KAN-456-78",
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new Customer
                {
                    Name = "Omar",
                    LastName = "Farid",
                    Email = "omar.farid@email.com",
                    PhoneNumber = "+93-704-567-890",
                    Address = "Jalalabad, Afghanistan",
                    CarModel = "Hyundai Sonata",
                    PlateNumber = "JAL-567-89",
                    CreatedAt = DateTimeOffset.UtcNow
                }
            };

            _context.Customers.AddRange(customers);
            await _context.SaveChangesAsync();

            // Seed Suppliers
            var suppliers = new List<Supplier>
            {
                new Supplier
                {
                    Name = "Auto Parts International",
                    ContactEmail = "parts@autointernational.af",
                    PhoneNumber = "+93-800-111-222",
                    Address = "Industrial Zone, Kabul",
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new Supplier
                {
                    Name = "Spare Parts Trading Co.",
                    ContactEmail = "sales@sparestrading.af",
                    PhoneNumber = "+93-800-222-333",
                    Address = "Market District, Herat",
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new Supplier
                {
                    Name = "Vehicle Solutions Ltd",
                    ContactEmail = "info@vehiclesolutions.af",
                    PhoneNumber = "+93-800-333-444",
                    Address = "Commercial Area, Mazar-i-Sharif",
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new Supplier
                {
                    Name = "Industrial Auto Supplies",
                    ContactEmail = "orders@industrialsupplies.af",
                    PhoneNumber = "+93-800-444-555",
                    Address = "Trade Center, Kandahar",
                    CreatedAt = DateTimeOffset.UtcNow
                }
            };

            _context.Suppliers.AddRange(suppliers);
            await _context.SaveChangesAsync();

            // Get seeded entities for relationships
            var seededCustomers = await _context.Customers.ToListAsync();
            var seededSuppliers = await _context.Suppliers.ToListAsync();

            // Seed Invoices
            var invoices = new List<Invoice>
            {
                new Invoice
                {
                    CustomerId = seededCustomers[0].Id,
                    ProductName = "Engine Oil Change",
                    Quantity = 1,
                    TotalCost = 150.00m,
                    CreatedAt = DateTimeOffset.UtcNow.AddDays(-5)
                },
                new Invoice
                {
                    CustomerId = seededCustomers[1].Id,
                    ProductName = "Brake Pads Replacement",
                    Quantity = 1,
                    TotalCost = 300.00m,
                    CreatedAt = DateTimeOffset.UtcNow.AddDays(-3)
                },
                new Invoice
                {
                    CustomerId = seededCustomers[2].Id,
                    ProductName = "Tire Rotation",
                    Quantity = 4,
                    TotalCost = 120.00m,
                    CreatedAt = DateTimeOffset.UtcNow.AddDays(-2)
                },
                new Invoice
                {
                    CustomerId = seededCustomers[3].Id,
                    ProductName = "Air Filter Replacement",
                    Quantity = 1,
                    TotalCost = 85.00m,
                    CreatedAt = DateTimeOffset.UtcNow.AddDays(-1)
                },
                new Invoice
                {
                    CustomerId = seededCustomers[4].Id,
                    ProductName = "Transmission Service",
                    Quantity = 1,
                    TotalCost = 450.00m,
                    CreatedAt = DateTimeOffset.UtcNow
                }
            };

            _context.Invoices.AddRange(invoices);
            await _context.SaveChangesAsync();

            // Seed Receipts
            var receipts = new List<Receipt>
            {
                new Receipt
                {
                    CustomerId = seededCustomers[0].Id,
                    Amount = 150.00m,
                    Note = "Payment for engine oil change",
                    CreatedAt = DateTimeOffset.UtcNow.AddDays(-5)
                },
                new Receipt
                {
                    CustomerId = seededCustomers[1].Id,
                    Amount = 300.00m,
                    Note = "Payment for brake pads replacement",
                    CreatedAt = DateTimeOffset.UtcNow.AddDays(-3)
                },
                new Receipt
                {
                    CustomerId = seededCustomers[2].Id,
                    Amount = 120.00m,
                    Note = "Payment for tire rotation service",
                    CreatedAt = DateTimeOffset.UtcNow.AddDays(-2)
                },
                new Receipt
                {
                    CustomerId = seededCustomers[3].Id,
                    Amount = 85.00m,
                    Note = "Payment for air filter replacement",
                    CreatedAt = DateTimeOffset.UtcNow.AddDays(-1)
                }
            };

            _context.Receipts.AddRange(receipts);
            await _context.SaveChangesAsync();

            // Seed Purchases
            var purchases = new List<Purchase>
            {
                new Purchase
                {
                    SupplierId = seededSuppliers[0].Id,
                    ProductName = "Engine Oil (5L)",
                    Quantity = 20,
                    TotalCost = 2000.00m,
                    AmountPaid = 2000.00m,
                    PurchaseDate = DateTimeOffset.UtcNow.AddDays(-10)
                },
                new Purchase
                {
                    SupplierId = seededSuppliers[1].Id,
                    ProductName = "Brake Pads Set",
                    Quantity = 15,
                    TotalCost = 3000.00m,
                    AmountPaid = 1500.00m,
                    PurchaseDate = DateTimeOffset.UtcNow.AddDays(-8)
                },
                new Purchase
                {
                    SupplierId = seededSuppliers[2].Id,
                    ProductName = "Tires (Various Sizes)",
                    Quantity = 25,
                    TotalCost = 7500.00m,
                    AmountPaid = 5000.00m,
                    PurchaseDate = DateTimeOffset.UtcNow.AddDays(-6)
                },
                new Purchase
                {
                    SupplierId = seededSuppliers[3].Id,
                    ProductName = "Air Filters",
                    Quantity = 50,
                    TotalCost = 1250.00m,
                    AmountPaid = 1250.00m,
                    PurchaseDate = DateTimeOffset.UtcNow.AddDays(-4)
                },
                new Purchase
                {
                    SupplierId = seededSuppliers[0].Id,
                    ProductName = "Transmission Fluid",
                    Quantity = 10,
                    TotalCost = 1800.00m,
                    AmountPaid = 0.00m,
                    PurchaseDate = DateTimeOffset.UtcNow.AddDays(-1)
                }
            };

            _context.Purchases.AddRange(purchases);
            await _context.SaveChangesAsync();

            // Seed Daily Financial Records (last 30 days)
            var dailyRecords = new List<DailyFinancialRecord>();
            var random = new Random();

            for (int i = 29; i >= 0; i--)
            {
                var date = DateTimeOffset.UtcNow.AddDays(-i);
                var revenue = random.Next(500, 2000);
                var expenses = random.Next(200, 800);
                var profit = revenue - expenses;

                dailyRecords.Add(new DailyFinancialRecord
                {
                    Revenue = revenue,
                    Expenses = expenses,
                    Profit = profit,
                    Date = date,
                    CreatedAt = date
                });
            }

            _context.DailyFinancialRecords.AddRange(dailyRecords);
            await _context.SaveChangesAsync();

            Console.WriteLine("Database seeded successfully!");
        }
    }
}