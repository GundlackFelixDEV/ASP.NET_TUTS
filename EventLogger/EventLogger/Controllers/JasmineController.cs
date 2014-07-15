using System;
using System.Web.Mvc;

namespace EventLogger.Controllers
{
    public class JasmineController : Controller
    {
        public ViewResult Run()
        {
            return View("SpecRunner");
        }
    }
}
