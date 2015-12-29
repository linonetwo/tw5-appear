/*\
title: $:/plugins/tobibeer/appear/widget.js
type: application/javascript
module-type: widget

Use the appear widget for popups, sliders, accordion menus

@preserve
\*/
(function(){"use strict";var t=require("$:/core/modules/widgets/widget.js").widget,e=require("$:/core/modules/utils/dom/popup.js").Popup,i=function(t,e){this.initialise(t,e)};i.prototype=new t;i.prototype.render=function(t,e){this.parentDomNode=t;this.computeAttributes();this.execute();var i,s,r,a,h,n,u=[];if(this.handle){this.handlerState=this.checkHandler();$tw.utils.each(this.handlerState,function(t){u.push(t)})}else{s={type:"button"};s.attributes=this.setAttributes(s,"button");i=s.attributes["class"].value.trim();s.attributes["class"].value=i+" appear-show"+(this.handler?" tc-popup-absolute":"");s.children=this.wiki.parseText("text/vnd.tiddlywiki",this.show,{parseAsInline:true}).tree;h={type:"reveal",children:this.parseTreeNode.children};h.attributes=this.setAttributes(h,"reveal");h.isBlock=!(this.mode&&this.mode==="inline");if(h.attributes.type&&h.attributes.type.value==="popup"){s.attributes.popup=h.attributes.state;u.push(s);if(!this.handler){u.push(h)}else{s.attributes.handler=this.handler}}else{h.attributes.type={type:"string",value:"match"};h.attributes.text={type:"string",value:this.currentTiddler};s.attributes.set=h.attributes.state;s.attributes.setTo={type:"string",value:this.currentTiddler};a={type:"reveal",isBlock:this.block,children:[s],attributes:{type:{type:"string",value:"nomatch"},state:h.attributes.state,text:{type:"string",value:this.currentTiddler}}};if(!this.once){r=$tw.utils.deepCopy(s);r.attributes["class"].value=i+" appear-hide "+(this.attr.button.selectedClass?this.attr.button.selectedClass:"");r.attributes.setTo={type:"string",value:""};r.children=this.wiki.parseText("text/vnd.tiddlywiki",this.hide,{parseAsInline:true}).tree}n=$tw.utils.deepCopy(a);n.children=[];if(!this.once){n.children.push(r)}if(!this.handler){n.children.push(h)}n.attributes.type.value="match";u.push(a,n)}}this.makeChildWidgets(u);this.renderChildren(this.parentDomNode,e);if(this.handler){this.checkHandler(h)}};i.prototype.execute=function(){var t=this;this.attr={map:{reveal:{"class":1,position:1,retain:1,state:1,style:1,tag:1,type:1},button:{"button-class":1,"button-style":1,"button-tag":1,tooltip:1,selectedClass:1}},rename:{"button-class":"class","button-style":"style","button-tag":"tag"},button:{},reveal:{}};$tw.utils.each(this.attributes,function(e,i){var s;$tw.utils.each(t.attr.map,function(r,a){$tw.utils.each(Object.keys(r),function(r){if(r==i){t.attr[a][i]=e;s=false;return false}});return s})});this.currentTiddler=this.getVariable("currentTiddler");this.show=this.getValue(this.attributes.show,"show");this.hide=this.getValue(this.attributes.hide,"hide");if(!this.hide){this.hide=this.show}this.once=this.attributes.once&&this.attributes.once!=="false";this.$state=this.attributes.$state;this.mode=this.getValue(this.attributes.mode,"mode");this.handle=this.attributes.handle;this.handler=this.attributes.handler;this.handlerVariables=(this.attributes.variables||"")+" currentTiddler";if(!this.attr.reveal.state){this.attr.reveal.state=this.getValue(undefined,"default-state")+this.currentTiddler+this.getStateQualifier()+"/"+(this.attr.reveal.type?this.attr.reveal.type+"/":"")+(this.mode?this.mode+"/":"")+(this.once?"once/":"")+(this.$state?"/"+this.$state:"")}};i.prototype.refresh=function(t){var e=this.computeAttributes();if(Object.keys(e).length){this.refreshSelf();return true}else if(this.handle){if(this.handlerState!=this.checkHandler()){this.refreshSelf();return true}}return this.refreshChildren(t)};i.prototype.getValue=function(t,e){var i,s,r={show:"»","default-state":"$:/temp/appear/"};if(t===undefined){i=this.wiki.getTiddler("$:/plugins/tobibeer/appear/defaults/"+e);if(i){s=i.getFieldString("undefined");if(!s||s==="false"){t=i.getFieldString("text")}}}if(t===undefined){t=r[e]}return t};i.prototype.setAttributes=function(t,e){var i=this,s={};$tw.utils.each(Object.keys(this.attr.map[e]),function(r){var a,h=i.attr.rename[r];if(!h){h=r}a=i.getValue(i.attr[e][r],r);if(h==="class"){a=["appear",i.mode?"appear-"+i.mode:"",i.once?"appear-once":"",a||""].join(" ")}if(a!==undefined){if(h==="tag"){t.tag=a}else{s[h]={type:"string",value:a}}}});return s};i.prototype.checkHandler=function(t){var e,i={},s=this,r="$:/temp/appear-handlers/"+(this.handler||this.handle),a=this.wiki.getTiddler(r);if(a){i=JSON.parse(a.getFieldString("text")||"{}")}if(this.handler){e={type:"vars",children:[t],attributes:{}};$tw.utils.each((this.handlerVariables||"").split(" "),function(t){t=t.trim();if(t){e.attributes[t]={type:"string",value:(s.getVariable(t)||"").toString()}}});if(i[t.attributes.state.value]!==e){i[t.attributes.state.value]=e;s.wiki.setText(r,"text",undefined,JSON.stringify(i))}}return i};e.prototype.show=function(t){var e=t.domNode,i=(e.getAttribute("class")||"").indexOf("tc-popup-absolute")>=0,s=this.popupInfo(e),r=function(t){var e=0,i=0;do{i+=t.offsetTop||0;e+=t.offsetLeft||0;t=t.offsetParent}while(t);return{left:e,top:i}},a={left:e.offsetLeft,top:e.offsetTop};this.cancel(s.popupLevel);this.popups.push({title:t.title,wiki:t.wiki,domNode:e});a=i?r(e):a;t.wiki.setTextReference(t.title,"("+a.left+","+a.top+","+e.offsetWidth+","+e.offsetHeight+")");if(this.popups.length>0){this.rootElement.addEventListener("click",this,true)}};exports.appear=i})();