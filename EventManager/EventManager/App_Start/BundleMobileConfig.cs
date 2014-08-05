using System.Web;
using System.Web.Optimization;

namespace EventManager {
    public class BundleMobileConfig {
        public static void RegisterBundles(BundleCollection bundles) {
            bundles.Add(new ScriptBundle("~/bundles/jquerymobile")
                .Include("~/Scripts/jquery.mobile-{version}.js")
                .Include("~/Scripts/jquery-{version}.js"));

            bundles.Add(new StyleBundle("~/Content/Mobile/css")
                .Include("~/Content/Site.Mobile.css")
                .Include("~/Content/jquery.mobile-{version}.css"));            
        }
    }
}