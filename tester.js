var canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d"),
    region = {x: 50, y: 50, w: 100, h: 100};

ctx.fillStyle = "#79f";
ctx.fillRect(region.x, region.y, region.w, region.h);

// create a tool-tip instance:
var t1 = new ToolTip(canvas, region, "This is a tool-tip", 150, 3000);

// The Tool-Tip instance:
function ToolTip(canvas, region, text, width, timeout) {

  var me = this,                                // self-reference for event handlers
      div = document.createElement("div"),      // the tool-tip div
      parent = canvas.parentNode,               // parent node for canvas
      visible = false;                          // current status
  
  // set some initial styles, can be replaced by class-name etc.
  div.style.cssText = "position:fixed;padding:7px;background:gold;pointer-events:none;width:" + width + "px";
  div.innerHTML = text;
  
  // show the tool-tip
  this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
      visible = true;                           // lock so it's only shown once
      setDivPos(pos);                           // set position
      parent.appendChild(div);                  // add to parent of canvas
      setTimeout(hide, timeout);                // timeout for hide
    }
  }
  
  // hide the tool-tip
  function hide() {
    visible = false;                            // hide it after timeout
    parent.removeChild(div);                    // remove from DOM
  }

  // check mouse position, add limits as wanted... just for example:
  function check(e) {
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    if (!visible &&
        pos.x >= region.x && pos.x < region.x + region.w &&
        pos.y >= region.y && pos.y < region.y + region.h) {
      me.show(posAbs);                          // show tool-tip at this pos
    }
    else setDivPos(posAbs);                     // otherwise, update position
  }
  
  // get mouse position relative to canvas
  function getPos(e) {
    var r = canvas.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
  }
  
  // update and adjust div position if needed (anchor to a different corner etc.)
  function setDivPos(pos) {
    if (visible){
      if (pos.x < 0) pos.x = 0;
      if (pos.y < 0) pos.y = 0;
      // other bound checks here
      div.style.left = pos.x + "px";
      div.style.top = pos.y + "px";
    }
  }
  
  // we need to use shared event handlers:
  canvas.addEventListener("mousemove", check);
  canvas.addEventListener("click", check);
  
}