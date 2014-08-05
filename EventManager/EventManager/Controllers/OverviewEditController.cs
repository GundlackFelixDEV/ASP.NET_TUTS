using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EventManager.Models;

namespace EventManager.Controllers
{
    public class OverviewEditController : Controller
    {
        private EventManager.Models.EventManager eventManager = new EventManager.Models.EventManager();

        // GET: Event
        public ActionResult Index()
        {
            return View("~/Views/Event/OverviewEdit.cshtml", eventManager.AllItems);
        }

        public ActionResult Start(string description)
        {
            eventManager.StartItem(description);
            return RedirectToAction("Index");
        }

        public ActionResult Edit(EventItem item)
        {
            eventManager.editItem(item);
            return RedirectToAction("Index");
        }
        public ActionResult Pending()
        {
            return RedirectToAction("Index", "Pending");
        }

        public ActionResult Overview()
        {
            return RedirectToAction("Index", "Overview");
        }
    }
}