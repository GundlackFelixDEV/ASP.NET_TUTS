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
        private EventMgr eventManager = new EventMgr();

        // GET: Event
        public ActionResult Index()
        {
            return RedirectToAction("Pending");           
        }

        public ActionResult Pending()
        {
            return View("Pending", eventManager.PendingItems); 
        }

        public ActionResult Overview()
        {
            return View("Overview", eventManager.AllItems);
        }

        public ActionResult Edit(int id)
        {
            EventItem item = null;
            try
            {
                item = eventManager.FindItem(id);
                return View("EditEvent",item);
            }
            catch(Exception e)
            {
                ModelState.AddModelError("Error",e.Message);
                return RedirectToAction(this.CurrentView);
            }
        }

        [HttpPost]
        public ActionResult Edit(EventItem item)
        {
            if(ModelState.IsValid)
            {
                try
                {
                    eventManager.EditItem(item);
                }
                catch(Exception e)
                {
                    ModelState.AddModelError("Error",e.Message);
                }
            }
            return RedirectToAction(this.CurrentView,item);
        }

        public ActionResult Stop(int id)
        {
            try
            {
                eventManager.StopItem(id);
            }
            catch(Exception e)
            {
                ModelState.AddModelError("Error",e.Message);
            }
            return RedirectToAction(this.CurrentView);
        }

        [HttpPost]
        public ActionResult StartEvent(EventItem startItem)
        {
            return Start(startItem.Titel);
        }

        public ActionResult StartEvent()
        {
            EventItem item = new EventItem();
            return PartialView("_StartEvent", item);
        }

        [HttpPost]
        public ActionResult Start(string titel)        
        {
            try
            {
                if (ModelState.IsValid)
                {
                    eventManager.StartItem(titel);
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("Error", e.Message);
            }
            return RedirectToAction(this.CurrentView);
        }

        public ActionResult Delete(int id)
        {
            try
            {
                eventManager.DeletItem(id);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("Error", e.Message);
            }
            return RedirectToAction(this.CurrentView);
        }

        public string CurrentView
        {
            get{
                return System.Web.HttpContext.Current.Request.UrlReferrer.Segments.Last();
            }
        }
    }
}