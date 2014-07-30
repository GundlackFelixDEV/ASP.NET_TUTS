using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventManager.Models
{
    public class EventManager
    {
        private List<EventItem> pendingItems = new List<EventItem>();
        private List<EventItem> items = new List<EventItem>();


        public List<EventItem> PendingItems
        {
            get
            {
                return pendingItems;
            }
        }

        public List<EventItem> AllItems
        {
            get
            {
                return items;
            }
        }

        public void StartItem(string description)
        {
            int id = (items.Count>0)?items.Max(f => f.Id):0;

            EventItem newItem = new EventItem(description,++id);
            pendingItems.Add(newItem);
            items.Add(newItem);
        }

        public void StopItem(int id)
        {
            EventItem item = null;
            item = pendingItems.First(f => f.Id == id);

            if(item == null)
                throw new ArgumentOutOfRangeException(string.Format("Now pending item with id {0}",id));

            item.End = DateTime.Now;
            pendingItems.RemoveAll(obj => obj.Id == id);
        }

        public void DeletItem(int id)
        {
            EventItem item = null;
            item = items.First(f =>f.Id == id);

            if (item == null)
                throw new ArgumentOutOfRangeException(string.Format("Now existing item with id {0}", id));

            items.Remove(item);
            pendingItems.Remove(item);
        }

        public void editItem(EventItem changeItem)
        {
            EventItem item = items.First(f => f.Id == changeItem.Id);

            if (item == null)
                throw new ArgumentOutOfRangeException(string.Format("Now existing item with id {0}", changeItem.Id));

            item.Start = changeItem.Start;
            item.End = changeItem.End;
            item.Description = changeItem.Description;
        }
    }
}