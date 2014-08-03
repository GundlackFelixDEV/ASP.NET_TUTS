﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EventManager.Models;

namespace EventManager.Controllers
{
    public class EventOverviewController : Controller
    {
        private EventManager.Models.EventManager eventManager = new EventManager.Models.EventManager();

        // GET: Event
        public ActionResult Index()
        {
            return View("~/Views/Event/OverviewEvents.cshtml", eventManager.AllItems);
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

        public ActionResult Pending()
        {
            return RedirectToAction("Index", "Event");
        }
    }
}