exports.onInitialClientRender = (n, options) => {
  var importScript = (function (oHead) {
    function loadError(oError) {
      throw new URIError(
        "The script " + oError.target.src + " is not accessible."
      );
    }
    return function (sSrc, fOnload) {
      var oScript = document.createElement("script");
      oScript.type = "text/javascript";
      oScript.onerror = loadError;
      if (fOnload) {
        oScript.onload = fOnload;
      }
      oHead.appendChild(oScript);
      oScript.src = sSrc;
    };
  })(document.head || document.getElementsByTagName("head")[0]);

  importScript(
    "https://cdn.jsdelivr.net/gh/mqjd/assets/js/viewer.min.js",
    function () {
      Array.from(document.getElementsByClassName("drawio-viewer")).forEach(
        (drawioViewerElement) => {
          var url = drawioViewerElement.getAttribute("url");
          if (url.indexOf("http") != 0) {
            url = options.baseUrl + url;
          }
          var d = { ...options, url };
          GraphViewer.getUrl(d.url, function (e) {
            e = mxUtils.parseXml(e);
            e = new GraphViewer(drawioViewerElement, e.documentElement, d);
          });
        }
      );
    }
  );
};
