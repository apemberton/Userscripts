// ==UserScript==
// @name    LinkedIn Connection expander
// @namespace  http://www.andypemberton.com/sandbox/userscripts
// @description  Automatically expands your Shared Connections on LinkedIn search results
// @include     http://www.linkedin.com/*
// ==/UserScript==

(function() {

  function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
      obj.addEventListener( type, fn, false );
    } else if (obj.attachEvent) {
      obj["e"+type+fn] = fn;
      obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
      obj.attachEvent( "on"+type, obj[type+fn] );
    } else {
      obj["on"+type] = obj["e"+type+fn];
    }
  }

  function expandConnections(){
    var links = [];
    var links1 = document.getElementsByClassName('trk-shared-conn-link');
    for(var i=links1.length;i--;links.unshift(links1[i]));
    var links2 = document.getElementsByClassName('trk-shared-connections-link');
    for(var i=links2.length;i--;links.unshift(links2[i]));
    for(var i=0;i<links.length;i++){
      var evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      links[i].dispatchEvent(evt);
    }
  }

  function attachPaginationEvent(){
    var paginators = document.getElementsByClassName('paginator-curr');
    for(var i=0;i<paginators.length;i++){
      addEvent(paginators[i], 'click', function() {
        var interval = window.setInterval(function(){
          var results = document.getElementById('result-ajax');
          if(results.className.indexOf('processing') == -1){
            window.clearInterval(interval);
            expandConnections();
            attachPaginationEvent();
          }
        }, 500);
      });
    }
  }

  expandConnections();
  attachPaginationEvent();

})();
