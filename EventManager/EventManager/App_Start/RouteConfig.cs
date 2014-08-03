using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace EventManager
{
    public class RouteConfig
    {
        public static void MapRoute()
        {

        }
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "EventOverview",
                url:"Event/{action}/{id}",
                defaults: new { controller = "EventOverviewController", action ="Index",id=UrlParameter.Optional}
            );
        }
    }
}
