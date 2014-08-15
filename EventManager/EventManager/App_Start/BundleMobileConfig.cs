using System.Web;
using System.Web.Optimization;

namespace EventManager {
    public class BundleMobileConfig {
        public static void RegisterBundles(BundleCollection bundles) {
            bundles.Add(new ScriptBundle("~/bundles/jquerymobile").Include(
                "~/Scripts/jquery.mobile-{version}.js",
                "~/Scripts/jquery-{version}.js"));

            bundles.Add(new StyleBundle("~/Content/Mobile/css").Include(
                "~/Content/Site.Mobile.css",
                "~/Content/bootstrap.css",
                "~/Content/jquery.mobile-{version}.css"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/Scripts/jquery.validate.js",
                "~/Scripts/jquery.validate.unobtrusive.js"));
        }
    }
}