﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LocalBusiness.Models;

namespace LocalBusiness.Controllers
{
    public partial class BusinessController : Controller
    {
        // GET: Business
        public ActionResult Index()
        {
            Business myShop = new Business();
            return View(myShop);
        }
    }
}