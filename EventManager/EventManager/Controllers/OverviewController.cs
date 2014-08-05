using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EventManager.Models;

namespace EventManager.Controllers
{
    public class OverviewController : Controller
    {
        private EventManager.Models.EventManager eventManager = new EventManager.Models.EventManager();

        // GET: Event
        public ActionResult Index()
        {
            return View("Overview", eventManager.AllItems);
        }

        public ActionResult Stop(int id)
        {
            eventManager.StopItem(id);
            return RedirectToAction("Index");
        }

        public ActionResult Start(string description)
        {
            eventManager.StartItem(description);
            return RedirectToAction("Index");
        }

        public ActionResult Delete(int id)
        {
            eventManager.DeletItem(id);
            return RedirectToAction("Index");
        }

        public ActionResult Edit()
        {
            return RedirectToAction("Index","OverviewEdit");
        }
        public ActionResult Pending()
        {
            return RedirectToAction("Index", "Pending");
        }
    }
}