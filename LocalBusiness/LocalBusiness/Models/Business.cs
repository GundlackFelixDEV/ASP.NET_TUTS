using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Linq;
using System.Web;

namespace LocalBusiness.Models
{
    public class Business
    {
        public Business()
        {
            Titel = "Dummy Titel";
            Description = "Dummy Description";
            Events = new List<BusinessEvent>();
            Schedule = new Dictionary<DayOfWeek,BusinessSchedule>();
            Contact = new BusinessContact();
        }
        public string Titel { get; set; }
        public string Description { get; set; }
        public List<BusinessEvent> Events { get; set; }
        public Dictionary<DayOfWeek, BusinessSchedule> Schedule { get; set; }
       
        public BusinessContact Contact { get; set; }

        public void SetBusinessHourOn(DayOfWeek day, BusinessSchedule shedule)
        {
            Schedule[day] = shedule;
        }
    }
}