/*
 * The MIT License
 *
 * Copyright (c) 2016, Sebastian Sdorra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

angular.module('adf.widget.scm')
  .controller('ActivitiesController', function($sce, activities){
    var vm = this;
    
    // allow html descriptions
    angular.forEach(activities.activities, function(activity){
      activity.changeset.description = $sce.trustAsHtml(activity.changeset.description);
      activity.repoName = activity["repository-name"];
    });
    
    // handling and displaying only 15 activities
    vm.activities=[];
    for(var i=0; i<15; i++){
         vm.activities[i] = activities.activities[i];
    }
    // vm.activities = activities.activities;

    vm.gravatarHash = function(activity){
      var hash;
      if (activity.changeset.properties){
        for (var i=0; i<activity.changeset.properties.length; i++){
          if (activity.changeset.properties[0].key === 'gravatar-hash'){
               hash = activity.changeset.properties[0].value;
            break;
          }
        }
      }
      return hash;
    };
  });
