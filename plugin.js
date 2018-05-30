kiwi.plugin('plugintemplate', function(kiwi, log) {
  let toolVisible = buttonAdded = false;
  
  if(!buttonAdded){
    buttonAdded = true;
    const pluginTool = document.createElement('i');
    pluginTool.className = 'fa fa-paper-plane';
    kiwi.addUi('input', pluginTool);
    pluginTool.onclick = function(e){ 
      e.preventDefault();
      if(toolVisible){
        hideTool();
      }else{
        showTool();
      }
    }
  }
  
  function openTool(){
    toolVisible = true;
    kiwi.emit('mediaviewer.show', { iframe: true, url: 'about:blank' });
    setTimeout(() => {
      let iframe = document.querySelector('.kiwi-mediaviewer iframe');
      let mediaviewer = document.querySelector('.kiwi-mediaviewer');
      let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeBody = innerDoc.getElementsByTagName('body')[0];
      iframeBody.style.margin = 0;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      mediaviewer.style.height = '50%';
      
      let script = document.createElement('script');
      script.innerHTML = "c=document.createElement('canvas');c.style.width='100%';c.style.height='100vh';document.body.appendChild(c);c.width=c.clientWidth;c.height=c.clientHeight;x=c.getContext('2d');L=Math;S=L.sin;t=0;C=L.cos;Q=q=>{d=L.hypot(Y,Z),p=L.atan2(Y,Z)-.5,Y=S(p)*d,Z=C(p)*d;return[w+X/Z*w,h+Y/Z*w]};D=q=>{w=c.width/2,h=c.height/2,x.fillStyle='rgba(255,255,255,.4',x.fillRect(0,0,w*2,h*2),x.fillStyle='#021';if(!t){P=[],g=[];for(j=40;j--;)for(i=40;i--;g.push(j*40+i))P.push({X:-20+i,Y:0,Z:j,VY:0,TY:0});for(i=g.length-1;i--;[g[i],g[j]]=[g[j],g[i]])j=L.random()*(i+1)|0};for(i=0;i<P.length;++i){P[i].Y-=.15,P[i].TY-=.15;if(P[i].TY<-9-g[i]/160)P[i].TY+=20;vy=(P[i].TY-P[i].Y),d=1+vy,vy/=d*15,P[i].VY+=vy,P[i].Y+=P[i].VY,P[i].VY/=1.01;if(d<2)P[i].Y=P[i].TY;x.beginPath();for(j=4;j--;)p=1.57*j+.785,X=P[i].X+S(p)/2,Y=30+P[i].Y,Z=35+P[i].Z+C(p)/2,x.lineTo(...Q());x.fill()}requestAnimationFrame(D);t+=1/60};D()";
      iframeBody.appendChild(script);
      
    }, 100);
  }
  
  window.addEventListener("click", function(e){
    if(e.srcElement.className.indexOf("u-button-secondary") !== -1){
      hideTool();
    }
  });
  
  function showTool(){
    if(!toolVisible){
      openTool();
    }
  }

  function hideTool(){
    kiwi.emit('mediaviewer.hide');
  }
  
  kiwi.on('mediaviewer.hide', function(){
    toolVisible = false;
  });
});
