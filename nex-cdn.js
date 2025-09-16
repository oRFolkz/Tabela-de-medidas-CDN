(function(){
  // ---- monta/usa o host no light DOM ----
  var host = document.getElementById("insert-table");
  if(!host){
    host = document.createElement("div");
    host.id = "insert-table";
    document.body.appendChild(host);
  }

  // ---- Shadow DOM (isolamento) ----
  var shadow = host.shadowRoot || host.attachShadow({ mode: "open" });

  // Se reexecutar o script, limpa o shadow
  while (shadow.firstChild) shadow.removeChild(shadow.firstChild);

  // ---------- CSS (scoped) ----------
  // NOTE: evitamos seletores globais; usamos :host e .nw-root.
  var css = ""
  + ":host{all:initial;contain:content;}"
  + ".nw-root,*{box-sizing:border-box}"
  + ".nw-root{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#333;background-color:#f8f9fa;}"
  + ".container{max-width:1100px;margin:0 auto;padding:16px}"
  + "header{text-align:center;margin-bottom:32px;padding:24px 0;background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.1)}"
  + "h1{font-size:2.5rem;font-weight:600;color:#2c3e50;margin-bottom:8px}"
  + ".subtitle{font-size:1.1rem;color:#6c757d}"
  + "#tabs{display:flex;margin-bottom:24px;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1)}"
  + ".tab-button{flex:1;padding:16px 24px;background:#f8f9fa;border:0;border-bottom:3px solid transparent;cursor:pointer;font-size:1rem;font-weight:500;color:#6c757d;transition:.3s}"
  + ".tab-button:hover{background:#e9ecef;color:#495057}"
  + ".tab-button.active{background:#fff;border-bottom-color:#007bff;color:#007bff}"
  + ".main-content{background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.1);overflow:hidden}"
  + ".content-grid{display:grid;min-height:500px}"
  + "@media (min-width:900px){.content-grid{grid-template-columns:40% 60%}}"
  + ".illustration-column{background:#f8f9fa;padding:32px;display:flex;flex-direction:column;align-items:center;justify-content:center}"
  + ".illustration-svg{width:100%;max-width:350px;height:auto;margin-bottom:24px}"
  + ".instructions{max-width:280px}"
  + ".instructions h3{font-size:1.1rem;color:#495057;margin-bottom:12px}"
  + ".instructions ul{list-style:none;padding-left:0;margin:0;}"
  + ".instructions li{margin-bottom:8px;padding-left:20px;position:relative;font-size:.9rem;color:#6c757d}"
  + ".instructions li::before{content:'•';color:#007bff;position:absolute;left:0;font-weight:700}"
  + ".form-column{padding:32px}"
  + ".section{display:none}"
  + ".section.active{display:block}"
  + ".form-group{margin-bottom:20px}"
  + "#cam-caimento,#cal-caimento,#shoe-meia{width:50%;padding:12px 10px;border:2px solid #e9ecef;border-radius:6px}"
  + "label{display:block;font-weight:500;color:#495057;margin-bottom:6px}"
  + "input[type=number]{width:100%;padding:12px 16px;border:2px solid #e9ecef;border-radius:6px;font-size:1rem;transition:border-color .3s}"
  + "input[type=number]:focus{outline:0;border-color:#007bff;box-shadow:0 0 0 3px rgba(0,123,255,.1)}"
  + ".checkbox-group{display:flex;align-items:center;gap:8px}"
  + "input[type=checkbox]{width:18px;height:18px;accent-color:#007bff}"
  + ".button-group{display:flex;gap:12px;margin:24px 0}"
  + ".btn{padding:12px 24px;border:0;border-radius:6px;font-size:1rem;font-weight:500;cursor:pointer;transition:.3s}"
  + ".btn-primary{background:#007bff;color:#fff}"
  + ".btn-primary:hover{background:#0056b3}"
  + ".btn-secondary{background:#6c757d;color:#fff}"
  + ".btn-secondary:hover{background:#5a6268}"
  + ".result-card{background:#f8f9fa;border:2px solid #e9ecef;border-radius:8px;padding:20px;margin:24px 0;display:none}"
  + ".result-card.show{display:block}"
  + ".result-title{font-size:1.5rem;font-weight:600;color:#28a745;margin-bottom:12px}"
  + ".result-detail{margin-bottom:8px;color:#495057}"
  + ".result-warning{color:#dc3545;font-weight:500}"
  + ".disclaimer{font-size:.85rem;color:#6c757d;font-style:italic;margin-top:12px}"
  + ".error-message{background:#f8d7da;color:#721c24;padding:12px;border-radius:6px;margin:12px 0;display:none}"
  + ".error-message.show{display:block}"
  + ".size-table{width:100%;border-collapse:collapse;margin:24px 0;font-size:.9rem}"
  + ".size-table th,.size-table td{padding:8px 12px;text-align:left;border:1px solid #dee2e6}"
  + ".size-table th{background:#e9ecef;font-weight:600}"
  + ".size-table tbody tr:nth-child(even){background:#f8f9fa}"
  + ".table-note{font-size:.8rem;color:#6c757d;font-style:italic;text-align:center}"
  + "footer{text-align:center;margin-top:48px;padding:24px;color:#6c757d;font-size:.85rem}"
  + "@media (max-width:899px){h1{font-size:2rem}.container{padding:12px}.form-column,.illustration-column{padding:24px}.button-group{flex-direction:column}.btn{width:100%}}";

  var style = document.createElement("style");
  style.textContent = css;
  shadow.appendChild(style);

  // ---------- HTML (scoped) ----------
  var html = '\
  <div class="nw-root">\
    <div class="container">\
      <header><h1>Guia de Medidas</h1><p class="subtitle">Descubra seu tamanho ideal em poucos passos</p></header>\
      <div id="tabs">\
        <button class="tab-button active" id="tab-camisetas">Camisetas</button>\
        <button class="tab-button" id="tab-calcas">Calças</button>\
        <button class="tab-button" id="tab-calcados">Calçados</button>\
      </div>\
      <div class="main-content"><div class="content-grid">\
        <div class="illustration-column">\
          <div id="illustration-container">\
            <img src="https://i.postimg.cc/vTdGrk1S/Modelo.png" class="illustration-svg" id="body-illustration" alt="">\
            <img src="https://i.postimg.cc/vTdGrk1S/Modelo.png" class="illustration-svg" id="foot-illustration" alt="" style="display:none">\
          </div>\
          <div class="instructions">\
            <div id="instructions-camisetas">\
              <h3>Como medir (camisetas):</h3>\
              <ul>\
                <li><strong>Altura:</strong> em pé, descalço, costas na parede.</li>\
                <li><strong>Peso:</strong> em balança, sem objetos extras.</li>\
                <li><strong>Tórax/Peito (opcional):</strong> fita ao redor da parte mais larga do peito, paralela ao chão.</li>\
              </ul>\
            </div>\
            <div id="instructions-calcas" style="display:none;">\
              <h3>Como medir (calças):</h3>\
              <ul>\
                <li><strong>Cintura:</strong> cintura natural (parte mais fina), sem apertar.</li>\
                <li><strong>Entrepernas (opcional):</strong> do alto da virilha até o tornozelo.</li>\
                <li><strong>Altura:</strong> para estimar o comprimento/entrepernas.</li>\
              </ul>\
            </div>\
            <div id="instructions-calcados" style="display:none;">\
              <h3>Como medir (calçados):</h3>\
              <ul>\
                <li><strong>Comprimento do pé:</strong> do calcanhar ao dedo mais longo (use o maior dos dois pés).</li>\
                <li>Meça em papel com o pé apoiado; marque calcanhar e ponta do dedo.</li>\
                <li>Recomendamos adicionar folga (ex.: 0,5 cm) ao comprimento medido.</li>\
              </ul>\
            </div>\
          </div>\
        </div>\
        <div class="form-column">\
          <div class="section active" id="sec-camisetas">\
            <div class="form-group">\
              <label for="cam-altura">Altura (cm)</label>\
              <input type="number" id="cam-altura" step="0.5" min="140" max="210" placeholder="Ex.: 175">\
            </div>\
            <div class="form-group">\
              <label for="cam-peso">Peso (kg)</label>\
              <input type="number" id="cam-peso" step="0.1" min="35" max="150" placeholder="Ex.: 75.0">\
            </div>\
            <div class="form-group">\
              <label for="cam-caimento">Preferência de caimento</label>\
              <select id="cam-caimento">\
                <option value="regular" selected>Regular (recomendado)</option>\
                <option value="justo">Mais justo</option>\
                <option value="solto">Mais solto</option>\
              </select>\
            </div>\
            <div class="form-group">\
              <div class="checkbox-group">\
                <input type="checkbox" id="cam-usar-torax">\
                <label for="cam-usar-torax">Tenho a medida do tórax/peito</label>\
              </div>\
            </div>\
            <div class="form-group" id="grp-torax" style="display:none;">\
              <label for="cam-torax">Tórax/Peito (cm)</label>\
              <input type="number" id="cam-torax" step="0.1" min="80" max="125" placeholder="Ex.: 98.0">\
              <small class="field-hint">Dica: meça “axila a axila” numa camiseta favorita e multiplique por 2.</small>\
            </div>\
            <div class="button-group">\
              <button class="btn btn-primary" id="btn-cam-calcular">Calcular tamanho</button>\
              <button class="btn btn-secondary" id="btn-cam-limpar">Limpar</button>\
            </div>\
            <div class="error-message" id="err-camisetas"></div>\
            <div class="result-card" id="res-camisetas"></div>\
            <table class="size-table" id="tbl-camisetas">\
              <thead><tr><th>Tamanho</th><th>Tórax/Peito (cm)</th><th>Observação</th></tr></thead>\
              <tbody>\
                <tr><td>PP</td><td>80–87</td><td>Modelagem regular</td></tr>\
                <tr><td>P</td><td>88–95</td><td>Modelagem regular</td></tr>\
                <tr><td>M</td><td>96–103</td><td>Modelagem regular</td></tr>\
                <tr><td>G</td><td>104–111</td><td>Modelagem regular</td></tr>\
                <tr><td>GG</td><td>112–119</td><td>Modelagem regular</td></tr>\
              </tbody>\
              <tfoot><tr><td colspan="3" class="table-note">Faixas aproximadas. Modelagens podem variar.</td></tr></tfoot>\
            </table>\
          </div>\
          <div class="section" id="sec-calcas">\
            <div class="form-group">\
              <label for="cal-cintura">Cintura (cm)</label>\
              <input type="number" id="cal-cintura" step="0.1" min="55" max="130" placeholder="Ex.: 78.0">\
            </div>\
            <div class="form-group">\
              <label for="cal-altura">Altura (cm)</label>\
              <input type="number" id="cal-altura" step="0.5" min="140" max="210" placeholder="Ex.: 175">\
            </div>\
            <div class="form-group">\
              <label for="cal-caimento">Preferência de caimento</label>\
              <select id="cal-caimento">\
                <option value="regular" selected>Regular (recomendado)</option>\
                <option value="justo">Mais justo</option>\
                <option value="solto">Mais solto</option>\
              </select>\
            </div>\
            <div class="button-group">\
              <button class="btn btn-primary" id="btn-cal-calcular">Calcular tamanho</button>\
              <button class="btn btn-secondary" id="btn-cal-limpar">Limpar</button>\
            </div>\
            <div class="error-message" id="err-calcas"></div>\
            <div class="result-card" id="res-calcas"></div>\
            <table class="size-table" id="tbl-calcas">\
              <thead><tr><th>Tamanho</th><th>Cintura (cm)</th><th>Quadril (cm)</th><th>Entrepernas (cm)</th></tr></thead>\
              <tbody>\
                <tr><td>34</td><td>62-66</td><td>86-90</td><td>76-78</td></tr>\
                <tr><td>36</td><td>66-70</td><td>90-94</td><td>76-78</td></tr>\
                <tr><td>38</td><td>70-74</td><td>94-98</td><td>77-79</td></tr>\
                <tr><td>40</td><td>74-78</td><td>98-102</td><td>78-80</td></tr>\
                <tr><td>42</td><td>78-82</td><td>102-106</td><td>79-81</td></tr>\
                <tr><td>44</td><td>82-86</td><td>106-110</td><td>80-82</td></tr>\
              </tbody>\
              <tfoot><tr><td colspan=\"4\" class=\"table-note\">Faixas aproximadas. Modelagens podem variar.</td></tr></tfoot>\
            </table>\
          </div>\
          <div class="section" id="sec-calcados">\
            <div class="form-group">\
              <label for="shoe-comprimento">Comprimento do pé (cm)</label>\
              <input type="number" id="shoe-comprimento" step="0.1" min="20" max="32" placeholder="Ex.: 26.0">\
            </div>\
            <div class="form-group">\
              <div class="checkbox-group">\
                <input type="checkbox" id="shoe-folga" checked>\
                <label for="shoe-folga">Adicionar folga de conforto (0,5 cm)</label>\
              </div>\
            </div>\
            <div class="form-group">\
              <label for="shoe-meia">Tipo de meia (opcional)</label>\
              <select id="shoe-meia">\
                <option value="normal" selected>Meia comum</option>\
                <option value="grossa">Meia grossa</option>\
                <option value="fina">Sem meia / meia fina</option>\
              </select>\
            </div>\
            <div class="button-group">\
              <button class="btn btn-primary" id="btn-shoe-calcular">Calcular tamanho</button>\
              <button class="btn btn-secondary" id="btn-shoe-limpar">Limpar</button>\
            </div>\
            <div class="error-message" id="err-calcados"></div>\
            <div class="result-card" id="res-calcados"></div>\
            <table class="size-table" id="tbl-calcados">\
              <thead><tr><th>BR</th><th>EU</th><th>US (M)</th><th>US (F)</th><th>Comprimento (cm)</th></tr></thead>\
              <tbody>\
                <tr><td>33</td><td>35</td><td>-</td><td>5</td><td>até 22.0</td></tr>\
                <tr><td>34</td><td>36</td><td>-</td><td>6</td><td>até 22.7</td></tr>\
                <tr><td>35</td><td>37</td><td>-</td><td>6.5</td><td>até 23.3</td></tr>\
                <tr><td>36</td><td>38</td><td>6</td><td>7.5</td><td>até 24.0</td></tr>\
                <tr><td>37</td><td>39</td><td>7</td><td>8.5</td><td>até 24.7</td></tr>\
                <tr><td>38</td><td>40</td><td>7.5</td><td>9</td><td>até 25.3</td></tr>\
                <tr><td>39</td><td>41</td><td>8</td><td>10</td><td>até 26.0</td></tr>\
                <tr><td>40</td><td>42</td><td>9</td><td>11</td><td>até 26.7</td></tr>\
                <tr><td>41</td><td>43</td><td>10</td><td>12</td><td>até 27.3</td></tr>\
                <tr><td>42</td><td>44</td><td>10.5</td><td>13</td><td>até 28.0</td></tr>\
                <tr><td>43</td><td>45</td><td>11</td><td>14</td><td>acima de 28.0</td></tr>\
              </tbody>\
              <tfoot><tr><td colspan=\"5\" class=\"table-note\">Faixas aproximadas. Modelagens podem variar.</td></tr></tfoot>\
            </table>\
          </div>\
        </div>\
      </div></div>\
      <footer>As recomendações são estimativas baseadas em faixas de medidas.</footer>\
    </div>\
  </div>';

  var wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  shadow.appendChild(wrapper);

  // ---------- JS (scoped behavior) ----------
  (function(){
    "use strict";
    const $=s=>shadow.querySelector(s),$$=s=>Array.from(shadow.querySelectorAll(s)),N=v=>v==null||v===""?null:parseFloat(String(v).replace(",","."));
    const showErr=(sec,msg)=>{const e=$(`#err-${sec}`),r=$(`#res-${sec}`);if(e){e.textContent=msg;e.classList.add("show")}if(r)r.classList.remove("show")};
    const clearErr=sec=>$(`#err-${sec}`)?.classList.remove("show");
    const showRes=(sec,msg)=>{clearErr(sec);const r=$(`#res-${sec}`);if(r){r.innerHTML=`<div class="result-title">${msg}</div><div class="disclaimer">Tabela auxilia, mas não é 100% precisa.</div>`;r.classList.add("show")}};
    const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));

    // Evita navegação por âncoras, se houver
    $$('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>e.preventDefault()));

    const setTab=id=>{
      $$(".tab-button").forEach(b=>b.classList.remove("active"));
      $(`#tab-${id}`)?.classList.add("active");
      $$(".section").forEach(s=>s.classList.remove("active"));
      $(`#sec-${id}`)?.classList.add("active");
      $("#body-illustration")?.style && ($("#body-illustration").style.display=(id==="calcados")?"none":"block");
      $("#foot-illustration")?.style && ($("#foot-illustration").style.display=(id==="calcados")?"block":"none");
      $$('[id^="instructions-"]').forEach(el=>el.style.display="none");
      $(`#instructions-${id}`)?.style && ($(`#instructions-${id}`).style.display="block");
      // limpeza rápida dos campos da aba ativa
      $(`#sec-${id}`)?.querySelectorAll("input").forEach(i=>{ if(i.type==="checkbox") i.checked=(i.id==="shoe-folga"); else i.value=""; });
      $(`#sec-${id}`)?.querySelectorAll("select").forEach(s=>{ if(s.id==="cam-caimento"||s.id==="cal-caimento") s.value="regular"; if(s.id==="shoe-meia") s.value="normal"; });
      $("#grp-torax")&&( $("#grp-torax").style.display="none", $("#cam-usar-torax").checked=false );
      clearErr(id); $(`#res-${id}`)?.classList.remove("show");
    };
    $$(".tab-button").forEach(btn=>btn.addEventListener("click",e=>{e.preventDefault();setTab(btn.id.replace("tab-",""))}));
    setTab(($(".tab-button.active")?.id||"tab-camisetas").replace("tab-",""));

    // Camisetas
    const teeOrder=["PP","P","M","G","GG"];
    const teeFromChest=ch=>ch<=87?"PP":ch<=95?"P":ch<=103?"M":ch<=111?"G":"GG";
    const teeFromHW=(h,w)=>{const hB=h<160?0:h<170?1:h<180?2:3,wB=w<50?0:w<60?1:w<70?2:w<80?3:w<90?4:5,grid=[["PP","PP","P","P","M","G"],["PP","P","P","M","M","G"],["P","P","M","M","G","GG"],["P","M","M","G","G","GG"]];return grid[hB][wB]};
    const teeFit=(sz,p)=>teeOrder[clamp(teeOrder.indexOf(sz)+(p==="justo"?-1:p==="solto"?1:0),0,teeOrder.length-1)];
    $("#cam-usar-torax")?.addEventListener("change",e=>{$("#grp-torax").style.display=e.target.checked?"block":"none"});
    $("#btn-cam-calcular")?.addEventListener("click",()=>{
      const h=N($("#cam-altura").value),w=N($("#cam-peso").value),pref=$("#cam-caimento").value,useChest=$("#cam-usar-torax").checked,chest=useChest?N($("#cam-torax").value):null;
      if(!h||!w) return showErr("camisetas","Informe altura e peso.");
      if(h<140||h>210||w<35||w>150) return showErr("camisetas","Valores fora da faixa.");
      if(useChest&&(!chest||chest<80||chest>125)) return showErr("camisetas","Tórax entre 80 e 125 cm.");
      const base=useChest?teeFromChest(chest):teeFromHW(h,w),final=teeFit(base,pref);
      showRes("camisetas",`Tamanho sugerido: ${final}`);
    });
    $("#btn-cam-limpar")?.addEventListener("click",()=>{["#cam-altura","#cam-peso","#cam-torax"].forEach(s=>{const el=$(s);if(el)el.value=""});$("#cam-caimento").value="regular";$("#cam-usar-torax").checked=false;$("#grp-torax").style.display="none";clearErr("camisetas");$("#res-camisetas")?.classList.remove("show")});

    // Calças
    const pantOrder=["34","36","38","40","42","44"];
    const gradeCalcas={'34':{cintura:[62,66],entre:[76,78]},'36':{cintura:[66,70],entre:[76,78]},'38':{cintura:[70,74],entre:[77,79]},'40':{cintura:[74,78],entre:[78,80]},'42':{cintura:[78,82],entre:[79,81]},'44':{cintura:[82,86],entre:[80,82]}};
    const pickPantByWaist=w=>{for(const k of pantOrder){const g=gradeCalcas[k];if(w>=g.cintura[0]&&w<=g.cintura[1])return k}let best="44",d=1e9;for(const k of pantOrder){const g=gradeCalcas[k],dist=w<g.cintura[0]?g.cintura[0]-w:w>g.cintura[1]?w-g.cintura[1]:0;if(dist<d){d=dist;best=k}}return best};
    const pantFit=(sz,p)=>pantOrder[clamp(pantOrder.indexOf(sz)+(p==="justo"?-1:p==="solto"?1:0),0,pantOrder.length-1)];
    $("#btn-cal-calcular")?.addEventListener("click",()=>{
      const cintura=N($("#cal-cintura").value),altura=N($("#cal-altura").value),pref=$("#cal-caimento").value;
      if(!cintura||!altura) return showErr("calcas","Informe cintura e altura.");
      if(cintura<55||cintura>130||altura<140||altura>210) return showErr("calcas","Valores fora da faixa.");
      const base=pickPantByWaist(cintura),final=pantFit(base,pref);
      showRes("calcas",`Tamanho sugerido: ${final}`);
    });
    $("#btn-cal-limpar")?.addEventListener("click",()=>{["#cal-cintura","#cal-altura"].forEach(s=>{const el=$(s);if(el)el.value=""});$("#cal-caimento").value="regular";clearErr("calcas");$("#res-calcas")?.classList.remove("show")});

    // Calçados
    const tabelaShoes=[
      {br:33,eu:35,usM:null,usF:5,max:22.0},
      {br:34,eu:36,usM:null,usF:6,max:22.7},
      {br:35,eu:37,usM:null,usF:6.5,max:23.3},
      {br:36,eu:38,usM:6,usF:7.5,max:24.0},
      {br:37,eu:39,usM:7,usF:8.5,max:24.7},
      {br:38,eu:40,usM:7.5,usF:9,max:25.3},
      {br:39,eu:41,usM:8,usF:10,max:26.0},
      {br:40,eu:42,usM:9,usF:11,max:26.7},
      {br:41,eu:43,usM:10,usF:12,max:27.3},
      {br:42,eu:44,usM:10.5,usF:13,max:28.0}
    ];
    const sockAdj=t=>t==="grossa"?0.2:t==="fina"?0:0.1;
    $("#btn-shoe-calcular")?.addEventListener("click",()=>{
      const comp=N($("#shoe-comprimento").value),folga=$("#shoe-folga").checked?0.5:0,meia=$("#shoe-meia").value;
      if(!comp) return showErr("calcados","Informe o comprimento do pé.");
      if(comp<20||comp>32) return showErr("calcados","Comprimento entre 20 e 32 cm.");
      const eff=comp+folga+sockAdj(meia); let pick=tabelaShoes.find(i=>eff<=i.max); if(!pick) pick={br:43};
      showRes("calcados",`Tamanho sugerido: BR ${pick.br}`);
    });
    $("#btn-shoe-limpar")?.addEventListener("click",()=>{$("#shoe-comprimento").value="";$("#shoe-folga").checked=true;$("#shoe-meia").value="normal";clearErr("calcados");$("#res-calcados")?.classList.remove("show")});

    // Enter para calcular dentro do shadow
    ['sec-camisetas','sec-calcas','sec-calcados'].forEach(id => {
      shadow.getElementById(id).querySelectorAll("input, select").forEach(el=>{
        el.addEventListener("keypress",e=>{
          if(e.key==="Enter"){
            const p=id==="sec-camisetas"?"cam":id==="sec-calcas"?"cal":"shoe";
            shadow.getElementById(`btn-${p}-calcular`)?.click();
          }
        });
      });
    });
  })();
})();
