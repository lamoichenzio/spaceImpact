!function(e){var t={};function l(s){if(t[s])return t[s].exports;var i=t[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,l),i.l=!0,i.exports}l.m=e,l.c=t,l.d=function(e,t,s){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(l.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)l.d(s,i,function(t){return e[t]}.bind(null,i));return s},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="",l(l.s=0)}([function(e,t,l){"use strict";l.r(t);class s{constructor(){this.color="#000",this.x=[2,2,2,3],this.y=[12,13,14,13],this.id="shuttle",this.className="shuttle",this.title="shuttle"}get(){return this}createShuttle(){let e=[];for(let t=0;t<=3;t++)e.push(this.y[t]+"-"+this.x[t]);for(let l of e){var t=document.getElementById(l);t.className=this.className,t.title=this.title}}moveUp(){if(this.y[0]>2){let e=[],t=[];for(let l=0;l<=3;l++)e.push(this.y[l]+"-"+this.x[l]),this.y[l]-=2,t.push(this.y[l]+"-"+this.x[l]);for(let t of e){let e=document.getElementById(t);e.className="cell",e.title="cell"}for(let e of t){let t=document.getElementById(e);t.className=this.className,t.title=this.title}}}moveDown(){if(this.y[2]<23){let e=[],t=[];for(let l=0;l<=3;l++)e.push(this.y[l]+"-"+this.x[l]),this.y[l]+=2,t.push(this.y[l]+"-"+this.x[l]);for(let t of e){let e=document.getElementById(t);e.className="cell",e.title="cell"}for(let e of t){let t=document.getElementById(e);t.className=this.className,t.title=this.title}}}}class i{constructor(e){let t=e.get();this.x=t.x[3]+1,this.y=t.y[1],this.className="fire",this.title="fire"}moveFire(){var e;if(61!=this.x)if("shuttle"!=(e=document.getElementById(this.y+"-"+(this.x-1))).title&&(e.className="cell",e.title="cell"),"enemy"==(e=document.getElementById(this.y+"-"+this.x)).title){var t=document.getElementById(this.y+1+"-"+this.x);null!=t&&"enemy"==t.title&&(console.log("cell below"),t.className="cell",t.title="cell");var l=document.getElementById(this.y-1+"-"+this.x);null!=l&&"enemy"==l.title&&(console.log("cell above"),l.className="cell",l.title="cell"),console.log("enemyyyyy"),this.x=61}else e.className=this.className,e.title=this.title,this.x+=1;else(e=document.getElementById(this.y+"-"+(this.x-1))).className="cell",e.title="cell",this.x+=1}}var n,o,c,a=class{constructor(){this.color="#000";var e,t,l=(e=2,t=23,e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e);this.x=[60,60],this.y=[l,l+1],this.id="enemy",this.className="enemy",this.title="enemy",this.destroyed=!1,this.collision=!1}createEnemies(){let e=[];for(let t=0;t<2;t++)e.push(this.y[t]+"-"+this.x[t]);for(let l of e){var t=document.getElementById(l);t.className=this.className,t.title=this.title}}moveEnemies(){let e=document.getElementById(this.y[0]+"-"+this.x[0]),t=document.getElementById(this.y[1]+"-"+this.x[1]);if(1==this.x[0])t.title="cell",t.className="cell",e.title="cell",e.className="cell";else if("cell"==e.title||"cell"==t.title)"cell"!=t.title&&(t.title="cell",t.className="cell"),"cell"!=e.title&&(e.title="cell",e.className="cell"),this.destroyed=!0;else{e.title="cell",e.className="cell",t.title="cell",t.className="cell",this.x[0]=this.x[0]-1,this.x[1]=this.x[1]-1;let l=document.getElementById(this.y[0]+"-"+this.x[0]),s=document.getElementById(this.y[1]+"-"+this.x[1]);"shuttle"==l.title||"shuttle"==s.title?this.collision=!0:(l.className=this.className,l.title=this.title,s.className=this.className,s.title=this.title)}}},r=0,m=3,d=200,h=1e3,u=!1,y=!1;let f=function(){for(var e=document.getElementById("world"),t=1;t<=25;t++){for(var l=document.createElement("tr"),s=1;s<=60;s++){var i=document.createElement("td");i.id=t+"-"+s,i.title="cell",i.className="cell",l.appendChild(i)}e.appendChild(l)}};function v(){setTimeout((function(){y=!1,E(),setTimeout((function(){clearInterval(c)}),1e4),o=setInterval((function(){u?(clearInterval(o),d=200,h=1e3):(clearInterval(c),E(),d-=4,console.log("Updating move speed"+d),h-=20,console.log("Updating Spawn speed"+d))}),2e3)}),3e3)}function g(){r+=100,console.log(r),document.getElementById("score").innerText=r}function x(){m--,console.log(m),document.getElementById("life").innerText=m,0==m&&(console.log("END GAME"),u=!0,$("#mymodal").modal("show"),document.getElementById("totalScore").innerText=r)}function E(){c=setInterval((function(){if(u)clearInterval(c);else{var e=new a;e.createEnemies();var t=setInterval((function(){u?clearInterval(c):e.x[0]>=1&&!e.destroyed&&!e.collision&&!y?e.moveEnemies():(console.log(e.destroyed),e.destroyed&&g(),e.collision&&x(),clearInterval(t))}),d)}}),h)}window.onload=function(){n=new s,document.getElementById("startGame").addEventListener("click",()=>{document.getElementById("startGame").disabled=!0,f(),n.createShuttle(),v()}),document.getElementById("restartGame").addEventListener("click",()=>{!function(){d=200,h=1e3,r=-100,m=4,g(),x(),o=null,c=null,u=!1,y=!0,$("#mymodal").modal("hide");for(var e=document.getElementById("world"),t=e.lastElementChild;t;)e.removeChild(t),t=e.lastElementChild;n=new s,f(),n.createShuttle(),v()}()}),document.addEventListener("keydown",e=>function(e){if("38"==(e=e||window.event).keyCode)n.moveUp();else if("40"==e.keyCode)n.moveDown();else if("32"==e.keyCode){let e=new i(n);var t=setInterval((function(){e.x<=61?e.moveFire():clearInterval(t)}),10)}}(e))}}]);
//# sourceMappingURL=main.js.map