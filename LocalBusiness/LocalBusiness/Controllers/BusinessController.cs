using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LocalBusiness.Models;

namespace LocalBusiness.Controllers
{
    public class BusinessController : Controller
    {
        // GET: Business
        public ActionResult Index()
        {
            Business myShop = new Business();
            return View(myShop);
        }

        public ActionResult Events(List<BusinessEvent> aEventList)
        {
            return PartialView("_BusinessEvents", aEventList);
        }

        public ActionResult OpeningHours(Dictionary<DayOfWeek, BusinessSchedule> schedule)
        {
            return PartialView("_BusinessSchedule" , schedule.Values.ToList());
        }

        public ActionResult Contacts(BusinessContact contact)
        {
            return PartialView("_BusinessContacts" , contact);
        }
    }
}