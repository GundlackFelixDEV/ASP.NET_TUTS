using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using TimeSheet.Models;
using TimeSheet.Data;

namespace TimeSheet.Controllers
{
    public class EventController : Controller
    {
        EventRepository rep = new EventRepository();

        // GET: Event
        public ActionResult Index()
        {
            var events = EventRepository.Events;
            events.Sort((e1,e2) => DateTime.Compare(e1.StartTime,e2.StartTime));
            return View("Overview",events);
        }

        public ActionResult Edit(int id)
        {
            var aEvent = rep.FindById(id);
            return View(aEvent);
        }

        [HttpPost]
        public ActionResult Edit( TimeSheet.Models.Event aEvent)
        {
            if (!this.ModelState.IsValid)
            {
                return View();
            }

            rep.Save(aEvent);
            ViewBag.Message = "Event wurde gespeichert";
            return View(aEvent);
        }
    }
}