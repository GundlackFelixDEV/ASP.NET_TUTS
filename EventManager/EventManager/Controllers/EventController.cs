using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EventManager.Models;

namespace EventManager.Controllers
{
    public class EventController : Controller
    {
        private static EventManager.Models.EventManager eventManager = new EventManager.Models.EventManager();

        // GET: Event
        public ActionResult Index()
        {
            return View("CurrentEvents",eventManager.PendingItems);
        }

        public ActionResult Stop(int id)
        {
            eventManager.StopItem(id);
            return RedirectToAction("Index");
        }

        public ActionResult AddEvent()   
        {
            return PartialView("AddEvent",(object)"");
            return PartialView("../Views/Event/Partial/AddEvent", (object)"");
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

        public ActionResult Details()
        {
            return View("OverviewEvents",eventManager.AllItems);
        }
    }
}