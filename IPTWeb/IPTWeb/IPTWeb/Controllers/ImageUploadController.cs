using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IPTWeb.Models;
using System.Drawing;
using System.IO;
using System.Net;
using System.Drawing.Drawing2D;

namespace IPTWeb.Controllers
{
    public class ImageUploadController : Controller
    {
        // GET: ImageUpload
        public ActionResult Index()
        {
            return View("UploadImage");
        }

        [HttpPost]
        public ActionResult UploadImage(UploadImageModel model)
        {
            if (ModelState.IsValid)
            {
                Bitmap original = null;
                var name = "newimagefile";
                var errorField = string.Empty;

                if (model.IsUrl)
                {
                    errorField = "Url";
                    name = GetUrlFileName(model.Url);
                    original = GetImageFromUrl(model.Url);
                }
                else if (model.IsFlickr)
                {
                    errorField = "Flickr";
                    name = GetUrlFileName(model.Flickr);
                    original = GetImageFromUrl(model.Flickr);
                }
                else // model.IsFile should be checked !
                {
                    errorField = "File";
                    name = Path.GetFileNameWithoutExtension(model.File.FileName);
                    original = Bitmap.FromStream(model.File.InputStream) as Bitmap;
                }

                if (original != null)
                {
                    var fn = Server.MapPath("~/Content/img/" + name + ".png");
                    var img = CreateImage(original, model.X, model.Y, model.Width, model.Height);
                    img.Save(fn, System.Drawing.Imaging.ImageFormat.Png);
                    return RedirectToAction("Index");
                }
                else
                    ModelState.AddModelError(errorField, "Your upload did not seem valid. Please try again using only correct images!");
            }

            return View(model);
        }

        string GetUrlFileName(string url)
        {
            var parts = url.Split(new char[] { '/' }, StringSplitOptions.RemoveEmptyEntries);
            var last = parts[parts.Length - 1];
            return Path.GetFileNameWithoutExtension(last);
        }

        Bitmap GetImageFromUrl(string url)
        {
            var buffer = 1024;
            Bitmap image = null;

            if (!Uri.IsWellFormedUriString(url, UriKind.Absolute))
                return image;

            using (var ms = new MemoryStream())
            {
                var req = WebRequest.Create(url);

                using (var resp = req.GetResponse())
                {
                    using (var stream = resp.GetResponseStream())
                    {
                        var bytes = new byte[buffer];
                        var n = 0;

                        while ((n = stream.Read(bytes, 0, buffer)) != 0)
                            ms.Write(bytes, 0, n);
                    }
                }

                image = Bitmap.FromStream(ms) as Bitmap;
            }

            return image;
        }

        Bitmap CreateImage(Bitmap original, int x, int y, int width, int height)
        {
            var img = new Bitmap(width, height);

            using (var g = Graphics.FromImage(img))
            {
                g.SmoothingMode = SmoothingMode.AntiAlias;
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.DrawImage(original, new Rectangle(0, 0, width, height), x, y, width, height, GraphicsUnit.Pixel);
            }

            return img;
        }
    }

}