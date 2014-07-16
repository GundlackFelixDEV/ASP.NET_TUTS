using System;
using System.Collections.Generic;
using System.Web.Mvc;
using EventLogger.Models;
using EventLogger.Data;

namespace EventLogger.Controllers
{
    public class EventController : Controller
    {
        EventRepository rep = new EventRepository();
        EventQueue evQueue = EventRepository.events;

        public void validateEventQueue()
        {
            if (evQueue.IsValid != 0)
            {
                ViewData.ModelState.AddModelError("InvalidModelState", evQueue.ValidationMessage);
            }   
        }
        // GET: Event
        public ActionResult Index()
        {
            List<Event> events = evQueue.getEvents();
            validateEventQueue();       
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
                ViewData.ModelState.AddModelError("CreateStart", e.Message);
            }            
            List<Event> events = evQueue.getEvents();
            validateEventQueue();
            return View("Index", events);
        }

        public ActionResult CreateStop()
        {
            try
            {
                evQueue.addStopEvent();
            }
            catch (ApplicationException e)
            {
                ViewData.ModelState.AddModelError("CreateStop", e.Message);
            }
            List<Event> events = evQueue.getEvents();
            validateEventQueue();
            return View("Index", events);
        }

        public ActionResult CreateBreak()
        {
        try
            {
                evQueue.addBreakEvent();
            }
            catch (ApplicationException e)
            {
                ViewData.ModelState.AddModelError("CreateStop", e.Message);
            }
            List<Event> events = evQueue.getEvents();
            validateEventQueue();
            return View("Index", events);
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