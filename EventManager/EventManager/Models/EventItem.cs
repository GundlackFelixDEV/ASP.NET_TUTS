using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventManager.Models
{
    public class EventItem
    {
        public EventItem()
        {
            Description = "";
            Id = -1;
        }
        public EventItem(string description, int id)
        {
            Description = description;
            Id = id;
        }

        public int Id { get; set; }
        public string Description { get; set; }

        private DateTime startTime = DateTime.Now;
        public DateTime Start 
        {
            get
            {
                return startTime;
            }
            set
            {
                if (value.CompareTo(End) > 0)
                {
                    throw new ArgumentException("It is not allowed to set the start time later than the end time");
                }
                else
                {
                    startTime = value;
                }
            }
        }

        private DateTime endTime = DateTime.Now;
        public DateTime End 
        { 
            get
            {
                return endTime;
            }
            set
            {
                if (value.CompareTo(Start) < 0)
                {
                    throw new ArgumentException("It is not allowed to set the end time earlier than the start time");
                }
                else
                {
                    endTime = value;
                }
            }
        }

        public TimeSpan Duration
        {
            get
            {
                return End-Start;
            }
        }

        public bool Equals(EventItem other)
        {
            if(other == null) return false;
            return (Id == other.Id);
        }
    }
}