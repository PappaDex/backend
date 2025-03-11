using Microsoft.EntityFrameworkCore;
using ZbirkaIgara.Data;
using ZbirkaIgara.Mapping;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddDbContext<ZbirkaIgaraContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("ZbirkaIgaraContext")));

        builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
		builder.Services.AddAutoMapper(typeof(BackendAutoMapper));
		builder.Services.AddCors(o =>
        {
            o.AddPolicy("CorsPolicy", builder =>
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
        });

        var app = builder.Build();
        app.UseStaticFiles();
        app.UseDefaultFiles();
        app.MapFallbackToFile("index.html");
        app.UseSwagger();
        app.UseSwaggerUI();
        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();
        app.UseCors("CorsPolicy");
        app.Run();
    }
}
