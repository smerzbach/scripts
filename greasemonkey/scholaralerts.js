// ==UserScript==
// @name        Google Scholar Alerts
// @description Insert buttons for creating Scholar Alerts
// @version     1.0
// @grant       none
// @include     *://scholar.google.*/*
// ==/UserScript==

 /*
 * Add "Create alert" links to each entry of a Google Scholar listing.
 */

function getClusterID(entry) {
  var tmp = entry.getElementsByClassName("gs_rt")[0].getElementsByTagName("a")[0].dataset.clk;
  var re = /&d=(\d+)&/;
  var res = re.exec(tmp);
  return res[1];
}

function createAlertAnchor(clusterID) {
  var anchor = document.createElement("a");
  var span1 = document.createElement("span");
  var span2 = document.createElement("span");
  var node = document.createTextNode("Create alert");
  span1.setAttribute("class", "gs_ico gs_btnM");
  span2.setAttribute("class", "gs_lbl");
  span2.appendChild(node);
  anchor.appendChild(span1);
  anchor.appendChild(span2);
  anchor.href = "/scholar_alerts?view_op=create_alert_options"
    + "&hl=en&alert_params=%3Fhl%3Den%26as_sdt%3D1900%26sciodt%3D1900%26cites%3D"
    + clusterID + "%26scipsc%3D";
  anchor.setAttribute("id", "gs_bdy_sb_ca");
  anchor.setAttribute("class", "gs_btnM gs_in_ib");
  return anchor;
}

var entries = document.getElementsByClassName("gs_ri");

if (entries != null && entries.length > 0) {
  for (var i = 0; i < entries.length; i++) {
    var clusterID = getClusterID(entries[i]);
    var entryLinks = entries[i].getElementsByClassName("gs_fl");
    var anchor = createAlertAnchor(clusterID)
    entryLinks[0].appendChild(anchor);
  }
}
