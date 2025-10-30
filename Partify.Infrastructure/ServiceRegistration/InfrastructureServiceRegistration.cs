using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Partify.Domain.RespositoryContracts.Base;
using Partify.Infrastructure.AppDbContext;
using Partify.Infrastructure.Interceptor;
using Partify.Infrastructure.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Partify.Infrastructure.ServiceRegistration
{
    public static class InfrastructureServiceRegistration
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Register your infrastructure services here
            // e.g., DbContext, Repositories, etc.
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<AuditInterceptor>();
            services.AddDbContext<PortifyDbContext>((serviceProvider, options) => {

                var interceptor = serviceProvider.GetRequiredService<AuditInterceptor>();

                var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production";

                if (environment == "Development")
                {
                    options.UseSqlite(
                        configuration.GetConnectionString("DefaultConnection")
                    ).AddInterceptors(interceptor);
                }
                else
                {
                    options.UseSqlServer(
                        configuration.GetConnectionString("DefaultConnection")
                    ).AddInterceptors(interceptor);
                }
            });

            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            return services;
        }
    }
}
