using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EventManager.Models;

namespace EventManager.Controllers
{
    public class EventTypeController : Controller
    {
        private EventTypeMgr eventTypeManager = new EventTypeMgr();
        //
        // GET: /EventType/
        public ActionResult Index()
        {
            return View("EventTypes",eventTypeManager.EventTypes);
        }

        public ActionResult AddEventType()
        {
            return View(new EventType());
        }
        [HttpPost]
        public ActionResult AddEventType(EventType aEvent)
        {
            try
            {
                eventTypeManager.AddEventType(aEvent);
                return RedirectToAction("Index");
            }
            catch (DuplicatedShortTitleException e)
            {
                ModelState.AddModelError("TitleShort", e.Message);                
            }
            catch(Exception e)
            {
                ModelState.AddModelError("UnknownError", e);
            }
            return View("AddEventType", aEvent);
        }
	}
}