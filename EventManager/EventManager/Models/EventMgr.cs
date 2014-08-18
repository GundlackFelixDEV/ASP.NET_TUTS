using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventManager.Models
{
    public class EventMgr
    {
        private static List<EventItem> pendingItems;
        private static List<EventItem> items;

        public EventMgr()
        {
            if (pendingItems == null)
                pendingItems = new List<EventItem>();

            if (items == null)
                items = new List<EventItem>();
        }

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

        public void StartItem(string aTitel)
        {
            int id = (items.Count>0)?items.Max(f => f.Id):0;

            EventItem newItem = new EventItem();
            newItem.Titel = aTitel;
            newItem.Id = ++id;

            pendingItems.Add(newItem);
            items.Add(newItem);
        }

        public void StopItem(int id)
        {
            EventItem item = FindItem(id);

            item.End = DateTime.Now;
            pendingItems.RemoveAll(obj => obj.Id == id);
        }

        public void DeletItem(int id)
        {
            EventItem item = FindItem(id);

            items.Remove(item);
            pendingItems.Remove(item);
        }

        public void EditItem(EventItem changeItem)
        {
            EventItem item = FindItem(changeItem.Id);

            if(DateTime.Compare(changeItem.Start,changeItem.End) < 0)
                throw new InvalidOperationException(string.Format("Event start {0} can not be after event end {1}",changeItem.Start, changeItem.End));
            
            item.Start = changeItem.Start;
            item.End = changeItem.End;
            item.Description = changeItem.Description;
            item.Titel = changeItem.Titel;
        }

        public EventItem FindItem(int id)
        {
            EventItem item = items.First(f => f.Id == id);

            if(item == null)
                throw new ArgumentOutOfRangeException(string.Format("Now existing item with id {0}", id));

            return item;
        }
    }
}