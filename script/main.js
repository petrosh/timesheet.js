
/* global Lib, Timesheet */

(function(){
  'use strict';

  Lib.ready(function() {

    function fetchJSONFile(path, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    var data = JSON.parse(httpRequest.responseText);
                    if (callback) callback(data);
                }
            }
        };
        httpRequest.open('GET', path);
        httpRequest.send();
    }

    fetchJSONFile('timeline.json', function(data){
      // do something with your data
      var array = data.timelines.reverse();
      var timelines = document.getElementById('timelines');

      /* jshint -W031 */
      for (var i = 0; i < array.length; i++) {
        var newDiv = document.createElement("div");
        var title = document.createElement("h2");
        var newContent = document.createTextNode(array[i].title);
        title.appendChild(newContent);
        newDiv.setAttribute("id", "div"+i);
        timelines.appendChild(title);
        timelines.appendChild(newDiv);
        new Timesheet("div"+i, array[i].start, array[i].end, array[i].array);
      }
    });

    document.querySelector('#switch-dark').addEventListener('click', function() {
      document.querySelector('body').className = 'index black';
    });

    document.querySelector('#switch-light').addEventListener('click', function() {
      document.querySelector('body').className = 'index white';
    });
  }); // end Lib.ready


})();
