using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EventLogger.Models;
using EventLogger.Data;

namespace EventLogger.Controllers
{
    public class EventController : Controller
    {
        EventRepository rep = new EventRepository();
        EventQueue evQueue = EventRepository.events;
        // GET: Event
        public ActionResult Index()
        {
            List<Event> events = evQueue.getEvents();
            ViewBag.Message = evQueue.ValidationMessage;            
            return View("Index",events);
        }

        public ActionResult CreateStart()
        {
            try
            {
                evQueue.addStartEvent();
            }
            catch(ApplicationException e)
            {
                ViewBag.ErrorMessage = e.Message;
            }
            List<Event> events = evQueue.getEvents();
            ViewBag.Message = evQueue.ValidationMessage;
            return View("Index", events);
            //return RedirectToAction("Index");
        }

        public ActionResult CreateStop()
        {
            try
            {
                evQueue.addStopEvent();
            }
            catch (ApplicationException e)
            {
                ViewBag.ErrorMessage = e.Message;
            }
            return RedirectToAction("Index");
        }

        public ActionResult CreateBreak()
        {
        try
            {
                evQueue.addBreakEvent();
            }
            catch (ApplicationException e)
            {
                ViewBag.ErrorMessage = e.Message;
            }
        return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            Event aEvent = evQueue.findById(id);
            evQueue.removeEvent(aEvent);
            return RedirectToAction("Index");
        }

        public ActionResult Delete(Event aEvent)
        {
            return Delete(aEvent.Id);
        }
    }
}