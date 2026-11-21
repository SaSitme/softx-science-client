const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const e = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt = v => v == null ? '—' : Number(v.toPrecision(9)).toString();
const routes = {library:'Публикации',results:'Данные',xray:'PDF X-Ray',graphs:'Graph Hunter',detective:'Science Detective',compare:'Сопоставление',export:'Экспорт данных'};
const paths = {
  logo:'<path d="M4 19 12 4l8 15H4Z M8 13l4 6 4-6M8 13h8"/>',
  home:'<path d="m3 10 9-7 9 7M5 9v11h5v-6h4v6h5V9"/>',
  bell:'<path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5l-2 3ZM10 20a2 2 0 0 0 4 0"/>',
  flask:'<path d="M9 3h6m-5 0v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8"/>',
  list:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
  grid:'<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
  library:'<path d="M4 5h4v15H4zM10 5h4v15h-4zM16 6l3.5-.7L22 20l-3.5.6z"/>',
  table:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14h18M10 9v11"/>',
  scan:'<path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3M7 12h10m-9-4h8m-8 8h8"/>',
  chart:'<path d="M3 4v16h18M6 15l4-5 4 3 6-7"/><circle cx="20" cy="6" r="1"/>',
  shield:'<path d="M12 22s7-3.5 7-10V5l-7-3-7 3v7c0 6.5 7 10 7 10Z M9 12l2 2 4-4"/>',
  compare:'<path d="M8 5v14m8-14v14M4 8h8m0 8h8"/><circle cx="8" cy="8" r="2" fill="white"/><circle cx="16" cy="16" r="2" fill="white"/>',
  download:'<path d="M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4"/>',
  upload:'<path d="M12 16V4m-4 4 4-4 4 4M4 16v4h16v-4"/>',
  plus:'<path d="M12 5v14M5 12h14"/>', minus:'<path d="M5 12h14"/>',
  database:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
  chevron:'<path d="m9 6 6 6-6 6"/>', left:'<path d="m15 6-6 6 6 6"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
  file:'<path d="M6 3h8l4 4v14H6zM14 3v5h4M9 13h6m-6 4h6"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  alert:'<path d="M10.4 5 3.2 18a1.2 1.2 0 0 0 1.1 1.8h15.4a1.2 1.2 0 0 0 1.1-1.8L13.6 5a1.8 1.8 0 0 0-3.2 0ZM12 9v4m0 3v.2"/>',
  rotate:'<path d="M4 11a8 8 0 1 1 2 7M4 5v6h6"/>',
  x:'<path d="m6 6 12 12M18 6 6 18"/>', pencil:'<path d="M4 20l1-5L16 4l4 4L9 19zM14 6l4 4"/>',
  layers:'<path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/>',
  history:'<path d="M4 11a8 8 0 1 1 2 7M4 5v6h6m2-4v5l3 2"/>'
};
const icon = n => '<svg viewBox="0 0 24 24" aria-hidden="true">'+(paths[n] || paths.file)+'</svg>';
const i = n => '<i data-icon="'+n+'">'+icon(n)+'</i>';
$$('[data-icon]').forEach(el => el.innerHTML = icon(el.dataset.icon));
const corpus = {included:['В корпусе','good'],excluded_tandem:['Тандем','bad'],excluded_theoretical:['Теоретическая','warn'],needs_review:['На рассмотрении','']};
const processing = {completed:['Обработан','good'],partial:['Частично','warn'],failed:['Ошибка PDF','bad'],queued:['В очереди',''],processing:['Обработка','violet']};
const origins = {primary:'Первичный',cited:'Цитируемый'};
const roles = {value:'Значение',unit:'Единица',sample_label:'Образец',condition:'Условие'};
const metricLabels = {
  PCE:'Коэффициент полезного действия',
  Voc:'Напряжение холостого хода',
  Jsc:'Плотность тока короткого замыкания',
  FF:'Коэффициент заполнения',
  Rs:'Последовательное сопротивление',
  Rsh:'Шунтирующее сопротивление',
  HI:'Индекс гистерезиса',
  Jsc_EQE:'Плотность тока короткого замыкания по внешней квантовой эффективности',
  T80:'Время снижения эффективности до 80%',
  Eg:'Ширина запрещённой зоны',
  Pin:'Плотность мощности падающего света'
};
const metricLabel = code => Object.hasOwn(metricLabels,code)?`${metricLabels[code]} (${code})`:code;
const fieldLabels = {
  publication_code:'Код публикации', publication_id:'Идентификатор публикации', pdf_version_id:'Версия PDF',
  id:'Идентификатор записи', title:'Название публикации', year:'Год', doi:'DOI', authors:'Авторы', journal:'Журнал',
  corpus_status:'Статус в корпусе', corpus_reason:'Основание решения', corpus_manual:'Решение принято вручную', is_fixture:'Тестовый документ',
  metric_name:'Показатель', metric_value:'Значение', metric_unit:'Единица измерения', device_label:'Обозначение прибора',
  scan_direction:'Направление развёртки', aggregation:'Тип агрегации', result_origin:'Происхождение результата',
  raw_value:'Значение в публикации', raw_unit:'Единица в публикации', normalized_value:'Нормализованное значение',
  normalized_unit:'Единица после нормализации', spread_value:'Разброс значений', n_devices:'Число приборов',
  time_point:'Момент измерения', time_unit:'Единица времени', source_page:'Страница PDF', source_table:'Таблица в статье',
  source_figure:'Рисунок в статье', source_text:'Фрагмент источника', extraction_status:'Статус проверки',
  extraction_method:'Способ извлечения', device_id:'Идентификатор прибора', measurement_id:'Идентификатор измерения',
  material_id:'Идентификатор материала', cited_doi:'DOI цитируемой публикации', cited_publication_id:'Идентификатор цитируемой публикации',
  duplicate_of:'Дублируемая запись', note:'Примечание', value_state:'Состояние значения',
  range_min:'Нижняя граница диапазона', range_max:'Верхняя граница диапазона', inequality_op:'Знак неравенства',
  material_name_raw:'Название материала в статье', formula_normalized:'Химическая формула', material_class:'Класс материала',
  dimensionality:'Размерность материала', additives:'Добавки', bandgap_value:'Ширина запрещённой зоны',
  bandgap_unit:'Единица ширины запрещённой зоны', bandgap_method:'Метод определения ширины запрещённой зоны',
  device_role:'Роль прибора', device_type:'Тип прибора', architecture:'Архитектура', substrate_type:'Тип подложки',
  active_area:'Активная площадь', area_unit:'Единица площади', area_definition:'Определение площади', encapsulation:'Инкапсуляция',
  layer_order:'Порядок слоя', layer_function:'Функция слоя', layer_material:'Материал слоя',
  layer_thickness:'Толщина слоя', thickness_unit:'Единица толщины', deposition_method:'Метод нанесения',
  annealing_temperature:'Температура отжига', annealing_time:'Время отжига', atmosphere:'Атмосфера обработки',
  measurement_type:'Тип измерения', spectrum:'Спектр освещения', light_intensity:'Интенсивность освещения',
  light_intensity_unit:'Единица интенсивности', intensity_source_id:'Источник интенсивности освещения',
  scan_rate:'Скорость развёртки', mask_used:'Использована маска', certified:'Сертификация', temperature:'Температура измерения',
  stability_protocol:'Протокол испытания стабильности', stress_conditions:'Условия испытания',
  batch_label:'Обозначение партии', condition_label:'Обозначение условий',
  rule_code:'Код правила', severity:'Серьёзность', compared_values:'Сравниваемые значения', threshold:'Допуск или порог',
  description:'Описание', hypothesis:'Гипотеза для проверки', resolution_status:'Статус замечания', updated_at:'Последнее обновление',
  plot_dataset:'Данные графика'
};
const fieldLabel = key => Object.hasOwn(fieldLabels,key)?fieldLabels[key]:key.replaceAll('_',' ');
const scanLabels = {reverse:'Обратный ход',forward:'Прямой ход'};
const aggregationLabels = {unknown:'Не указана',champion:'Лучший прибор',mean:'Среднее',median:'Медиана',single:'Один прибор'};
const badge = (label, color='') => '<span class="badge '+color+'">'+e(label)+'</span>';
const tag = (set, key) => badge(...(set[key] || [key]));
const btn = (iconName, title, extra='') => '<button class="icon-btn" aria-label="'+e(title)+'" title="'+e(title)+'" '+extra+'>'+i(iconName)+'</button>';
const options = (map, selected='') => Object.entries(map).map(([value,text]) => '<option value="'+e(value)+'" '+(value===selected?'selected':'')+'>'+e(text)+'</option>').join('');
const sel = (name, label, map, value) => '<select name="'+name+'" aria-label="'+label+'">'+options(map,value)+'</select>';
const fileRoute = p => '#xray/'+p.version_id;
const state = {publications:[], results:[], active_issues:0, page:1, zoom:1, rotation:0, current:null, roles:new Set(Object.keys(roles)), filter:{}, routeToken:0};
const phone = window.matchMedia('(max-width: 720px)');
let toastTimer;
function toast(message) {
  const node=$('#toast'); node.textContent=message; node.style.display='block';
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>node.style.display='none',4500);
}
async function api(path, init={}) {
  const response=await fetch(path, init);
  let body;
  try { body=await response.json(); } catch { throw Error('Сервер вернул неожиданный ответ'); }
  if (!response.ok) throw Error(body.error || 'Ошибка сервера');
  return body;
}
const json = (body, method='PATCH') => ({method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
const dialog = $('#edit-dialog');
function showForm(title, html, save) {
  dialog.innerHTML='<form><div class="dialog-head"><h2>'+title+'</h2>'+btn('x','Закрыть','type="button" data-close="edit-dialog"')+'</div>'+html+'<div class="dialog-actions"><button type="button" data-close="edit-dialog">Отмена</button><button type="submit" class="primary">Сохранить</button></div></form>';
  dialog.showModal();
  $('form',dialog).addEventListener('submit', async ev=>{
    ev.preventDefault();
    const button=$('button[type=submit]',dialog); button.disabled=true;
    try {await save(new FormData(ev.currentTarget));dialog.close();toast('Изменения сохранены');}
    catch (ex) {toast(ex.message);}
    finally {button.disabled=false;}
  });
}
const pageIntro = (title, description, actions='') => '<div class="page-intro"><div><h1>'+title+'</h1><p>'+description+'</p></div>'+actions+'</div>';
const empty = message => '<div class="empty">'+e(message)+'</div>';
const tableHint='<p class="table-hint">Проведите по таблице вбок, чтобы увидеть остальные столбцы.</p>';
const main=$('#main');
let pollTimer;
async function fetchLibrary() {
  Object.assign(state,await api('/api/library'));
  $('.top-issues').classList.toggle('has-issues',state.active_issues>0);
}
function schedule() {
  clearTimeout(pollTimer);
  if (!state.publications.some(p=>['processing','queued'].includes(p.processing_status))) return;
  pollTimer=setTimeout(async ()=>{
    const route=location.hash.split('/')[0];
    try {
      await fetchLibrary();
      if (route==='#library'||!route) refreshLibrary();
      if (location.hash==='#graphs') await routeView(true);
      if (route==='#xray' && state.detail && ['queued','processing'].includes(state.detail.pdf.processing_status)) await routeView(true);
      schedule();
    } catch(ex) {toast(ex.message);}
  },450);
}
async function routeView(preserve=false) {
  const token=++state.routeToken;
  const [requested,id,focus]=location.hash.slice(1).split('/');
  const name=routes[requested]?requested:'library';
  if (!preserve) window.scrollTo(0,0);
  $$('[data-nav]').forEach(el=>{
    const active=el.dataset.nav===name;
    el.classList.toggle('active',active);
    if(active) el.setAttribute('aria-current','page');
    else el.removeAttribute('aria-current');
  });
  $('#section-name').textContent=routes[name];
  try {
    if (name==='library') return library();
    if (name==='results') return await dataView(token,id);
    if (name==='xray' && !id) return pickPublication('PDF X-Ray','Выберите публикацию для просмотра источников.','xray');
    if (name==='xray') {
      const detail=await api('/api/pdf/'+id);
      if (token!==state.routeToken) return;
      if (state.detail?.pdf.id!==id) Object.assign(state,{page:1,zoom:1,rotation:0,current:null,currentRef:null,graphPoint:null});
      state.detail=detail;
      xray();
      if(focus) {
        if(focus.startsWith('point,')) {
          const [,page,x,y]=focus.split(',');
          state.page=+page;state.graphPoint=[+x,+y]; renderPdf();
        } else if(focus.startsWith('ref,')) {
          const ref=detail.sources.find(s=>s.id===focus.slice(4));
          if(ref) {
            state.page=ref.source_page;state.currentRef=ref.id;state.graphPoint=null;state.roles.add(ref.fragment_role);
            state.current=detail.links.find(l=>l.source_reference_id===ref.id)?.result_id||null;
            renderRecords();renderPdf(true);showPdfOnPhone();
          }
        } else selectResult(focus);
      }
      return;
    }
    if (name==='graphs' && !id) return pickPublication('Graph Hunter','Выберите публикацию с графиками.','graphs');
    if (name==='graphs') {
      const detail=await api('/api/pdf/'+id);
      if(token!==state.routeToken)return;
      state.graphDetail=detail;
      return graphView(focus);
    }
    if(name==='detective')return await detectiveView(token);
    if(name==='compare')return await compareView(token,['certified','stability'].includes(id)?id:'ordinary');
    if(name==='export')return exportView();
    main.innerHTML=pageIntro(routes[name],'Выберите публикацию в библиотеке.');
  } catch(ex) {if(token===state.routeToken) main.innerHTML=empty(ex.message);}
}
const stat = (glyph,count,label,tone='') => '<div class="stat"><span class="stat-icon '+tone+'" data-icon="'+glyph+'">'+icon(glyph)+'</span><span><b>'+count+'</b><small>'+label+'</small></span></div>';
function updateStats() {
  const node=$('#stats');
  if(!node) return;
  node.innerHTML=stat('library',state.publications.length,'Публикации')+
    stat('check',state.publications.filter(p=>p.corpus_status==='included').length,'В корпусе','mint')+
    stat('table',state.results.length,'Извлечённые значения','blue')+
    stat('alert',state.active_issues,'Замечания','amber');
}
const publicationViews = {
  all:['Все публикации','library'],
  included:['В корпусе','check'],
  completed:['Обработанные','layers'],
  issues:['С замечаниями','alert']
};
function library() {
  const filters=state.filter;
  const classes=Object.fromEntries(state.publications.flatMap(p=>(p.material_class||'').split(',').filter(Boolean)).sort().map(v=>[v,v]));
  main.innerHTML='<section class="hero"><div class="hero-copy"><div class="eyebrow">'+i('flask')+' ТОНКОПЛЁНОЧНАЯ ФОТОВОЛЬТАИКА</div><h1>Корпус публикаций</h1><p>Извлекайте данные солнечных элементов и проверяйте каждое значение по первоисточнику.</p><button class="ghost" id="hero-upload">'+i('upload')+' Загрузить публикации</button></div></section>'+
    '<div class="stats" id="stats"></div><div class="section-head"><div><h2>Библиотека публикаций</h2><p>PDF, результаты извлечения и решения по корпусу</p></div></div>'+
    '<div class="library-tabs" id="library-tabs" role="group" aria-label="Подборки публикаций">'+
    Object.entries(publicationViews).map(([key,[label,glyph]])=>'<button type="button" data-library-tab="'+key+'">'+i(glyph)+'<span>'+label+'</span> <span data-tab-count></span></button>').join('')+
    '</div><section class="card library-card"><div class="toolbar library-toolbar" id="library-toolbar"><label class="search">'+i('search')+'<input id="pub-search" aria-label="Поиск публикаций" placeholder="Поиск по названию, DOI, материалу, автору…" value="'+e(filters.pub||'')+'"></label>'+
    sel('material-filter','Материал',{'':'Материал',...classes},filters['material-filter']||'')+
    sel('corpus-filter','Статус корпуса',{'':'Корпус',...Object.fromEntries(Object.entries(corpus).map(([k,v])=>[k,v[0]]))},filters['corpus-filter']||'')+
    sel('processing-filter','Обработка',{'':'Обработка',...Object.fromEntries(Object.entries(processing).map(([k,v])=>[k,v[0]]))},filters['processing-filter']||'')+
    sel('sort','Сортировка',{'new':'Сначала новые','old':'Сначала старые','title':'По названию'},filters.sort||'new')+
    '<div class="view-switch" role="group" aria-label="Вид библиотеки">'+btn('list','Список','data-library-layout="list"')+btn('grid','Карточки','data-library-layout="grid"')+'</div>'+
    '</div><div id="publication-rows"></div></section>';
  $('#hero-upload').onclick=openUpload;
  $('#pub-search').oninput=ev=>{
    filters.pub=ev.target.value;
    $('#global-search input').value=filters.pub;
    refreshLibrary();
  };
  $('#library-toolbar').onchange=ev=>{
    if(ev.target.matches('select')) {
      filters[ev.target.name]=ev.target.value;
      refreshLibrary();
    }
  };
  $('#library-tabs').onclick=ev=>{
    const tab=ev.target.closest('[data-library-tab]');
    if(!tab) return;
    filters.libraryTab=tab.dataset.libraryTab;
    for(const name of ['corpus-filter','processing-filter']) {
      filters[name]='';
      $(`[name="${name}"]`).value='';
    }
    refreshLibrary();
  };
  $('.view-switch').onclick=ev=>{
    const choice=ev.target.closest('[data-library-layout]');
    if(!choice) return;
    filters.libraryLayout=choice.dataset.libraryLayout;
    refreshLibrary();
  };
  refreshLibrary();
}
function refreshLibrary() {
  const target=$('#publication-rows');
  if(!target) return;
  updateStats();
  const filters=state.filter, q=(filters.pub||'').trim().toLowerCase();
  const tab=filters.libraryTab||'all', layout=filters.libraryLayout||(phone.matches?'grid':'list');
  const issues=new Set(state.results.filter(r=>r.has_issues).map(r=>r.pdf_version_id));
  const matches={
    all:()=>true,
    included:p=>p.corpus_status==='included',
    completed:p=>p.processing_status==='completed',
    issues:p=>issues.has(p.version_id)
  };
  $$('[data-library-tab]').forEach(button=>{
    const key=button.dataset.libraryTab;
    button.setAttribute('aria-pressed',String(key===tab));
    $('[data-tab-count]',button).textContent='('+state.publications.filter(matches[key]).length+')';
  });
  $$('[data-library-layout]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.libraryLayout===layout)));
  const sourceText=new Map();
  if(q) for(const r of state.results) {
    const fragments=sourceText.get(r.pdf_version_id)||[];
    fragments.push(r.device_label,metricLabel(r.metric_name),r.source_text);
    sourceText.set(r.pdf_version_id,fragments);
  }
  const publications=state.publications.filter(p=>matches[tab](p)
    && (!q||[p.title,p.doi,p.filename,p.material_class,p.authors,...(sourceText.get(p.version_id)||[])].join(' ').toLowerCase().includes(q))
    && (!filters['material-filter']||p.material_class?.split(',').includes(filters['material-filter']))
    && (!filters['corpus-filter']||p.corpus_status===filters['corpus-filter'])
    && (!filters['processing-filter']||p.processing_status===filters['processing-filter']));
  if(filters.sort==='old') publications.reverse();
  if(filters.sort==='title') publications.sort((a,b)=>a.title.localeCompare(b.title,'ru'));

  const entry=p=>'<a class="article-cell" href="'+fileRoute(p)+'"><span class="file-icon" data-icon="file">'+icon('file')+'</span><span><b>'+e(p.title)+'</b><small>'+e(p.filename)+(p.is_fixture?' · тестовый PDF':'')+'</small></span></a>';
  const actions=p=>'<div class="row-actions">'+btn('rotate','Повторить обработку','data-retry="'+p.version_id+'" '+(['queued','processing'].includes(p.processing_status)?'disabled':''))+
    '<a class="button icon-btn" aria-label="Открыть PDF X-Ray" href="'+fileRoute(p)+'">'+i('chevron')+'</a></div>';
  const corpusTag=p=>'<span title="'+e(p.corpus_reason)+'">'+tag(corpus,p.corpus_status)+'</span>';
  const processTag=p=>'<span title="'+e(p.error_message)+'">'+tag(processing,p.processing_status)+'</span>';
  let content;
  if(!publications.length) content=empty(state.publications.length?'Нет публикаций по выбранным условиям.':'Загрузите PDF, чтобы создать корпус.');
  else if(layout==='grid') content='<div class="publication-grid">'+publications.map(p=>'<article class="publication-card">'+entry(p)+
    '<div class="publication-card-tags">'+corpusTag(p)+processTag(p)+'</div><div class="publication-card-footer"><span>'+e(p.material_class||'—')+' · Значения: '+p.result_count+'</span>'+actions(p)+'</div></article>').join('')+'</div>';
  else content=tableHint+'<div class="table-scroll" tabindex="0" role="region" aria-label="Таблица публикаций"><table class="publication-table"><thead><tr><th>Публикация</th><th>Материал</th><th>Корпус</th><th>Обработка</th><th>Значения</th><th aria-label="Действия"></th></tr></thead><tbody>'+
    publications.map(p=>'<tr data-publication="'+p.version_id+'"><td>'+entry(p)+'</td><td>'+e(p.material_class||'—')+'</td><td>'+corpusTag(p)+'</td><td>'+processTag(p)+'</td><td>'+p.result_count+'</td><td>'+actions(p)+'</td></tr>').join('')+'</tbody></table></div>';
  target.innerHTML=content+'<div class="table-foot"><span>Показано '+publications.length+' из '+state.publications.length+'</span></div>';
}
const globalSearch=$('#global-search');
const globalQuery=$('input',globalSearch);
const applePlatform=/Mac|iPhone|iPad/.test(navigator.platform);
$('kbd',globalSearch).textContent=applePlatform?'⌘ K':'Ctrl K';
globalSearch.onsubmit=ev=>{
  ev.preventDefault();
  state.filter.pub=globalQuery.value;
  if(!$('#pub-search')) location.hash='#library';
  else {
    $('#pub-search').value=globalQuery.value;
    refreshLibrary();
  }
};
window.addEventListener('keydown',ev=>{
  if((ev.ctrlKey||ev.metaKey)&&ev.key.toLowerCase()==='k'&&!document.querySelector('dialog[open]')) {
    ev.preventDefault();
    globalQuery.focus();
    globalQuery.select();
  }
});
function pickPublication(title, description, route) {
  const graphsOnly=route==='graphs';
  const publications=state.publications.filter(p=>p.pages.length&&(!graphsOnly||p.plot_count>0));
  const noPublications=graphsOnly?'Пока нет публикаций с графиками. График можно добавить вручную из PDF X-Ray.':'Пока нет обработанных публикаций.';
  main.innerHTML=pageIntro(title,description)+'<section class="card details">'+
    (publications.map(p=>'<p><a class="link" href="#'+route+'/'+p.version_id+'">'+e(p.title)+'</a></p>').join('')||empty(noPublications))+'</section>';
}
const resultColumns=['publication_code','metric_name','metric_value','metric_unit','device_label','scan_direction','aggregation','result_origin','raw_value','raw_unit','normalized_value','normalized_unit','spread_value','n_devices','time_point','time_unit','source_page','source_table','source_figure','source_text','extraction_status','extraction_method','device_id','measurement_id','material_id','cited_doi','duplicate_of','note'];
function allResults() {
  const classes=Object.fromEntries([...new Set(state.results.map(r=>r.material_class).filter(Boolean))].map(v=>[v,v]));
  main.innerHTML=pageIntro('Данные','Структурированные значения с привязкой к публикациям и приборам.')+
    dataTabs('results')+'<section class="card"><div class="toolbar results-toolbar" id="results-filters"><label class="search">'+i('search')+'<input id="result-search" aria-label="Поиск данных" placeholder="Публикация, образец, метрика, фрагмент…" value="'+e(state.filter.q||'')+'"></label>'+
    '<div class="view-switch" role="group" aria-label="Вид результатов">'+btn('list','Таблица результатов','data-result-layout="table"')+
    btn('grid','Карточки результатов','data-result-layout="cards"')+'</div>'+
    '<details class="result-filter-panel" '+(phone.matches?'':'open')+'><summary>Фильтры результатов</summary><div class="result-filter-fields">'+
    sel('material_class','Класс материала',{'':'Все материалы',...classes},state.filter.material_class)+
    sel('architecture','Архитектура',{'':'Все архитектуры','n-i-p':'n-i-p','p-i-n':'p-i-n',substrate:'substrate',superstrate:'superstrate'},state.filter.architecture)+
    sel('result_origin','Происхождение',{'':'Любое происхождение',...origins},state.filter.result_origin)+
    sel('extraction_status','Статус проверки',{'':'Любая верификация','Извлечено автоматически':'Извлечено автоматически','Подтверждено пользователем':'Подтверждено пользователем','Требует проверки':'Требует проверки'},state.filter.extraction_status)+
    sel('extraction_method','Способ извлечения',{'':'Любой способ',local_ai_pdf_quote:'Предложения локального ИИ',plot_calculation:'Расчёт по графику'},state.filter.extraction_method)+
    sel('has_issues','Замечания',{'':'Все замечания','1':'Есть замечания','0':'Без замечаний'},state.filter.has_issues)+
    sel('certified','Сертификация',{'':'Любая сертификация','1':'Сертифицировано','0':'Сертификация не подтверждена'},state.filter.certified)+
    '</div></details></div><div id="result-rows"></div></section>';
  $('#results-filters').onchange=ev=>{
    if(!ev.target.matches('select'))return;
    state.filter[ev.target.name]=ev.target.value;
    refreshResults();
  };
  $('#result-search').oninput=ev=>{state.filter.q=ev.target.value;refreshResults();};
  $('.results-toolbar .view-switch').onclick=ev=>{
    const choice=ev.target.closest('[data-result-layout]');
    if(!choice)return;
    state.filter.resultLayout=choice.dataset.resultLayout;
    refreshResults();
  };
  $('#result-rows').addEventListener('toggle',ev=>{
    const details=ev.target;
    if(!details.matches('[data-result-fields]')||!details.open||$('dl',details))return;
    const record=state.results.find(r=>r.id===details.dataset.resultFields);
    if(record) details.insertAdjacentHTML('beforeend','<dl>'+resultColumns.map(column=>
      '<dt>'+e(fieldLabel(column))+'</dt><dd>'+e(tableText(column,record[column]))+'</dd>').join('')+'</dl>');
  },true);
  refreshResults();
}
function refreshResults() {
  const q=(state.filter.q||'').trim().toLowerCase();
  const fields=['material_class','architecture','result_origin','extraction_status','extraction_method','has_issues','certified'];
  const rs=state.results.filter(r=>[r.publication_code,r.publication_title,r.material_class,r.device_label,metricLabel(r.metric_name),r.source_text].join(' ').toLowerCase().includes(q)
    && fields.every(key=>!state.filter[key] || state.filter[key]===String(r[key] ?? (key==='certified'?0:''))));
  const target=$('#result-rows');
  if(!target)return;
  const layout=state.filter.resultLayout||(phone.matches?'cards':'table');
  $$('[data-result-layout]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.resultLayout===layout)));
  target.innerHTML=(layout==='cards'&&rs.length?resultCards(rs):dataTable(rs,resultColumns))+'<div class="table-foot">Найдено '+rs.length+'</div>';
}
function resultCards(records) {
  return '<div class="result-card-grid">'+records.map(r=>'<article class="result-card">'+
    '<div class="result-card-head"><h2>'+e(metricLabel(r.metric_name))+'</h2><strong>'+(r.plot_id?'≈ ':'')+measurementValue(r)+'</strong></div>'+
    '<p>'+e(r.publication_code||r.publication_title)+'</p>'+
    (r.device_label?'<p>Прибор '+e(r.device_label)+(r.scan_direction?' · '+e(scanLabels[r.scan_direction]||r.scan_direction):'')+'</p>':'')+
    '<div class="result-card-actions">'+resultBadge(r)+
    (r.pdf_version_id?'<a class="button" href="#xray/'+e(r.pdf_version_id)+'/'+e(r.id)+'">'+i('scan')+' К источнику в PDF</a>':'')+'</div>'+
    '<details data-result-fields="'+e(r.id)+'"><summary>Все поля</summary></details></article>').join('')+'</div>';
}
function resultBadge(r) {return badge(r.extraction_status,r.extraction_status.startsWith('Подтверждено')?'good':r.extraction_status.startsWith('Требует')?'warn':'violet');}
function measurementValue(r) {return e((r.inequality_op||'')+(r.range_min==null?fmt(r.normalized_value??r.metric_value):fmt(r.range_min)+'–'+fmt(r.range_max)))+' '+e(r.normalized_unit??r.metric_unit);}
function xray() {
  const {pdf,publication,devices,measurements,layers,materials,audit,plots}=state.detail;
  const canAddPlot=pdf.pages.length&&pdf.pv_extraction_enabled!==0&&!publication.corpus_status.startsWith('excluded');
  const graphLink=plots.length||canAddPlot?'<a class="button" href="#graphs/'+pdf.id+(plots.length?'':'/new')+'">'+
    i('chart')+(plots.length?' Graph Hunter':' Добавить график')+'</a>':'';
  const actions='<div class="row-actions"><a class="button" href="/api/pdf/'+pdf.id+'/original" target="_blank" rel="noopener">'+i('file')+' Оригинал PDF</a>'+
    graphLink+'<button id="corpus-edit">'+i('pencil')+' Решение по корпусу</button>'+btn('rotate','Повторить обработку','data-retry="'+pdf.id+'"')+'</div>';
  main.innerHTML='<p><a href="#library" class="link">Библиотека публикаций</a></p>'+
    pageIntro(e(publication.title),e(pdf.filename)+(publication.is_fixture?' · тестовый PDF':''),actions)+
    '<p>'+tag(corpus,publication.corpus_status)+' '+tag(processing,pdf.processing_status)+' '+e(publication.corpus_reason)+'</p>'+
    (pdf.error_message?'<div class="warning">Ошибка обработки: '+e(pdf.error_message)+'</div>':'')+
    pdf.failed_pages.map(p=>'<div class="warning">'+(p.page?'Страница '+p.page+'. ':'')+e(p.reason)+'. Ручной просмотр полей: '+e(p.fields.map(key=>Object.hasOwn(metricLabels,key)?metricLabel(key):fieldLabel(key)).join(', '))+'</div>').join('')+
    (pdf.pages.length?'<div class="xray-grid"><section class="card pdf-panel"><div class="toolbar" id="pdf-controls">'+
    btn('left','Предыдущая страница','id="pdf-prev"')+'<span id="pdf-pagination"></span>'+btn('chevron','Следующая страница','id="pdf-next"')+
    btn('minus','Уменьшить масштаб','id="pdf-minus"')+'<span id="pdf-zoom"></span>'+btn('plus','Увеличить масштаб','id="pdf-plus"')+
    btn('rotate','Повернуть страницу','id="pdf-rotate"')+'<span id="pdf-angle"></span><button id="pdf-records" class="phone-only">'+i('list')+' Записи</button></div>'+
    '<div class="toolbar overlay-filters">'+Object.entries(roles).map(([k,v])=>'<label><input type="checkbox" data-role-filter="'+k+'" '+(state.roles.has(k)?'checked':'')+'><span class="role-swatch role-'+k+'"></span> '+v+'</label>').join('')+
    '</div><div class="pdf-scroll" id="pdf-scroll"></div></section><section class="card records-panel"><div class="toolbar"><strong>Извлечённые записи</strong><span class="badge violet">'+state.detail.results.length+'</span></div><div id="record-list" class="record-list"></div><div id="active-record"></div></section></div>':'')+
    '<details class="card details"><summary>Приборы, материалы и измерения · '+devices.length+' / '+materials.length+' / '+measurements.length+'</summary>'+
    materials.map(m=>'<p><b>'+e(m.material_class)+'</b> · '+e(m.formula_normalized||m.material_name_raw)+(m.bandgap_value==null?'':' · '+metricLabel('Eg')+' '+fmt(m.bandgap_value)+' '+e(m.bandgap_unit))+'</p>').join('')+
    devices.map(d=>'<details><summary>'+e(d.device_label)+' · '+e([d.device_role,d.architecture,d.active_area&&d.active_area+' '+d.area_unit].filter(Boolean).join(' · '))+'</summary>'+
      layers.filter(l=>l.device_id===d.id).map(l=>'<p>'+e([l.layer_order,l.layer_function,l.layer_material,l.layer_thickness&&l.layer_thickness+' '+l.thickness_unit,l.deposition_method].filter(Boolean).join(' · '))+'</p>').join('')+
      measurements.filter(m=>m.device_id===d.id).map(m=>'<p>'+e([m.measurement_type,m.scan_direction,m.spectrum,m.light_intensity&&m.light_intensity+' '+m.light_intensity_unit,m.certified?'Сертифицировано':null].filter(Boolean).join(' · '))+'</p>').join('')+'</details>').join('')+'</details>'+
    '<details class="card details"><summary>История изменений · '+audit.length+'</summary>'+tableHint+'<div class="table-scroll" tabindex="0" role="region" aria-label="Таблица истории изменений"><table><thead><tr><th>Поле</th><th>Было</th><th>Стало</th><th>Автор</th><th>UTC</th></tr></thead><tbody>'+
    audit.map(a=>'<tr><td>'+e(fieldLabel(a.field_name))+'</td><td>'+e(a.old_value)+'</td><td>'+e(a.new_value)+'</td><td>'+e(a.author)+'</td><td>'+e(a.timestamp)+'</td></tr>').join('')+'</tbody></table></div></details>';
  $('#corpus-edit').onclick=()=>showForm('Решение по корпусу','<div class="form-grid"><label class="wide">Статус'+sel('corpus_status','Статус корпуса',Object.fromEntries(Object.entries(corpus).map(([k,v])=>[k,v[0]])),publication.corpus_status)+
    '</label><label class="wide">Основание<textarea name="corpus_reason" required rows="3">'+e(publication.corpus_reason)+'</textarea></label></div>',async form=>{
      await api('/api/publication/'+publication.id,json(Object.fromEntries(form))); await fetchLibrary(); await routeView(true); schedule();
    });
  if(!pdf.pages.length) return;
  $('#pdf-prev').onclick=()=>{state.page=Math.max(1,state.page-1);state.graphPoint=null;renderPdf();};
  $('#pdf-next').onclick=()=>{state.page=Math.min(pdf.pages.length,state.page+1);state.graphPoint=null;renderPdf();};
  $('#pdf-minus').onclick=()=>{state.zoom=Math.max(.35,state.zoom-.2);renderPdf();};
  $('#pdf-plus').onclick=()=>{state.zoom=Math.min(3,state.zoom+.2);renderPdf();};
  $('#pdf-rotate').onclick=()=>{state.rotation=(state.rotation+90)%360;renderPdf();};
  $('#pdf-records').onclick=()=>$('.records-panel').scrollIntoView({block:'start'});
  $$('.overlay-filters input').forEach(el=>el.onchange=()=>{if(el.checked)state.roles.add(el.dataset.roleFilter);else state.roles.delete(el.dataset.roleFilter);renderPdf();});
  renderRecords();renderPdf();
}
function viewport(meta, scale, angle) {
  const a=angle%360,w=meta.width*scale,h=meta.height*scale;
  if(a===90) return {width:h,height:w,matrix:[0,1,-1,0,h,0]};
  if(a===180) return {width:w,height:h,matrix:[-1,0,0,-1,w,h]};
  if(a===270) return {width:h,height:w,matrix:[0,-1,1,0,0,w]};
  return {width:w,height:h,matrix:[1,0,0,1,0,0]};
}
function visibleSource(source,sources,links) {
  const legacyValue=source.source_type==='text'&&source.fragment_role==='value';
  const tableValue=source.source_type==='table_cell'&&source.fragment_role==='value';
  const headerUnit=source.source_type==='table_header'&&source.fragment_role==='unit';
  if(!legacyValue&&!tableValue&&!headerUnit) return true;
  const resultIds=new Set(links.filter(l=>l.source_reference_id===source.id).map(l=>l.result_id));
  const [left,bottom,right,top]=source.bbox;
  return !sources.some(other=>{
    if(other.id===source.id||other.source_page!==source.source_page||other.fragment_role!==source.fragment_role) return false;
    const sharesResult=()=>links.some(l=>l.source_reference_id===other.id&&resultIds.has(l.result_id));
    if(!headerUnit) {
      const preferred=legacyValue ? source.id!==state.currentRef&&other.source_type==='table_cell'
        : other.id===state.currentRef&&other.source_type==='text';
      return preferred&&other.source_fragment===source.source_fragment
        &&other.bbox.every((coordinate,index)=>coordinate===source.bbox[index])&&sharesResult();
    }
    if(other.source_type!==source.source_type||source.id===state.currentRef) return false;
    const [x0,y0,x1,y1]=other.bbox;
    return x0>=left&&y0>=bottom&&x1<=right&&y1<=top&&x1-x0<right-left&&sharesResult();
  });
}
function renderPdf(scroll=false) {
  const {pdf,sources,links,results}=state.detail;
  const holder=$('#pdf-scroll'),meta=pdf.pages[state.page-1];
  if(!holder||!meta) return;
  holder.dataset.viewportWidth=holder.clientWidth;
  const previous=[holder.scrollLeft,holder.scrollTop];
  const angle=(state.rotation+meta.rotation)%360, turned=angle===90||angle===270;
  const scale=Math.min(1.2,Math.max(250,holder.clientWidth-32)/(turned?meta.height:meta.width))*state.zoom;
  const w=scale*meta.width,h=scale*meta.height, v=viewport(meta,scale,angle), box=meta.crop_box;
  const sourceLinks=links.reduce((map,link)=>{(map[link.source_reference_id] ||= []).push(link.result_id);return map;},{});
  const resultMap=Object.fromEntries(results.map(r=>[r.id,r]));
  const screen=(x,y)=>[(x-box[0])*scale*meta.user_unit,(box[3]-y)*scale*meta.user_unit];
  const isFocused=s=>s.id===state.currentRef||(!state.currentRef&&s.fragment_role==='value'&&sourceLinks[s.id]?.includes(state.current));
  const active=sources.filter(s=>s.source_page===state.page&&state.roles.has(s.fragment_role)&&sourceLinks[s.id]&&visibleSource(s,sources,links))
    .sort((a,b)=>Number(isFocused(a))-Number(isFocused(b)));
  const rectangles=active.map(s=>{
    const [x,y]=screen(s.bbox[0],s.bbox[3]),[x2,y2]=screen(s.bbox[2],s.bbox[1]);
    const linked=sourceLinks[s.id], r=resultMap[linked.includes(state.current)?state.current:linked[0]];
    const current=linked.includes(state.current)||s.id===state.currentRef;
    const label=[roles[s.fragment_role],metricLabel(r.metric_name),measurementValue(r).replaceAll('&amp;','&'),r.device_label,scanLabels[r.scan_direction]||r.scan_direction,origins[r.result_origin],r.confidence!=null?'Уверенность '+r.confidence:null].filter(Boolean).join(' · ');
    return '<rect class="highlight-'+s.fragment_role+(current?' highlight-current':'')+(isFocused(s)?' highlight-focused':'')+'" data-ref="'+s.id+'" tabindex="0" role="button" aria-label="'+e(label)+'" x="'+x+'" y="'+y+'" width="'+Math.max(1,x2-x)+'" height="'+Math.max(3,y2-y)+'"><title>'+e(label)+'</title></rect>';
  }).join('');
  const marker=state.graphPoint?screen(...state.graphPoint):null;
  const selectedRef=state.currentRef&&sources.find(s=>s.id===state.currentRef&&s.source_page===state.page&&!sourceLinks[s.id]);
  let evidence='';
  if(selectedRef) {
    const [x,y]=screen(selectedRef.bbox[0],selectedRef.bbox[3]),[x2,y2]=screen(selectedRef.bbox[2],selectedRef.bbox[1]);
    evidence='<rect id="condition-evidence" class="highlight-focused" x="'+x+'" y="'+y+'" width="'+(x2-x)+'" height="'+Math.max(3,y2-y)+'"/>';
  }
  holder.innerHTML='<div class="pdf-page" style="width:'+v.width+'px;height:'+v.height+'px"><div style="position:absolute;width:'+w+'px;height:'+h+'px;transform-origin:0 0;transform:matrix('+v.matrix.join(',')+')">'+
    '<img src="/api/pdf/'+pdf.id+'/page/'+state.page+'?w='+Math.max(650,Math.min(2400,Math.ceil(w/300)*300))+'" alt="PDF, страница '+state.page+'" style="width:'+w+'px;height:'+h+'px">'+
    '<svg viewBox="0 0 '+w+' '+h+'">'+rectangles+evidence+(marker?'<circle id="graph-marker" cx="'+marker[0]+'" cy="'+marker[1]+'" r="6" fill="#d745aa" stroke="white" stroke-width="2"/>':'')+'</svg></div></div>';
  $('#pdf-pagination').textContent=state.page+' / '+pdf.pages.length;
  $('#pdf-zoom').textContent=Math.round(state.zoom*100)+'%';
  $('#pdf-angle').textContent=angle+'°';
  $$('[data-role-filter]').forEach(input=>{input.checked=state.roles.has(input.dataset.roleFilter);});
  $('#pdf-prev').disabled=state.page===1; $('#pdf-next').disabled=state.page===pdf.pages.length;
  holder.scrollTo(...previous);
  for(const node of $$('[data-ref]',holder)) {
    const action=()=>{
      const ref=node.dataset.ref, linked=sourceLinks[ref];
      state.currentRef=ref;
      selectResult(linked.includes(state.current)?state.current:linked[0],false);
      if(phone.matches)$('#active-record').scrollIntoView({block:'nearest'});
    };
    node.onclick=action;
    node.onkeydown=ev=>{if(ev.key==='Enter'||ev.key===' ') {ev.preventDefault();action();}};
  }
  if(scroll||marker) requestAnimationFrame(()=>{
    const highlighted=(state.currentRef&&$('[data-ref="'+state.currentRef+'"]',holder))||$('#condition-evidence',holder)||$('.highlight-current',holder)||$('#graph-marker',holder);
    if(highlighted) {
      const target=highlighted.getBoundingClientRect(), area=holder.getBoundingClientRect();
      holder.scrollBy(target.x-area.x-area.width/2+target.width/2,target.y-area.y-area.height/2+target.height/2);
    }
  });
}
function showPdfOnPhone() {
  if(phone.matches)$('#pdf-scroll')?.scrollIntoView({block:'nearest'});
}
function renderRecords() {
  const {results,sources,links,measurements,materials}=state.detail;
  const list=$('#record-list'), detail=$('#active-record');
  if(!list) return;
  const top=list.scrollTop;
  list.innerHTML=results.map(r=>{
    const label=metricLabel(r.metric_name);
    return '<div class="record '+(r.id===state.current?'active':'')+'" data-result="'+r.id+'" tabindex="0" role="button" aria-label="'+e([label,r.device_label,fmt(r.metric_value)].filter(Boolean).join(' · '))+'"><span><b>'+e(label)+'</b><small>'+e([r.device_label,scanLabels[r.scan_direction]||r.scan_direction,origins[r.result_origin]].filter(Boolean).join(' · '))+'</small></span><span>'+measurementValue(r)+' '+(r.extraction_status.startsWith('Требует')?badge('Проверить','warn'):'')+'</span></div>';
  }).join('')||empty('На этой публикации пока нет записей.');
  list.scrollTop=top;
  $$('.record',list).forEach(node=>{
    node.onclick=()=>selectResult(node.dataset.result);
    node.onkeydown=ev=>{if(ev.key==='Enter'||ev.key===' ') {ev.preventDefault();node.click();}};
  });
  const r=results.find(row=>row.id===state.current);
  if(!r) {detail.innerHTML='';return;}
  const refs=links.filter(l=>l.result_id===r.id).map(l=>sources.find(s=>s.id===l.source_reference_id)).filter(s=>s&&visibleSource(s,sources,links));
  const m=measurements.find(row=>row.id===r.measurement_id);
  const material=materials.find(row=>row.id===r.material_id);
  const context=[
    ['Образец',r.device_label],['Материал',material?.formula_normalized||material?.material_class],
    ['Измерение',m?.measurement_type],['Направление',scanLabels[m?.scan_direction]||m?.scan_direction],
    ['Спектр',m?.spectrum],['Освещённость',m?.light_intensity!=null?fmt(m.light_intensity)+' '+(m.light_intensity_unit||''):null],
    ['Скорость развертки',m?.scan_rate],['Температура',m?.temperature],['Протокол',m?.stability_protocol],
    ['Условия испытания',m?.stress_conditions],['Агрегация',r.aggregation==='unknown'?null:aggregationLabels[r.aggregation]||r.aggregation],
    ['Число приборов',r.n_devices],['Разброс',r.spread_value]
  ].filter(([,value])=>value!=null&&value!=='');
  detail.innerHTML='<div class="details"><h3>'+e(metricLabel(r.metric_name))+' · '+measurementValue(r)+'</h3>'+
    (r.plot_id?'<p><a class="link" href="#graphs/'+r.pdf_version_id+'/'+r.plot_id+'">Приближённое значение по графику</a></p>':
      '<p>В статье <b>'+e(r.raw_value)+' '+e(r.raw_unit)+'</b> · '+e(r.value_state)+'</p>')+'<p>'+resultBadge(r)+'</p>'+
    (context.length?'<dl class="result-context">'+context.map(([label,value])=>'<dt>'+e(label)+'</dt><dd>'+e(value)+'</dd>').join('')+'</dl>':'')+
    (r.extraction_method==='local_ai_pdf_quote'?'<p>Найдено локальным ИИ. Проверьте связь показателя с источником.</p>':'')+
    (r.formula?'<p>Расчёт · '+e(r.formula)+'</p>':'')+
    (r.calculation_inputs?.uncertainty!=null?'<p>Погрешность оцифровки · ±'+fmt(r.calculation_inputs.uncertainty)+' '+e(r.normalized_unit)+'</p>':'')+
    (r.calculation_inputs?.uncertainty_method?'<p>'+e(r.calculation_inputs.uncertainty_method)+'</p>':'')+
    (r.calculation_inputs?.reference?'<p>'+e(r.calculation_inputs.reference)+' · '+(r.calculation_inputs.coverage_confirmed?'диапазон подтверждён':'интеграл в пределах кривой, полнота диапазона не подтверждена')+'</p>':'')+
    (r.calculation_inputs?.error?'<p>'+e(r.calculation_inputs.error)+'</p>':'')+
    '<p>'+refs.map(s=>'<button class="icon-btn" data-focus-ref="'+s.id+'" title="'+e(s.source_fragment)+'">с. '+s.source_page+' · '+e(roles[s.fragment_role])+' · '+e(s.source_fragment?.slice(0,46)||'')+'</button>').join(' ')+'</p>'+
    '<p><button class="primary" id="record-edit">'+i('pencil')+' Проверить и исправить</button></p></div>';
  $('#record-edit').onclick=()=>editResult(r);
  $$('[data-focus-ref]').forEach(node=>node.onclick=()=>{
    const ref=sources.find(s=>s.id===node.dataset.focusRef);
    state.page=ref.source_page;state.currentRef=ref.id;state.roles.add(ref.fragment_role);renderPdf(true);showPdfOnPhone();
  });
}
function selectResult(id, jump=true) {
  if(!state.detail.results.some(r=>r.id===id))return;
  state.current=id;state.graphPoint=null;
  if(jump) {
    const {sources,links}=state.detail;
    const ids=new Set(links.filter(l=>l.result_id===id).map(l=>l.source_reference_id));
    state.currentRef=null;
    const refs=sources.filter(s=>ids.has(s.id)&&visibleSource(s,sources,links));
    const ref=refs.find(s=>s.fragment_role==='value')||refs.find(s=>s.source_type==='figure')||refs[0];
    if(ref){state.page=ref.source_page;state.currentRef=ref.id;state.roles.add(ref.fragment_role);}
  }
  renderRecords();renderPdf(jump);
  if(jump)showPdfOnPhone();
  const row=$('[data-result="'+id+'"]'), list=$('#record-list');
  if(row && list){const a=row.getBoundingClientRect(),b=list.getBoundingClientRect();if(a.top<b.top||a.bottom>b.bottom) list.scrollTop+=a.top-b.top-b.height/3;}
}
function editResult(r) {
  const {devices,measurements}=state.detail;
  const deviceOptions=Object.fromEntries(devices.map(d=>[d.id,d.device_label+(r.candidate_device_ids.includes(d.id)?' · кандидат':'')]));
  const measurementsFor=id=>Object.fromEntries(measurements.filter(m=>m.device_id===id).map(m=>[m.id,(m.measurement_type||'Измерение')+' · '+(m.scan_direction||'ход не указан')+(r.candidate_measurement_ids.includes(m.id)?' · кандидат':'')]));
  showForm('Верификация · '+e(metricLabel(r.metric_name)),'<p>В публикации: <b>'+e(r.raw_value)+' '+e(r.raw_unit)+'</b></p><div class="form-grid">'+
    '<label>Значение<input class="field" name="metric_value" type="number" step="any" value="'+e(r.metric_value)+'"></label>'+
    '<label>Единица<input class="field" name="metric_unit" value="'+e(r.metric_unit)+'"></label>'+
    '<label>Прибор'+sel('device_id','Прибор',{'':'Не указан',...deviceOptions},r.device_id)+'</label>'+
    '<label>Измерение'+sel('measurement_id','Измерение',{'':'Не указано',...measurementsFor(r.device_id)},r.measurement_id)+'</label>'+
    '<label>Происхождение'+sel('result_origin','Происхождение',origins,r.result_origin)+'</label>'+
    '<label>Агрегация'+sel('aggregation','Агрегация',aggregationLabels,r.aggregation)+'</label><label class="wide" id="cited-doi">DOI цитируемой публикации<input class="field" name="cited_doi" value="'+e(r.cited_doi)+'"></label></div>',
    async form=>{
      const body=Object.fromEntries(form);
      for(const key of ['metric_unit','device_id','measurement_id','metric_value']) if(body[key]==='') body[key]=null;
      if(body.metric_value!==null)body.metric_value=Number(body.metric_value);
      await api('/api/result/'+r.id,json(body));
      await fetchLibrary();await routeView(true);
    });
  const switchOrigin=()=>$('#cited-doi',dialog).hidden=$('[name=result_origin]',dialog).value!=='cited';
  $('[name=result_origin]',dialog).onchange=switchOrigin;switchOrigin();
  $('[name=device_id]',dialog).onchange=ev=>$('[name=measurement_id]',dialog).innerHTML=options({'':'Не указано',...measurementsFor(ev.target.value)});
}
function openUpload() {$('#upload-dialog').showModal();}
$('#upload-open').onclick=openUpload;
$('#files').onchange=ev=>$('#file-count').textContent='Выбрано файлов: '+ev.target.files.length;
const drop=$('#drop-zone');
drop.ondragover=ev=>{ev.preventDefault();drop.classList.add('drag');};
drop.ondragleave=()=>drop.classList.remove('drag');
drop.ondrop=ev=>{ev.preventDefault();drop.classList.remove('drag');$('#files').files=ev.dataTransfer.files;$('#files').dispatchEvent(new Event('change'));};
$('#upload-form').onsubmit=async ev=>{
  ev.preventDefault();
  const button=$('button[type=submit]',ev.currentTarget),data=new FormData();
  for(const file of $('#files').files)data.append('files',file);
  button.disabled=true;
  try {
    const entries=await api('/api/upload',{method:'POST',body:data});
    $('#upload-dialog').close();$('#upload-form').reset();$('#file-count').textContent='Можно загрузить несколько файлов';
    await fetchLibrary(); location.hash='library'; library();schedule();
    toast('Файлов в пакете: '+entries.length);
  } catch(ex){toast(ex.message);}
  finally{button.disabled=false;}
};
document.addEventListener('click',async ev=>{
  const close=ev.target.closest('[data-close]');if(close){$('#'+close.dataset.close).close();return;}
  const retry=ev.target.closest('[data-retry]');if(!retry)return;
  retry.disabled=true;
  try {
    await api('/api/pdf/'+retry.dataset.retry+'/retry',{method:'POST'});await fetchLibrary();await routeView(true);schedule();toast('Обработка поставлена в очередь');
  } catch(ex){toast(ex.message);retry.disabled=false;}
});
const graphTypes = {JV:'Вольт-амперная характеристика',EQE:'Квантовая эффективность',
  PCE_vs_param:'КПД от параметра', thermal:'Термообработка', stability:'Стабильность', scatter:'Точечная диаграмма'};
const digitizationLabels = {raster_figure:'Изображение из PDF',vector_pdf:'Векторная серия',manual_pending:'Ожидает оцифровки',
  manual_calibration:'Ручная калибровка',manual_points:'Ручная оцифровка'};
function plotResults(detail,plot) {
  if(!plot)return '';
  const results=detail.results.filter(r=>r.plot_id===plot.id&&r.normalized_value!=null);
  if(!results.length)return ['JV','EQE','stability'].includes(plot.plot_type)
    ?'<p class="warning">Показатели пока не рассчитаны. Проверьте калибровку, единицы осей и нужный участок кривой.</p>':'';
  const entries=results.map(r=>'<a class="button" href="#xray/'+r.pdf_version_id+'/'+r.id+'">'+
    e(metricLabel(r.metric_name))+' · ≈ '+measurementValue(r)+'</a>').join('');
  return '<section class="card toolbar graph-results"><strong>Показатели по графику</strong>'+entries+'</section>';
}
function graphDefaults(detail) {
  return {source_page:1,plot_type:'JV',plot_bbox:null,axes:{x:{scale:'linear'},y:{scale:'linear'}},points:[],
          series_label:'Новая серия', pdf_version_id:detail.pdf.id};
}
function graphView(requested) {
  const detail=state.graphDetail, pdf=detail.pdf;
  const selected=detail.plots.find(p=>p.id===requested) || (!requested && detail.plots[0]);
  const sourceFigure=selected&&detail.sources.find(s=>s.source_type==='figure'&&s.source_page===selected.source_page&&String(s.bbox)===String(selected.plot_bbox));
  const pdfLink='#xray/'+pdf.id+(sourceFigure?'/ref,'+sourceFigure.id:'');
  const draft=selected?structuredClone(selected):graphDefaults(detail);
  if(!selected && requested==='new' && state.newGraphFrom) {
    const from=detail.plots.find(p=>p.id===state.newGraphFrom);
    if(from) Object.assign(draft,{source_page:from.source_page,plot_type:from.plot_type,plot_bbox:from.plot_bbox,
                                  axes:structuredClone(from.axes),source_figure:from.source_figure,panel_id:from.panel_id});
    state.newGraphFrom=null;
  }
  let tool='add', mark=null, firstCorner=null, selectedPoint=null, dragging=null;
  main.innerHTML='<p><a class="link" href="#graphs">Публикации с графиками</a></p>'+
    pageIntro('Graph Hunter',e(detail.publication.title),'<a class="button" href="'+e(pdfLink)+'">'+i('scan')+(sourceFigure?' Рисунок в PDF':' PDF X-Ray')+'</a>')+
    '<div class="card toolbar graph-nav">'+sel('graph-series','Серия графика',{'new':'Новая серия',...Object.fromEntries(detail.plots.map(p=>[p.id,graphTypes[p.plot_type]+' · рис. '+(p.source_figure||'—')+(p.panel_id?'('+p.panel_id+')':'')+' · с. '+p.source_page+' · '+p.series_label]))},selected?.id || 'new')+
    '<button id="new-plot">'+i('plus')+' Новая серия</button>'+badge(selected?.digitization_method==='raster_figure'?'Ожидает оцифровки':'Приближённые данные','warn')+
    (selected?'<span class="muted-text push">'+e(digitizationLabels[selected.digitization_method]||selected.digitization_method)+'</span>':'')+'</div>'+
    (selected?.digitization_method==='raster_figure'?
      '<p class="warning">Найден исходный рисунок. Если в нём несколько графиков, выделите нужный через «Задать область», затем укажите шкалы и добавьте точки.</p>':plotResults(detail,selected))+
    '<div class="graph-grid"><section class="card graph-card"><div class="graph-head"><h2>Оригинальный график</h2>'+
    '<span class="subtle" id="graph-source-page"></span></div><div class="toolbar">'+
    '<button id="region-tool">'+i('scan')+' Задать область</button><button id="add-tool">'+i('plus')+' Добавить точки</button>'+
    '<button id="move-tool">'+i('pencil')+' Перетащить</button><button id="remove-tool">'+i('x')+' Удалить точки</button>'+
    '</div><div id="graph-instructions" class="graph-hint"></div><div class="graph-preview" id="source-plot"></div>'+
    '<div class="graph-caption">'+e(draft.caption_text||'')+(draft.legend_text?'<p>Легенда · '+e(draft.legend_text)+'</p>':'')+'</div></section>'+
    '<section class="card graph-card"><div class="graph-head"><h2>Реконструкция</h2><span id="point-count" class="badge violet"></span></div>'+
    '<div class="graph-preview" id="physical-plot"></div><div id="point-detail" class="graph-hint"></div>'+
    '<div class="graph-caption"><strong>Погрешность</strong><p>'+e(draft.uncertainty_method||'Оценка ожидает калибровки.')+'</p>'+
    (draft.uncertainty?'<p class="values">±'+fmt(draft.uncertainty.x)+' '+e(draft.axes.x.unit)+' · ±'+fmt(draft.uncertainty.y)+' '+e(draft.axes.y.unit)+'</p>':'')+'</div></section></div>'+
    '<section class="card calibration"><div class="graph-head"><div><h2>Калибровка и привязка</h2><p>Изменение шкалы пересчитывает физические координаты из исходных точек PDF.</p></div>'+
    '<div class="row-actions">'+(selected?'<a class="button" href="/api/plot/'+draft.id+'/export/csv" download>'+i('download')+' CSV</a><a class="button" href="/api/plot/'+draft.id+'/export/xlsx" download>'+i('download')+' XLSX</a>':'')+
    (selected&&['JV','EQE','stability'].includes(draft.plot_type)?'<button id="plot-calculate">'+({JV:'Извлечь показатели из ВАХ',EQE:'Рассчитать плотность тока по спектру',stability:'Рассчитать время до 80% эффективности'}[draft.plot_type])+'</button>':'')+
    '<button class="primary" id="plot-save">'+i('check')+' Сохранить серию</button></div></div>'+
    '<div id="calibration-fields"></div></section>';
  const source=$('#source-plot'), reconstruction=$('#physical-plot');
  const controlMap=Object.fromEntries(detail.devices.map(d=>[d.id,d.device_label]));
  const measurementOptions=id=>Object.fromEntries(detail.measurements.filter(m=>m.device_id===id).map(m=>[m.id,[m.measurement_type,m.scan_direction].filter(Boolean).join(' · ')]));
  const orientation=lbl=>lbl==='x'?'Ось X':'Ось Y';
  function fields() {
    $('#calibration-fields').innerHTML='<div class="cal-meta"><label>Страница'+sel('source_page','Страница графика',Object.fromEntries(pdf.pages.map(p=>[String(p.page),'Страница '+p.page])),String(draft.source_page))+'</label>'+
      '<label>Тип графика'+sel('plot_type','Тип графика',graphTypes,draft.plot_type)+'</label>'+
      '<label>Серия<input class="field" name="series_label" value="'+e(draft.series_label)+'"></label>'+
      '<label>Рисунок<input class="field" name="source_figure" value="'+e(draft.source_figure)+'"></label>'+
      '<label>Панель<input class="field" name="panel_id" value="'+e(draft.panel_id)+'"></label>'+
      '<label>Легенда<input class="field" name="legend_text" value="'+e(draft.legend_text)+'"></label>'+
      '<label>Прибор'+sel('device_id','Прибор серии',{'':'Не указан',...controlMap},draft.device_id)+'</label>'+
      '<label>Измерение'+sel('measurement_id','Измерение серии',{'':'Не указано',...measurementOptions(draft.device_id)},draft.measurement_id)+'</label></div>'+
      ['x','y'].map(axis=>{
        const data=draft.axes[axis], u=axis.toUpperCase();
        return '<div class="axis-fields"><h3>'+orientation(axis)+'</h3>'+sel('scale-'+axis,'Шкала '+u,{linear:'Линейная',log:'Логарифмическая'},data.scale)+
        '<label>Название<input class="field" name="label-'+axis+'" value="'+e(data.label)+'"></label>'+
        '<label>Единица<input class="field" name="unit-'+axis+'" value="'+e(data.unit)+'"></label>'+
        ['0','1'].map((index)=>'<label>PDF '+(Number(index)+1)+'<div class="input-group"><input class="field" aria-label="Координата '+u+(+index+1)+'" name="p'+index+'-'+axis+'" type="number" step="any" value="'+e(data['p'+index])+'">'+
          btn('scan','Выбрать отметку '+u+(+index+1),'data-mark="'+axis+',p'+index+'"')+'</div></label>'+
          '<label>Значение '+(Number(index)+1)+'<input class="field" aria-label="Значение '+u+(+index+1)+'" name="v'+index+'-'+axis+'" type="number" step="any" value="'+e(data['v'+index])+'"></label>').join('')+'</div>';
      }).join('');
    $$('#calibration-fields input,#calibration-fields select').forEach(field=>field.oninput=ev=>{
      const {name,value}=ev.target;
      if(name.includes('-')){
        const [prop,axis]=name.split('-'); draft.axes[axis][prop]=ev.target.type==='number'?(value===''?null:Number(value)):value;
      } else if(name==='source_page') {
        Object.assign(draft,{source_page:Number(value),plot_bbox:null,points:[]}); selectedPoint=null;firstCorner=null;
        if(tool!=='region')setTool('region');
        renderSource();
      } else {
        draft[name]=value;
        if(name==='device_id'){
          draft.measurement_id=null;
          $('[name=measurement_id]').innerHTML=options({'':'Не указано',...measurementOptions(value)});
        }
      }
      renderPhysical();
    });
    $$('[data-mark]').forEach(b=>b.onclick=()=>{
      if(!draft.plot_bbox){toast('Сначала задайте область построения');return;}
      mark=b.dataset.mark.split(',');setTool('mark');
    });
  }
  function setTool(next) {
    tool=next;if(tool!=='region')firstCorner=null;
    const hint={add:'Клик по оригиналу добавляет точку в серию.',move:'Потяните точку, чтобы изменить её координаты.',remove:'Клик по точке удаляет её.',
      region:'Отметьте два противоположных угла области построения на странице.',mark:'Клик по изображению задаёт координату отметки шкалы.'};
    $('#graph-instructions').textContent=hint[tool];
    ['region','add','move','remove'].forEach(name=>$('#'+name+'-tool').classList.toggle('active-control',name===tool));
    renderSource();
  }
  function project(axis,p) {
    const {p0,p1,v0,v1,scale}=axis;
    if([p0,p1,v0,v1].some(v=>v==null)||p0===p1||v0===v1||(scale==='log'&&(v0<=0||v1<=0)))return null;
    const t=(p-p0)/(p1-p0);
    const value=scale==='log'?Math.exp(Math.log(v0)+t*(Math.log(v1)-Math.log(v0))):v0+t*(v1-v0);
    return Number.isFinite(value)?value:null;
  }
  function renderSource() {
    const meta=pdf.pages[draft.source_page-1], full=meta.crop_box;
    const box=tool==='region'||!draft.plot_bbox?full:draft.plot_bbox;
    const w=box[2]-box[0],h=box[3]-box[1];
    const pointDots=draft.points.map((p,n)=>'<circle data-graph-point="'+n+'" cx="'+(p.px-box[0])+'" cy="'+(box[3]-p.py)+'" r="'+Math.max(2,w/130)+'" class="'+(selectedPoint===n?'dot-selected':'')+'"/>').join('');
    const existing=tool==='region'&&draft.plot_bbox?'<rect x="'+(draft.plot_bbox[0]-box[0])+'" y="'+(box[3]-draft.plot_bbox[3])+'" width="'+(draft.plot_bbox[2]-draft.plot_bbox[0])+'" height="'+(draft.plot_bbox[3]-draft.plot_bbox[1])+'" class="plot-region"/>':'';
    const marker=firstCorner?'<circle cx="'+(firstCorner[0]-box[0])+'" cy="'+(box[3]-firstCorner[1])+'" r="3"/>':'';
    const oldCrop=selected&&selected.source_page===draft.source_page&&String(selected.plot_bbox)===String(box)&&selected.crop_image;
    const renderedPage='/api/pdf/'+pdf.id+'/page/'+draft.source_page+'?w=1500';
    const image=oldCrop?'<img src="/api/plot/'+selected.id+'/image" alt="Вырезка исходного графика">':
      '<img src="'+renderedPage+'" alt="Страница оригинала" style="width:'+((full[2]-full[0])/w*100)+'%;height:'+((full[3]-full[1])/h*100)+'%;left:'+((full[0]-box[0])/w*100)+'%;top:'+((box[3]-full[3])/h*100)+'%">';
    source.innerHTML='<div class="graph-image" style="aspect-ratio:'+w+'/'+h+'">'+image+
      '<svg id="source-overlay" data-graph-tool="'+tool+'" viewBox="0 0 '+w+' '+h+'" aria-label="Координаты оригинального графика">'+existing+pointDots+marker+'</svg></div>';
    $('#graph-source-page').textContent='Страница '+draft.source_page+(draft.source_figure?' · рис. '+draft.source_figure:'');
    const overlay=$('#source-overlay');
    const coords=ev=>{
      const b=overlay.getBoundingClientRect();
      return [box[0]+Math.max(0,Math.min(1,(ev.clientX-b.x)/b.width))*w,box[3]-Math.max(0,Math.min(1,(ev.clientY-b.y)/b.height))*h];
    };
    function applyTool(ev) {
      const [x,y]=coords(ev), index=ev.target.dataset.graphPoint;
      if(tool==='region') {
        if(!firstCorner){firstCorner=[x,y];renderSource();return;}
        const region=[Math.min(x,firstCorner[0]),Math.min(y,firstCorner[1]),Math.max(x,firstCorner[0]),Math.max(y,firstCorner[1])];
        if(region[2]-region[0]<3||region[3]-region[1]<3){toast('Выберите два разных угла');return;}
        draft.plot_bbox=region;
        draft.points=draft.points.filter(p=>p.px>=region[0]&&p.px<=region[2]&&p.py>=region[1]&&p.py<=region[3]);
        draft.axes.x.p0=region[0];draft.axes.x.p1=region[2];draft.axes.y.p0=region[1];draft.axes.y.p1=region[3];
        fields();setTool('add');
      } else if(tool==='mark'&&mark) {
        draft.axes[mark[0]][mark[1]]=+(mark[0]==='x'?x:y).toFixed(4);
        mark=null;fields();setTool('add');
      } else if(tool==='add') {
        if(!draft.plot_bbox){setTool('region');return;}
        if(index==null) draft.points.push({px:x,py:y});
        selectedPoint=index==null?draft.points.length-1:Number(index);
        renderSource();
      } else if(index!=null&&tool==='remove') {
        draft.points.splice(+index,1);selectedPoint=null;renderSource();
      } else if(index!=null&&tool==='move') {
        dragging=+index;selectedPoint=dragging;overlay.setPointerCapture(ev.pointerId);
      }
      renderPhysical();
    }
    let tap=null;
    overlay.onpointerdown=ev=>{
      if(ev.pointerType==='touch'&&tool!=='move') {
        if(ev.isPrimary)tap={id:ev.pointerId,x:ev.clientX,y:ev.clientY};
        return;
      }
      applyTool(ev);
    };
    overlay.onpointermove=ev=>{
      if(dragging==null)return;
      const [x,y]=coords(ev);
      draft.points[dragging]={px:x,py:y};
      const dot=$('[data-graph-point="'+dragging+'"]',overlay);
      dot.setAttribute('cx',x-box[0]);dot.setAttribute('cy',box[3]-y);renderPhysical();
    };
    function finishDrag() {
      if(dragging!=null){dragging=null;renderSource();renderPhysical();}
    }
    overlay.onpointerup=ev=>{
      if(tap?.id===ev.pointerId&&Math.hypot(ev.clientX-tap.x,ev.clientY-tap.y)<9)applyTool(ev);
      tap=null;
      finishDrag();
    };
    overlay.onpointercancel=()=>{tap=null;finishDrag();};
  }
  function renderPhysical() {
    const points=draft.points.map((p,n)=>({...p,x:project(draft.axes.x,p.px),y:project(draft.axes.y,p.py),n})).filter(p=>p.x!==null&&p.y!==null);
    $('#point-count').textContent=draft.points.length+' точек';
    const point=draft.points[selectedPoint];
    $('#point-detail').innerHTML=point?'<span>PDF ('+fmt(point.px)+', '+fmt(point.py)+')</span> <a class="link" id="point-to-pdf" href="#xray/'+pdf.id+'/point,'+draft.source_page+','+point.px+','+point.py+'">К точке на PDF</a>':'Выберите точку, чтобы открыть её на PDF.';
    if(!points.length){reconstruction.innerHTML=empty('Укажите две отметки для каждой оси и добавьте точки.');return;}
    const {x:ax,y:ay}=draft.axes;
    const xlo=Math.min(ax.v0,ax.v1,...points.map(p=>p.x)),xhi=Math.max(ax.v0,ax.v1,...points.map(p=>p.x));
    const ylo=Math.min(ay.v0,ay.v1,...points.map(p=>p.y)),yhi=Math.max(ay.v0,ay.v1,...points.map(p=>p.y));
    const txScale=ax.scale==='log'?Math.log:Number,tyScale=ay.scale==='log'?Math.log:Number;
    const x=p=>51+416*(txScale(p)-txScale(xlo))/(txScale(xhi)-txScale(xlo));
    const y=p=>232-203*(tyScale(p)-tyScale(ylo))/(tyScale(yhi)-tyScale(ylo));
    const tick=(lo,hi,t,log)=>log?lo*(hi/lo)**t:lo+(hi-lo)*t;
    let chart='<svg class="physical-svg" viewBox="0 0 510 272" aria-label="График оцифрованных данных">';
    for(let index=0;index<=4;index++) {
      const tx=tick(xlo,xhi,index/4,ax.scale==='log'),ty=tick(ylo,yhi,index/4,ay.scale==='log');
      chart+='<path class="gridlines" d="M'+x(tx)+' 29V232 M51 '+y(ty)+'H467"/><text x="'+x(tx)+'" y="247" text-anchor="middle">'+e(Number(tx.toPrecision(4)))+'</text><text x="46" y="'+(y(ty)+4)+'" text-anchor="end">'+e(Number(ty.toPrecision(4)))+'</text>';
    }
    const coordinates=points.slice().sort((a,b)=>a.px-b.px).map(p=>x(p.x)+','+y(p.y));
    reconstruction.innerHTML=chart+'<path class="chart-axes" d="M51 29V232H467"/><text x="54" y="18">'+e([ay.label,ay.unit].filter(Boolean).join(', ')||'Y')+'</text><text x="469" y="264" text-anchor="end">'+e([ax.label,ax.unit].filter(Boolean).join(', ')||'X')+'</text>'+
      (draft.plot_type==='scatter'?'':'<polyline points="'+coordinates.join(' ')+'"/>')+
      points.map(p=>'<circle tabindex="0" role="button" aria-label="Точка '+(p.n+1)+'" data-reconstruction="'+p.n+'" class="'+(selectedPoint===p.n?'dot-selected':'')+'" cx="'+x(p.x)+'" cy="'+y(p.y)+'" r="4"><title>'+e(fmt(p.x)+' '+(ax.unit||'')+' / '+fmt(p.y)+' '+(ay.unit||''))+'</title></circle>').join('')+'</svg>';
    $$('[data-reconstruction]',reconstruction).forEach(el=>{
      el.onclick=()=>{selectedPoint=+el.dataset.reconstruction;renderSource();renderPhysical();};
      el.onkeydown=ev=>{if(ev.key==='Enter')el.click();};
    });
  }
  $('[name=graph-series]').onchange=ev=>location.hash='graphs/'+pdf.id+'/'+ev.target.value;
  $('#new-plot').onclick=()=>{state.newGraphFrom=selected?.id;if(requested==='new')graphView('new'); else location.hash='graphs/'+pdf.id+'/new';};
  for(const name of ['region','add','move','remove']) $('#'+name+'-tool').onclick=()=>setTool(name);
  const calculate=$('#plot-calculate');
  if(calculate)calculate.onclick=()=>{
    const kind=draft.plot_type, defaultMetric=kind==='EQE'?'Jsc_EQE':kind==='stability'?'T80':'Voc';
    const description={EQE:'Использовать сохранённую кривую и локальный спектр ASTM G173-03 AM1.5G. Интеграл ограничен диапазоном оцифрованных длин волн.',
      stability:'Использовать сохранённую кривую. Подтвердите, что по оси Y указана доля от начального КПД.',
      JV:'Восстановить значение по пересечению нулевой отметки на сохранённой ВАХ.'}[kind];
    showForm(kind==='JV'?'Показатель из ВАХ':metricLabel(defaultMetric),'<p>'+description+'</p>'+
      (kind==='EQE'?'<p><label><input name="coverage" type="checkbox"> Подтверждаю полное покрытие значимого отклика для сравнения с Jsc по ВАХ</label></p>':'')+
      '<div class="form-grid">'+(kind==='JV'?'<label>Показатель'+sel('metric','Показатель графика',Object.fromEntries(['Voc','Jsc','FF','PCE'].map(code=>[code,metricLabel(code)])))+'</label>':'')+
      '<label>Агрегация'+sel('aggregation','Агрегация графика',aggregationLabels)+'</label></div>',async form=>{
      const metric=form.get('metric')||defaultMetric;
      const result=await api('/api/plot/'+draft.id+'/calculate',json({metric,aggregation:form.get('aggregation'),coverage_confirmed:form.has('coverage')},'POST'));
      await fetchLibrary();location.hash='xray/'+pdf.id+'/'+result.id;
    });
  };
  $('#plot-save').onclick=async ev=>{
    const button=ev.currentTarget;button.disabled=true;
    try {
      const saved=await api(selected?'/api/plot/'+draft.id:'/api/pdf/'+pdf.id+'/plot',json(draft,selected?'PATCH':'POST'));
      toast('Серия сохранена');
      if(selected)await routeView(true);
      else {await fetchLibrary();location.hash='graphs/'+pdf.id+'/'+saved.id;}
    } catch(ex){toast(ex.message);}
    finally{button.disabled=false;}
  };
  fields();setTool(draft.plot_bbox?'add':'region');renderPhysical();
}
const issueStatus = {open:['Замечание','warn'],resolved:['Устранено','good'],passed:['Согласовано','good'],
  not_applicable:['Проверка невозможна',''],superseded:['Заменено','']};
async function detectiveView(token) {
  const issues=await api('/api/issues');
  if(token!==state.routeToken)return;
  const rules=Object.fromEntries(issues.map(issue=>[issue.rule_code,issue.rule_name]));
  const pubs=Object.fromEntries(issues.map(issue=>[issue.publication_id,issue.publication_title]));
  main.innerHTML=pageIntro('Science Detective','Проверки физической согласованности с допусками и фрагментами PDF.',
    '<a class="button" href="/api/export/validation_report.json" download>'+i('download')+' Отчёт JSON</a>')+
    '<div class="stats detective-stats">'+stat('alert',issues.filter(v=>v.severity==='error'&&v.resolution_status==='open').length,'Ошибки','amber')+
    stat('shield',issues.filter(v=>v.severity==='warning'&&v.resolution_status==='open').length,'Предупреждения','amber')+
    stat('check',issues.filter(v=>['resolved','passed'].includes(v.resolution_status)).length,'Согласовано','mint')+
    stat('file',issues.filter(v=>v.resolution_status==='not_applicable').length,'Проверка невозможна','blue')+'</div>'+
    '<section class="card"><div class="toolbar" id="issue-filters">'+
    sel('issue-status','Состояние проверки',{'':'Все проверки',...Object.fromEntries(Object.entries(issueStatus).map(([k,v])=>[k,v[0]]))},state.issueFilter?.status??'open')+
    sel('issue-rule','Правило',{'':'Все правила',...rules},state.issueFilter?.rule||'')+
    sel('issue-pub','Публикация',{'':'Все публикации',...pubs},state.issueFilter?.pub||'')+
    '</div><div id="issues"></div></section>';
  const status=$('[name=issue-status]'),rule=$('[name=issue-rule]'),pub=$('[name=issue-pub]');
  const thresholdValue=(k,v)=>k==='relative'?fmt(v*100)+'%':typeof v==='number'?fmt(v):e(v??'—');
  function renderIssues() {
    state.issueFilter={status:status.value,rule:rule.value,pub:pub.value};
    const matched=issues.filter(issue=>(!status.value||issue.resolution_status===status.value)&&(!pub.value||issue.publication_id===pub.value)&&(!rule.value||issue.rule_code===rule.value));
    $('#issues').innerHTML=matched.map(issue=>'<article class="validation-row" data-issue="'+issue.rule_code+'" data-status="'+issue.resolution_status+'"><div class="issue-line"><div>'+
      '<span class="rule-code">'+e(issue.rule_code)+'</span><h2>'+e(issue.rule_name)+'</h2><p>'+e(issue.publication_title)+'</p></div>'+
      '<div class="issue-badges">'+(issue.severity==='error'?badge('Ошибка','bad'):issue.severity==='warning'?badge('Предупреждение','warn'):'')+tag(issueStatus,issue.resolution_status)+'</div></div>'+
      '<p>'+e(issue.description)+'</p><div class="value-tags">'+issue.compared_values.map(v=>'<span><b>'+e(metricLabel(v.name))+'</b> '+(typeof v.value==='number'?fmt(v.value):e(v.value??'—'))+' '+e(v.unit)+'</span>').join('')+'</div>'+
      (issue.threshold?'<div class="rule-threshold">Порог · '+Object.entries(issue.threshold).map(([k,v])=>e(({relative:'Относительный',absolute:'Абсолютный',min:'Минимум',max:'Максимум',denominator:'Делитель',unit:'Единица',max_exclusive:'Строго меньше',min_exclusive:'Строго больше',min_delta:'Мин. разность',max_delta:'Макс. разность',model_temperature_C:'Температура модели, °C'}[k])||k)+' '+thresholdValue(k,v)).join(' · ')+'</div>':'')+
      (issue.hypothesis?'<p class="issue-hypothesis">Гипотеза для проверки · '+e(issue.hypothesis)+'</p>':'')+
      (issue.sources.length?'<details class="issue-sources"><summary>Фрагменты PDF · '+issue.sources.length+'</summary>'+
      issue.sources.map(s=>'<a class="link issue-source" href="'+e(s.href.slice(1))+'">с. '+s.source_page+' · '+e(roles[s.fragment_role]||s.source_type)+' · '+e(s.source_fragment||'Область графика')+'</a>').join('')+'</details>':'')+'</article>').join('')||empty('Проверок по выбранным условиям пока нет.');
  }
  $('#issue-filters').onchange=renderIssues;renderIssues();
}
const comparisonLabels={material_class:'Класс материала',device_type:'Тип прибора',metric_name:'Метрика',normalized_unit:'Единица',
  normalized_value:'Однозначные значения','AM1.5G 100 mW/cm²':'AM1.5G, 100 мВт/см²',active_area:'Активная площадь',area_definition:'Определение площади',
  aggregation:'Агрегация',scan_direction:'Направление развёртки',primary:'Происхождение',corpus:'Статус корпуса',certified:'Сертификация',
  ordinary:'Основные показатели',stability_protocol:'Протокол стабильности',stress_conditions:'Условия старения',T80:'Показатель T80'};
async function compareView(token, mode='ordinary') {
  const {records}=await api('/api/compare?mode='+mode);
  if(token!==state.routeToken)return;
  const tabs={ordinary:'Фотоэлектрические',certified:'Сертифицированные',stability:'Стабильность'};
  const choices=Object.fromEntries(records.map(r=>[r.id,[metricLabel(r.metric_name),fmt(r.normalized_value)+' '+(r.normalized_unit||''),r.device_label,scanLabels[r.scan_direction]||r.scan_direction,r.title].filter(Boolean).join(' · ')]));
  main.innerHTML=pageIntro('Сопоставление','Сравните две записи и проверьте, совпадают ли условия измерения.')+
    '<div class="comparison-tabs">'+Object.entries(tabs).map(([k,v])=>'<a class="button '+(mode===k?'active-control':'')+'" href="#compare/'+k+'">'+e(v)+'</a>').join('')+'</div>'+
    '<section class="card"><div class="toolbar compare-controls"><label>Запись A'+sel('compare-a','Запись A',{'':'Выберите результат',...choices})+'</label>'+
    '<label>Запись B'+sel('compare-b','Запись B',{'':'Выберите результат',...choices})+'</label></div><div id="compare-matrix"></div></section>';
  const left=$('[name=compare-a]'),right=$('[name=compare-b]');
  function display(r,key) {
    if(key==='AM1.5G 100 mW/cm²')return [r.spectrum,r.light_intensity!=null?r.light_intensity+' '+r.light_intensity_unit:null].filter(Boolean).join(' · ');
    if(key==='active_area')return r.active_area==null?'':fmt(r.active_area)+' '+r.area_unit;
    if(key==='normalized_value')return fmt(r.normalized_value)+' '+(r.normalized_unit||'');
    if(key==='corpus')return corpus[r.corpus_status]?.[0];
    if(key==='certified')return r.certified?'Да':'';
    if(key==='primary')return origins[r.result_origin];
    if(key==='T80'||key==='ordinary'||key==='metric_name')return metricLabel(r.metric_name);
    if(key==='scan_direction')return scanLabels[r.scan_direction]||r.scan_direction;
    if(key==='aggregation')return aggregationLabels[r.aggregation]||r.aggregation;
    return r[key];
  }
  async function matrix() {
    const target=$('#compare-matrix'),a=left.value,b=right.value;
    if(!a||!b||a===b) {target.innerHTML=empty(records.length?'Выберите две разные записи.':'В этой вкладке пока нет записей.');return;}
    try {
      const data=await api('/api/compare?mode='+mode+'&a='+a+'&b='+b);
      if(a!==left.value||b!==right.value||!target.isConnected)return;
      const link=r=>'<a class="link" href="#xray/'+r.pdf_version_id+'/'+r.id+'">'+e(r.title)+' · '+e(r.device_label||'—')+'</a>';
      target.innerHTML='<div class="toolbar">'+(data.allowed?badge('Сопоставимы','good'):badge('Несопоставимы','bad'))+
        '<span class="subtle">Допуск площади '+fmt(data.area_tolerance*100)+'%</span></div>'+tableHint+'<div class="table-scroll" tabindex="0" role="region" aria-label="Таблица сравнения"><table><thead><tr><th>Критерий</th><th>'+link(data.a)+'</th><th>'+link(data.b)+'</th><th>Совпадение</th></tr></thead><tbody>'+
        Object.entries(data.criteria).map(([key,ok])=>'<tr class="'+(ok?'':'criteria-failed')+'"><td><b>'+e(comparisonLabels[key]||key)+'</b></td><td>'+e(display(data.a,key)||'—')+'</td><td>'+e(display(data.b,key)||'—')+'</td><td>'+badge(ok?'Да':'Нет',ok?'good':'bad')+'</td></tr>').join('')+'</tbody></table></div>'+
        (data.allowed?'<div class="toolbar"><b>Разность A − B · '+fmt(data.a.normalized_value-data.b.normalized_value)+' '+e(data.a.normalized_unit)+'</b></div>':'');
    } catch(ex){target.innerHTML=empty(ex.message);}
  }
  left.onchange=right.onchange=matrix;matrix();
}
function exportView() {
  main.innerHTML=pageIntro('Экспорт данных','Снимок базы с идентификаторами, связями между сущностями и ссылками на источники.')+
    '<div class="export-grid"><article class="card details"><span class="stat-icon" data-icon="database">'+icon('database')+'</span>'+
    '<h2>Полный набор данных</h2><p>JSON, NDJSON, реляционные CSV и XLSX, исходные PDF и вырезки графиков.</p>'+
    '<a class="button" href="/api/export/dataset.zip" download>'+i('download')+' Скачать набор ZIP</a></article>'+
    '<article class="card details"><span class="stat-icon amber" data-icon="shield">'+icon('shield')+'</span><h2>Отчёт о проверках</h2>'+
    '<p>Правила, результаты, сравниваемые значения, допуски и ссылки на фрагменты PDF.</p>'+
    '<a class="button" href="/api/export/validation_report.json" download>'+i('download')+' Скачать отчёт JSON</a></article></div>';
}


const dataNames={publications:'Публикации',materials:'Материалы',devices:'Приборы',layers:'Слои',measurements:'Измерения',results:'Результаты',issues:'Замечания'};
function dataTabs(active) {return '<div class="comparison-tabs">'+Object.entries(dataNames).map(([k,v])=>'<a class="button '+(active===k?'active-control':'')+'" href="#results/'+k+'">'+v+'</a>').join('')+'</div>';}
function dataTable(records,columns) {
  if(!records.length)return empty('Нет записей.');
  return tableHint+'<div class="table-scroll" tabindex="0" role="region" aria-label="Таблица данных"><table class="data-table"><thead><tr>'+columns.map(c=>'<th scope="col">'+e(fieldLabel(c))+'</th>').join('')+'</tr></thead><tbody>'+
    records.map(r=>'<tr>'+columns.map(c=>{
      const text=tableText(c,r[c]);
      const content=(r.plot_id&&r[c]!=null&&['metric_value','normalized_value'].includes(c)?'≈ ':'')+e(text);
      const link=r.pdf_version_id && ['metric_name','metric_value','publication_code','source_page'].includes(c);
      return '<td class="'+(c==='metric_name'?'metric-cell':'')+'">'+(link?'<a class="link" href="#xray/'+e(r.pdf_version_id)+(r.metric_name?'/'+e(r.id):'')+'">'+content+'</a>':content)+'</td>';
    }).join('')+'</tr>').join('')+'</tbody></table></div>';
}
const tableValueLabels={
  corpus_status:Object.fromEntries(Object.entries(corpus).map(([key,[label]])=>[key,label])),
  extraction_method:{local_ai_pdf_quote:'Локальный ИИ',pdf_text:'Текст PDF',geometry_table:'Таблица PDF',pdf_prose_context:'Текст с учётом контекста',plot_calculation:'Расчёт по графику'},
  result_origin:origins, scan_direction:scanLabels, aggregation:aggregationLabels,
  device_role:{control:'Контрольный',target:'Исследуемый',record:'Рекордный'},
  severity:{error:'Ошибка',warning:'Предупреждение',info:'Информация',not_applicable:'Неприменимо'},
  resolution_status:issueStatus
};
function tableValue(column,value) {
  if(column==='metric_name')return metricLabel(value);
  const labels=tableValueLabels[column];
  if(labels&&Object.hasOwn(labels,value)) {
    const label=labels[value];
    return Array.isArray(label)?label[0]:label;
  }
  if(value!=null&&['certified','mask_used','is_fixture','corpus_manual'].includes(column))return value?'Да':'Нет';
  return value;
}
function tableText(column,raw) {
  const value=tableValue(column,raw);
  if(value==null||value==='')return '—';
  if(Array.isArray(value))return value.length?value.join(', '):'—';
  return typeof value==='object'?JSON.stringify(value):String(value);
}
async function dataView(token,requested) {
  const name=dataNames[requested]?requested:'results';
  await fetchLibrary();
  if(token!==state.routeToken)return;
  if(name==='results')return allResults();
  const data=await api('/api/data/'+name);
  if(token!==state.routeToken)return;
  main.innerHTML=pageIntro('Данные','Извлечённые данные загруженных публикаций')+dataTabs(name)+
    '<section class="card"><div class="toolbar"><label class="search">'+i('search')+'<input id="entity-search" aria-label="Поиск в таблице" placeholder="Поиск по всем полям"></label></div><div id="entity-rows"></div></section>';
  const render=()=>{
    const q=$('#entity-search').value.toLowerCase();
    const records=data.records.filter(r=>Object.entries(r).some(([field,value])=>
      [value,tableValue(field,value)].join(' ').toLowerCase().includes(q)));
    $('#entity-rows').innerHTML=dataTable(records,data.columns)+'<div class="table-foot">'+records.length+' записей</div>';
  };
  $('#entity-search').oninput=render;render();
}
window.addEventListener('hashchange',()=>routeView());
phone.addEventListener('change',()=>{
  if($('#publication-rows'))refreshLibrary();
  const filters=$('.result-filter-panel');
  if(filters){
    filters.open=!phone.matches;
    refreshResults();
  }
});
window.addEventListener('resize',()=>{
  const holder=$('#pdf-scroll');
  if(holder&&holder.clientWidth!==Number(holder.dataset.viewportWidth))renderPdf(Boolean(state.currentRef));
});
try {await fetchLibrary();await routeView();schedule();} catch(ex) {main.innerHTML=empty(ex.message);}
