using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EventLogger.Startup))]
namespace EventLogger
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
