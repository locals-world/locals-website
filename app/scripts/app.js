/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  // Sets app default base URL
  app.baseUrl = '/';
  if (window.location.port === '') {  // if production
    // Uncomment app.baseURL below and
    // set app.baseURL to '/your-pathname/' if running from folder in production
    // app.baseUrl = '/polymer-starter-kit/';
  }

  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
      Polymer.dom(document).querySelector('#caching-complete').show();
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
    app.activelocals = '458';
    app.exampleoneselected = 0;
    app.entryAnimation = "slide-from-right-animation";
    app.exitAnimation = "slide-left-animation";
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  document.addEventListener('HTMLImportsLoaded', function() {
    I18nMsg.lang = 'nl';
    app.language = 'nl';
    I18nMsg.url = 'locales'; // optionally use custom folder for locales.
    Platform.performMicrotaskCheckpoint();
  });

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  window.addEventListener('paper-header-transform', function(e) {
    var appName = Polymer.dom(document).querySelector('#mainToolbar .app-name');
    var middleContainer = Polymer.dom(document).querySelector('#mainToolbar .middle-container');
    var bottomContainer = Polymer.dom(document).querySelector('#mainToolbar .bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
    // appName max size when condensed. The smaller the number the smaller the condensed size.
    var maxMiddleScale = 0.50;
    var auxHeight = heightDiff - detail.y;
    var auxScale = heightDiff / (1 - maxMiddleScale);
    var scaleMiddle = Math.max(maxMiddleScale, auxHeight / auxScale + maxMiddleScale);
    var scaleBottom = 1 - yRatio;

    // Move/translate middleContainer
    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer appName
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
  });

  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
  };

  app.closeDrawer = function() {
  };

  app.langpick = function(){
    I18nMsg.lang = app.language;
    Platform.performMicrotaskCheckpoint();
  };

  app.toggleItem = function(event){
    var itemid = event.target.id;

    // var itemidtotal = itemid+'total';
    // var itemtoclass = document.getElementById(itemidtotal);
    // itemtoclass.className += " opened";


    var itemtoopen = '#'+itemid+'collapser';
    var itemtoggle = document.querySelector(itemtoopen);
    itemtoggle.toggle();

    if (itemtoggle.opened) {
      console.log(itemtoggle, "is opened");
    var itemidtotal = itemid+'total';
    var itemtoclass = document.getElementById(itemidtotal);
    itemtoclass.className += " opened";      
    } else {
      console.log(itemtoggle, "is closed");
    var itemidtotal = itemid+'total';
    var itemtoclass = document.getElementById(itemidtotal);
    itemtoclass.className = "contentsectie";      
    }

  };



  app.toggleItemNoClasses = function(event){
    var itemid = event.target.id;




    var itemtoopen = '#'+itemid+'collapser';
    var itemtoggle = document.querySelector(itemtoopen);
    itemtoggle.toggle();

    if (itemtoggle.opened) {
    var itemidtotal = itemid+'total';
    var itemtoclass = document.getElementById(itemidtotal);
    itemtoclass.className += " collapsetrue";     
    } else {
      console.log(itemtoggle, "is closed");
    var itemidtotal = itemid+'total';
    var itemtoclass = document.getElementById(itemidtotal);
    itemtoclass.className = "contentondersectie";      
    }

  };

  app.nextExampleOne = function(event) {
    app.entryAnimation = "slide-from-right-animation";
    app.exitAnimation = "slide-left-animation";

    app.exampleoneselected += 1;
    console.log("this one",event);

  };

  app.prevExampleOne = function() {
    app.entryAnimation = "slide-from-left-animation";
    app.exitAnimation = "slide-right-animation";

    app.exampleoneselected -= 1;
    console.log("this one",event);

  };

  app.scrolltoTop = function() {
    window.scrollTo(0, 0); 
  };


})(document);
