/*
 * JQuery LineChart
 *
 * Released under the MIT License
 * --------------------------------------------------------------------------------
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Stepkin Kirill (https://github.com/kirillstepkin)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * --------------------------------------------------------------------------------
 */

$.fn.linechart = function(params) {
  var chart = this,
      marks = params.data,
      SCALE_WIDTH = params.width || 50,
      SCALE_HEIGHT = params.height || 50,
      BLOCK_WIDTH = params.boxSize || 20,
      hasLine = params.line || false,
      theme = params.theme || 'default';

  renderRulers();

  function renderRulers() {
    var rulerCont = chart;
    rulerCont[0].className = "ruler-container";   

    marks.forEach(function(mark, markNum) {
      var rulerItem = document.createElement('div');
      rulerItem.className = "ruler-row"; 
      renderRow(rulerItem, mark, markNum);
      rulerCont[0].appendChild(rulerItem);
    });
  }

  function renderRow(rulerItem, mark, markNum) {
    for (var i=0; i < SCALE_HEIGHT; i++) {
      var markItem = document.createElement('div');
      markItem.setAttribute("data-type", mark.type - 1 == i ? mark.type : i + 1);
      markItem.className = mark.type - 1 == i ? "mark pinned" : "mark empty";

      if (mark.type - 1 <= i) markItem.className += " painted";

      if (mark.type - 1 == i && markNum < marks.length - 1) {
        var lineItem = document.createElement('div');
        lineItem.className = "line";
        var lineOpts = calculateLineOptions(i+1, marks[markNum+1].type);
        lineItem.setAttribute("style", `width: ${lineOpts.width}; transform: ${lineOpts.transform};`);
        markItem.appendChild(lineItem);
      }

      rulerItem.appendChild(markItem);
    }
  }

  function calculateLineOptions(currentMark, nextMark) {
    var AC = BLOCK_WIDTH, 
        BC = Math.abs(nextMark - currentMark) * BLOCK_WIDTH;
    var AB = Math.hypot( AC, BC );
    var angleA = Math.fround( Math.asin( BC / AB ) * 180 / Math.PI);

    if (nextMark < currentMark) angleA = -angleA;

    return {
      width: AB + 'px',
      transform: 'rotate(' + angleA + 'deg)'
    };
  }
};