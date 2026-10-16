(function () {
  'use strict';

  var content = window.SITE_CONTENT || { work: [], testimonials: [], team: [] };

  function h(tag, attrs) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (attrs[k] !== undefined && attrs[k] !== null) el.setAttribute(k, attrs[k]);
    });
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c === null || c === undefined || c === false) continue;
      el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return el;
  }

  /* Mobile menu */
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Close' : 'Menu';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Menu';
        btn.focus();
      }
    });
  }

  /* Past work ledger */
  function cell(label, cls, text) {
    return h('span', { 'class': cls || '' },
      h('span', { 'class': 'cell-label' }, label), text || '—');
  }

  function workEntry(w) {
    var scope = (w.scope || []).join(', ');
    var body = h('div', { 'class': 'entry-body' },
      h('div', null,
        h('p', null, w.summary || ''),
        w.url ? h('p', null, h('a', { 'class': 'link', href: w.url, rel: 'noopener' }, 'Visit the live site')) : null),
      h('dl', { style: 'margin:0' },
        h('dt', null, 'Result against baseline'),
        h('dd', null, w.baseline || w.result || '—')));
    return h('details', { 'class': 'entry', 'data-scope': scope },
      h('summary', null,
        h('span', { 'class': 'client' }, w.client || ''),
        cell('Scope', '', scope),
        cell('Period', '', w.period),
        cell('Spend managed', 'mono', w.spend),
        cell('Result', '', w.result)),
      body);
  }

  function workSlot() {
    return h('div', { 'class': 'slot', role: 'note' },
      h('div', { 'class': 'slot-row', 'aria-hidden': 'true' },
        h('span', null, 'Client'), h('span', null, 'Scope'), h('span', null, 'Period'),
        h('span', null, 'Spend managed'), h('span', null, 'Result'), h('span', null, '')),
      h('span', { 'class': 'slot-title' }, 'Past work goes here'),
      h('p', null, 'Each project shows the client, what you ran for them, the period, the spend you managed and the result against a baseline. Add projects in ',
        h('code', null, 'assets/content.js'), '.'));
  }

  function renderWork(host) {
    var items = content.work || [];
    var limit = parseInt(host.getAttribute('data-limit'), 10) || items.length;
    var filterHost = document.getElementById('work-filters');
    host.textContent = '';
    if (!items.length) {
      host.appendChild(workSlot());
      if (filterHost) filterHost.hidden = true;
      return;
    }
    var head = h('div', { 'class': 'ledger-head', 'aria-hidden': 'true' },
      h('span', null, 'Client'), h('span', null, 'Scope'), h('span', null, 'Period'),
      h('span', null, 'Spend managed'), h('span', null, 'Result'), h('span', null, ''));
    var ledger = h('div', { 'class': 'ledger' }, head);
    items.slice(0, limit).forEach(function (w) { ledger.appendChild(workEntry(w)); });
    host.appendChild(ledger);

    if (filterHost) {
      var scopes = [];
      items.forEach(function (w) { (w.scope || []).forEach(function (s) { if (scopes.indexOf(s) < 0) scopes.push(s); }); });
      if (scopes.length > 1) {
        filterHost.hidden = false;
        filterHost.textContent = '';
        ['All'].concat(scopes).forEach(function (label, i) {
          var b = h('button', { type: 'button', 'aria-pressed': i === 0 ? 'true' : 'false' }, label);
          b.addEventListener('click', function () {
            Array.prototype.forEach.call(filterHost.children, function (c) { c.setAttribute('aria-pressed', 'false'); });
            b.setAttribute('aria-pressed', 'true');
            Array.prototype.forEach.call(ledger.querySelectorAll('.entry'), function (en) {
              var match = label === 'All' || en.getAttribute('data-scope').split(', ').indexOf(label) >= 0;
              en.hidden = !match;
            });
          });
          filterHost.appendChild(b);
        });
      } else {
        filterHost.hidden = true;
      }
    }
  }

  /* Testimonials */
  function renderTestimonials(host) {
    var items = content.testimonials || [];
    host.textContent = '';
    if (!items.length) {
      ['First testimonial', 'Second testimonial'].forEach(function (t) {
        host.appendChild(h('div', { 'class': 'slot', role: 'note' },
          h('span', { 'class': 'slot-title' }, t + ' goes here'),
          h('p', null, 'A client quote with their full name, role and company. Add testimonials in ',
            h('code', null, 'assets/content.js'), '.')));
      });
      return;
    }
    var wrap = h('div', { 'class': 'quotes' });
    items.forEach(function (t) {
      var who = t.url
        ? h('a', { 'class': 'who', href: t.url, rel: 'noopener' }, t.name || '')
        : h('span', { 'class': 'who' }, t.name || '');
      wrap.appendChild(h('figure', { 'class': 'quote' },
        h('blockquote', null, h('p', null, '“' + (t.quote || '') + '”')),
        h('figcaption', null,
          t.photo ? h('img', { src: t.photo, alt: '', width: '56', height: '56', loading: 'lazy' }) : null,
          h('div', null, who, h('div', { 'class': 'role' }, [t.role, t.company].filter(Boolean).join(', '))))));
    });
    host.appendChild(wrap);
  }

  /* Team */
  function renderTeam(host) {
    var items = content.team || [];
    host.textContent = '';
    if (!items.length) {
      host.appendChild(h('div', { 'class': 'slot', role: 'note' },
        h('span', { 'class': 'slot-title' }, 'Your team goes here'),
        h('p', null, 'Photo, name, role and a line or two about each person who will work on a client account. Add people in ',
          h('code', null, 'assets/content.js'), '.')));
      return;
    }
    var ul = h('ul', { 'class': 'team' });
    items.forEach(function (p) {
      ul.appendChild(h('li', null,
        p.photo ? h('img', { src: p.photo, alt: p.name || '', loading: 'lazy' }) : null,
        h('div', { 'class': 'name' }, p.name || ''),
        h('div', { 'class': 'role' }, p.role || ''),
        p.bio ? h('p', { 'class': 'bio' }, p.bio) : null));
    });
    host.appendChild(ul);
  }

  var w = document.getElementById('work-list'); if (w) renderWork(w);
  var t = document.getElementById('testimonial-list'); if (t) renderTestimonials(t);
  var tm = document.getElementById('team-list'); if (tm) renderTeam(tm);

  /* Contact form: opens the visitor's mail app with the message filled in.
     Swap for a form service (Formspree, Netlify Forms) when you have one. */
  var form = document.getElementById('contact-form');
  if (form) {
    var note = document.getElementById('form-note');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var needs = d.getAll('needs').join(', ') || 'Not specified';
      var body = [
        'Name: ' + d.get('name'),
        'Email: ' + d.get('email'),
        'Website: ' + (d.get('website') || 'None'),
        'Needs: ' + needs,
        'Monthly ad budget: ' + (d.get('budget') || 'Not specified'),
        '',
        d.get('message') || ''
      ].join('\n');
      var href = 'mailto:' + form.getAttribute('data-email') +
        '?subject=' + encodeURIComponent('Audit call request from ' + d.get('name')) +
        '&body=' + encodeURIComponent(body);
      note.textContent = 'Opening your email app. If nothing opens, write to ' + form.getAttribute('data-email') + '.';
      window.location.href = href;
    });
  }

  /* Load motion */
  requestAnimationFrame(function () {
    document.body.classList.add('ready');
  });
})();
