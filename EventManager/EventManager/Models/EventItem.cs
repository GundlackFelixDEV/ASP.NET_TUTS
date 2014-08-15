using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EventManager.Models
{
    [MetadataType(typeof(EventMetaData))]
    public partial class EventItem
    {
        public EventItem()
        {
            Titel = "";
            Description = "";
            Id = -1;
        }

        public EventItem(string titel, string description, int id)
        {
            Description = description;
            Id = id;
            Titel = titel;
        }


        public int Id { get; set; }
        public string Description { get; set; }
        public string Titel { get; set; }

        private DateTime startTime = DateTime.Now;
        public DateTime Start 
        {
            get { return startTime; }
            set { startTime = value; }
        }

        public TimeSpan StartTime
        {
            get { return startTime.TimeOfDay; }
        }

        public DateTime StartDate
        {
            get {return startTime.Date; }
        }

        private DateTime endTime = DateTime.Now;
        public DateTime End 
        { 
            get { return endTime; }
            set { endTime = value; }
        }
        public TimeSpan EndTime
        {
            get { return endTime.TimeOfDay; }
        }
        public DateTime EndDate
        {
            get{ return endTime.Date; }
        }

        public TimeSpan Duration
        {
            get { return End-Start; }
        }

        public bool Equals(EventItem other)
        {
            if(other == null) return false;
            return (Id == other.Id);
        }
    }

    public class EventMetaData
    {

        [Required, Display(Name = "Start"), DisplayFormat(DataFormatString = "{0:s}")]
        public object Start;

        [Display(Name = "Start"), DisplayFormat(DataFormatString = "{0:d}")]
        public object StartDate;

        [Display(Name = "Start"), DisplayFormat(DataFormatString = "{0:hh\\:mm\\:ss}")]
        public object StartTime;

        [Required, Display(Name = "Ende"), DisplayFormat(DataFormatString = "{0:s}")]
        public object End;

        [Display(Name = "Ende"), DisplayFormat(DataFormatString = "{0:d}")]
        public object EndDate;

        [Display(Name = "Ende"), DisplayFormat(DataFormatString = "{0:hh\\:mm\\:ss}")]
        public object EndTime;

        [Display(Name = "Dauer"), DisplayFormat(DataFormatString = "{0:hh\\:mm\\:ss}")]
        public object Duration;

        [Required, Display(Name = "ID")]
        public object Id;

        [Display(Name = "Beschreibung")]
        [MaxLength(32, ErrorMessage = "{0} darf aus max. {1} Zeichen bestehen.")]
        public object Description;

        [Display(Name = "Titel")]
        [Required(ErrorMessage = "{0} ist erforderlich."),
        MaxLength(32, ErrorMessage = "{0} darf aus max. {1} Zeichen bestehen."),
        MinLength(3, ErrorMessage = "{0} muss aus min. {1} Zeichen bestehen.")]
        public object Titel;
    }
}