/*global tarteaucitron, ga, Shareaholic, stLight, clicky, top, google, Typekit, FB, ferankReady, IN, stButtons, twttr, PCWidget*/
/*jslint regexp: true, nomen: true*/
/* eslint-disable */
// generic iframe
tarteaucitron.services.iframe = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'iframe';
    tarteaucitron.fallback(['tac_iframe'], function (elem) {
      elem.style.width = tarteaucitron.getElemAttr(elem,'width') + 'px';
      elem.style.height = tarteaucitron.getElemAttr(elem,'height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['tac_iframe'], function (x) {
      var frame_title = (tarteaucitron.getElemAttr(x,'title')) ? tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x,'title')) : '',
        width = tarteaucitron.getElemAttr(x,'width'),
        height = tarteaucitron.getElemAttr(x,'height'),
        allowfullscreen = tarteaucitron.getElemAttr(x,'allowfullscreen'),
        url = tarteaucitron.getElemAttr(x,'url');

      return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
    });
  },
  key: 'iframe',
  name: 'Web content',
  needConsent: true,
  type: 'other',
  uri: '',
};

// trustpilot
tarteaucitron.services.trustpilot = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'trustpilot';
    tarteaucitron.fallback(['trustpilot-widget'], function (elem) {
      elem.style.width = elem.getAttribute('data-style-width');
      elem.style.height = elem.getAttribute('data-style-height');
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['trustpilot-widget'], '');
    tarteaucitron.addScript('https://widget.trustpilot.com/bootstrap/v5/tp.widget.sync.bootstrap.min.js');
  },
  key: 'trustpilot',
  name: 'Trustpilot',
  needConsent: true,
  type: 'other',
  uri: 'https://fr.legal.trustpilot.com/for-reviewers/end-user-privacy-terms',
};

// snapchat
tarteaucitron.services.snapchat = {
  cookies: [],
  js: function () {
    'use strict';

    if (tarteaucitron.user.snapchatId === undefined || tarteaucitron.user.snapchatEmail === undefined) {
      return;
    }

    var a = window.snaptr = function() {
      a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments);
    };
    a.queue = [];
    window.snaptr('init', tarteaucitron.user.snapchatId, {
	    user_email: tarteaucitron.user.snapchatEmail,
    });
    window.snaptr('track', 'PAGE_VIEW');

    tarteaucitron.addScript('https://sc-static.net/scevent.min.js');
  },
  key: 'snapchat',
  name: 'Snapchat',
  needConsent: true,
  type: 'analytic',
  uri: 'https://snap.com/fr-FR/privacy/privacy-policy',
};

// antvoice
tarteaucitron.services.antvoice = {
  cookies: ['antvoice'],
  js: function () {
    'use strict';

    if (tarteaucitron.user.antvoiceId === undefined) {
      return;
    }

    window.avDataLayer = window.avDataLayer || [];
    window.avtag = window.avtag || function(_cmd,_p) {
      window.avDataLayer.push({ cmd:_cmd,p:_p });
    };
    window.avtag('init', { id: tarteaucitron.user.antvoiceId });

    tarteaucitron.addScript('https://static.avads.net/avtag.min.js');
  },
  key: 'antvoice',
  name: 'antvoice',
  needConsent: true,
  type: 'ads',
  uri: 'https://www.antvoice.com/fr/privacy-policy/',
};

// plausible
tarteaucitron.services.plausible = {
  cookies: [],
  js: function () {
    'use strict';

    if (tarteaucitron.user.plausibleDomain === undefined) {
      return;
    }

    tarteaucitron.addScript('https://plausible.io/js/script.js', '', '', '', 'data-domain', tarteaucitron.user.plausibleDomain);
  },
  key: 'plausible',
  name: 'Plausible',
  needConsent: false,
  type: 'analytic',
  uri: 'https://plausible.io/privacy',
};

// videas
tarteaucitron.services.videas = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'videas';
    tarteaucitron.fallback(['tac_videas'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['tac_videas'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Videas iframe'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height'),
        id = x.getAttribute('data-id'),
        allowfullscreen = x.getAttribute('allowfullscreen');

      return '<iframe title="' + frame_title + '" src="https://app.videas.fr/embed/' + id + '/" width="' + width + '" height="' + height + '" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
    });
  },
  key: 'videas',
  name: 'Videas',
  needConsent: true,
  type: 'video',
  uri: 'https://videas.fr/fr/legal',
};

// myfeelback
tarteaucitron.services.myfeelback = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.myfeelbackId === undefined) {
      return;
    }

    window._Mfb_useCookie = true;
    window._Mfb_ud = {
      _context: {
        _page: {
          storageDuration: 30,
          url: location.pathname,
        },
        lang: undefined,
        privacyMode: false,
      },
      var1: undefined,
      var2: undefined,
      varN: undefined,
    };
    tarteaucitron.addScript('https://actorssl-5637.kxcdn.com/actor/'+tarteaucitron.user.myfeelbackId+'/action', 'MFBActor');
  },
  key: 'myfeelback',
  name: 'MyFeelBack (Skeepers)',
  needConsent: true,
  type: 'api',
  uri: 'https://help.myfeelback.com/fr/quels-sont-les-cookies-d%C3%A9pos%C3%A9s-par-un-dispositif-de-collecte-myfeelback',
};

// arcio
tarteaucitron.services.arcio = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.arcId === undefined) {
      return;
    }

    tarteaucitron.addScript('https://arc.io/widget.min.js#'+tarteaucitron.user.arcId);
  },
  key: 'arcio',
  name: 'Arc.io',
  needConsent: true,
  type: 'api',
  uri: 'https://arc.io/about',
};

// doubleclick
tarteaucitron.services.doubleclick = {
  cookies: [],
  js: function () {
    'use strict';
    tarteaucitron.fallback(['doubleclick_container'], function (x) {
      var id1 = tarteaucitron.getElemAttr(x, 'data-id1'),
        id2 = tarteaucitron.getElemAttr(x, 'data-id2'),
        item = tarteaucitron.getElemAttr(x, 'data-item'),
        quantity = tarteaucitron.getElemAttr(x, 'data-quantity'),
        price = tarteaucitron.getElemAttr(x, 'data-price'),
        postage = tarteaucitron.getElemAttr(x, 'data-postage'),
        seller = tarteaucitron.getElemAttr(x, 'data-seller'),
        axel = Math.random() + '',
        a = axel * 10000000000000;

      iframe = '<iframe src="http://'+id1+'.fls.doubleclick.net/activityi;src='+id2+';type=;cat=;u1='+item+';u2='+quantity+';u3='+price+';u4='+postage+';u5='+seller+';ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>';
      return iframe;
    });
  },
  key: 'doubleclick',
  name: 'DoubleClick',
  needConsent: true,
  type: 'ads',
  uri: 'https://support.google.com/admanager/answer/2839090',
};

// userpilot
tarteaucitron.services.userpilot = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.userpilotToken === undefined) {
      return;
    }

    window.userpilotSettings = { token: tarteaucitron.user.userpilotToken };
    tarteaucitron.addScript('https://js.userpilot.io/sdk/latest.js');
  },
  key: 'userpilot',
  name: 'UserPilot',
  needConsent: true,
  type: 'analytic',
  uri: 'https://userpilot.com/privacy-policy',
};

tarteaucitron.services.piwikpro = {
  cookies: ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'piwik_ignore', '_pk_uid'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.piwikProId === undefined) {
      return;
    }

    window['dataLayer'] = window['dataLayer'] || [], window['dataLayer'].push({
      event: 'stg.start',
      start: (new Date).getTime(),
    });

    function stgCreateCookie(a, b, c) {
      var d = '';
      if (c) {
        var e = new Date;
        e.setTime(e.getTime() + 24 * c * 60 * 60 * 1e3), d = '; expires=' + e.toUTCString();
      }
      document.cookie = a + '=' + b + d + '; path=/';
    }

    var isStgDebug = (window.location.href.match('stg_debug') || document.cookie.match('stg_debug')) && !window.location.href.match('stg_disable_debug');
    stgCreateCookie('stg_debug', isStgDebug ? 1 : '', isStgDebug ? 14 : -1);
    var qP = [];

    var qPString = qP.length > 0 ? ('?' + qP.join('&')) : '';
    tarteaucitron.addScript('https://carsatse.containers.piwik.pro/'+tarteaucitron.user.piwikProId+'.js'+qPString);

    ! function(a, n, i) {
      a[n] = a[n] || {};
      for (var c = 0; c < i.length; c++) ! function(i) {
        a[n][i] = a[n][i] || {}, a[n][i].api = a[n][i].api || function() {
          var a = [].slice.call(arguments, 0);
          'string' == typeof a[0] && window['dataLayer'].push({
            event: n + '.' + i + ':' + a[0],
            parameters: [].slice.call(arguments, 1),
          });
        };
      }(i[c]);
    }(window, 'ppms', ['tm', 'cm']);
  },
  key: 'piwikpro',
  name: 'Piwik Pro',
  needConsent: true,
  type: 'analytic',
  uri: 'https://piwik.pro/privacy-policy/',
};

// pinterestpixel
tarteaucitron.services.pinterestpixel = {
  cookies: ['_pinterest_sess', '_pinterest_ct', '_pinterest_ct_mw', '_pinterest_ct_rt', '_epik', '_derived_epik', '_pin_unauth', '_pinterest_ct_ua'],
  js: function () {
    'use strict';

    if (tarteaucitron.user.pinterestpixelId === undefined) {
      return;
    }

    if (!window.pintrk) {
      window.pintrk = function () {
        window.pintrk.queue.push(Array.prototype.slice.call(arguments));
      };

      var n = window.pintrk;
      n.queue = [];
      n.version = '3.0';

      tarteaucitron.addScript('https://s.pinimg.com/ct/core.js', '', function () {
        window.pintrk('load', tarteaucitron.user.pinterestpixelId);
        window.pintrk('page');
      });
    }
  },
  key: 'pinterestpixel',
  name: 'Pinterest Pixel',
  needConsent: true,
  type: 'ads',
  uri: 'https://help.pinterest.com/fr/business/article/track-conversions-with-pinterest-tag',
};

// elfsight
tarteaucitron.services.elfsight = {
  cookies: ['__cfduid', '_p_hfp_client_id', 'session_id'],
  js: function () {
    'use strict';

    tarteaucitron.addScript('https://apps.elfsight.com/p/platform.js');
  },
  key: 'elfsight',
  name: 'Elfsight',
  needConsent: true,
  type: 'support',
  uri: 'https://elfsight.com/privacy-policy/',
};

// plezi
tarteaucitron.services.plezi = {
  cookies: [],
  js: function () {
    'use strict';

    if (tarteaucitron.user.pleziTenant === undefined || tarteaucitron.user.pleziTw === undefined) {
      return;
    }

    tarteaucitron.addScript('https://app.plezi.co/scripts/ossleads_analytics.js?tenant=' + tarteaucitron.user.pleziTenant + '&tw=' + tarteaucitron.user.pleziTw);
  },
  key: 'plezi',
  name: 'Plezi',
  needConsent: true,
  type: 'analytic',
  uri: 'https://www.plezi.co/fr/mentions-legales/',
};


// smartsupp
tarteaucitron.services.smartsupp = {
  cookies: ['ssupp.vid', 'ssupp.visits', 'AWSALB', 'AWSALBCORS'],
  js: function () {
    'use strict';

    if (tarteaucitron.user.smartsuppKey === undefined) {
      return;
    }

    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = tarteaucitron.user.smartsuppKey;
    window.smartsupp = function () {
      window.smartsupp._.push(arguments);
    };
    window.smartsupp._ = [];

    tarteaucitron.addScript('https://www.smartsuppchat.com/loader.js');
  },
  key: 'smartsupp',
  name: 'Smartsupp',
  needConsent: true,
  type: 'support',
  uri: 'https://www.smartsupp.com/help/privacy/',
};



// sharpspring
tarteaucitron.services.sharpspring = {
  cookies: ['koitk', '__ss', '__ss_tk', '__ss_referrer'],
  js: function () {
    'use strict';

    if (tarteaucitron.user.ssId === undefined || tarteaucitron.user.ssAccount === undefined) {
      return;
    }

    window._ss = window._ss || [];
    window._ss.push(['_setDomain', 'https://' + tarteaucitron.user.ssId + '.marketingautomation.services/net']);
    window._ss.push(['_setAccount', tarteaucitron.user.ssAccount]);
    window._ss.push(['_trackPageView']);

    window._pa = window._pa || {};

    tarteaucitron.addScript('https://' + tarteaucitron.user.ssId + '.marketingautomation.services/client/ss.js');
  },
  key: 'sharpspring',
  name: 'SharpSpring',
  needConsent: true,
  type: 'analytic',
  uri: 'https://sharpspring.com/legal/sharpspring-cookie-policy/',
};

// pardot
tarteaucitron.services.pardot = {
  cookies: ['visitor_id'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.piAId === undefined || tarteaucitron.user.piCId === undefined) {
      return;
    }

    window.piAId = tarteaucitron.user.piAId;
    window.piCId = tarteaucitron.user.piCId;
    window.piHostname = 'pi.pardot.com';

    tarteaucitron.addScript('https://pi.pardot.com/pd.js');
  },
  key: 'pardot',
  name: 'Pardot',
  needConsent: true,
  type: 'analytic',
  uri: 'https://www.salesforce.com/company/privacy/full_privacy/',
};

// Open Web Analytics
tarteaucitron.services.openwebanalytics = {
  cookies: [],
  js: function () {
    'use strict';

    if (tarteaucitron.user.openwebanalyticsId === undefined || tarteaucitron.user.openwebanalyticsHost === undefined) {
      return;
    }

    window.owa_baseUrl = tarteaucitron.user.openwebanalyticsHost;
    window.owa_cmds = window.owa_cmds || [];
    window.owa_cmds.push(['setSiteId', tarteaucitron.user.openwebanalyticsId]);
    window.owa_cmds.push(['trackPageView']);
    window.owa_cmds.push(['trackClicks']);

    tarteaucitron.addScript(window.owa_baseUrl + 'modules/base/js/owa.tracker-combined-min.js');
  },
  key: 'openwebanalytics',
  name: 'Open Web Analytics',
  needConsent: true,
  type: 'analytic',
  uri: '',
};

// xandr universal pixel
// https://docs.xandr.com/bundle/invest_invest-standard/page/topics/universal-pixel-overview.html
tarteaucitron.services.xandr = {
  cookies: ['uuid2', 'uids', 'sess', 'icu', 'anj', 'usersync'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.xandrId === undefined) {
      return;
    }

    if (!window.pixie) {
      var n = window.pixie = function (e, i, a) {
        n.actionQueue.push({
          action: e,
          actionValue: i,
          params: a,
        });
      };
      n.actionQueue = [];
    }

    tarteaucitron.addScript('https://acdn.adnxs.com/dmp/up/pixie.js', '', function () {
      window.pixie('init', tarteaucitron.user.xandrId);
      window.pixie('event', 'PageView');
    });
  },
  key: 'xandr',
  name: 'Xandr (Universal)',
  needConsent: true,
  type: 'ads',
  uri: 'https://www.xandr.com/privacy/cookie-policy/',
};

// xandr segment
// https://docs.xandr.com/bundle/invest_invest-standard/page/topics/segment-pixels-advanced.html
tarteaucitron.services.xandrsegment = {
  cookies: ['uuid2', 'uids', 'sess', 'icu', 'anj', 'usersync'],
  fallback: function () {
    'use strict';
    var id = 'xandrsegment';
    tarteaucitron.fallback(['xandrsegment-canvas'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    var uniqIds = [],
      i,
      uri;

    tarteaucitron.fallback(['xandrsegment-canvas'], function (x) {
      var uniqId = '_' + Math.random().toString(36).substr(2, 9);
      uniqIds.push(uniqId);
      return '<div id="' + uniqId + '" xandrsegmentAdd="' + x.getAttribute('xandrsegmentAdd') + '" xandrsegmentAddCode="' + x.getAttribute('xandrsegmentAddCode') + '" xandrsegmentRemove="' + x.getAttribute('xandrsegmentRemove') + '" xandrsegmentRemoveCode="' + x.getAttribute('xandrsegmentRemoveCode') + '" xandrsegmentMember="' + x.getAttribute('xandrsegmentMember') + '" xandrsegmentRedir="' + x.getAttribute('xandrsegmentRedir') + '" xandrsegmentValue="' + x.getAttribute('xandrsegmentValue') + '" xandrsegmentOther="' + x.getAttribute('xandrsegmentOther') + '"></div>';
    });

    for (i = 0; i < uniqIds.length; i += 1) {
      uri = '//ib.adnxs.com/seg?t=2&';
      uri += 'add=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentAdd') + '&';
      uri += 'add_code=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentAddCode') + '&';
      uri += 'remove=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentRemove') + '&';
      uri += 'remove_code=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentRemoveCode') + '&';
      uri += 'member=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentMember') + '&';
      uri += 'redir=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentRedir') + '&';
      uri += 'value=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentValue') + '&';
      uri += 'other=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentOther');

      document.getElementById(uniqIds[i]).innerHTML = '<img src=\'' + uri + '\' width=\'1\' height=\'1\' />';
    }
  },
  key: 'xandrsegment',
  name: 'Xandr (Segment)',
  needConsent: true,
  type: 'ads',
  uri: 'https://www.xandr.com/privacy/cookie-policy/',
};

// xandr conversion
// https://docs.xandr.com/bundle/invest_invest-standard/page/topics/working-with-conversion-pixels.html
tarteaucitron.services.xandrconversion = {
  cookies: ['uuid2', 'uids', 'sess', 'icu', 'anj', 'usersync'],
  fallback: function () {
    'use strict';
    var id = 'xandrconversion';
    tarteaucitron.fallback(['xandrconversion-canvas'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    var uniqIds = [],
      i,
      uri;

    tarteaucitron.fallback(['xandrconversion-canvas'], function (x) {
      var uniqId = '_' + Math.random().toString(36).substr(2, 9);
      uniqIds.push(uniqId);
      return '<div id="' + uniqId + '" xandrconversionId="' + x.getAttribute('xandrconversionId') + '" xandrconversionSeg="' + x.getAttribute('xandrconversionSeg') + '" xandrconversionOrderId="' + x.getAttribute('xandrconversionOrderId') + '" xandrconversionValue="' + x.getAttribute('xandrconversionValue') + '" xandrconversionRedir="' + x.getAttribute('xandrconversionRedir') + '" xandrconversionOther="' + x.getAttribute('xandrconversionOther') + '"></div>';
    });

    for (i = 0; i < uniqIds.length; i += 1) {
      uri = '//ib.adnxs.com/px?t=2&';
      uri += 'id=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionId') + '&';
      uri += 'seg=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionSeg') + '&';
      uri += 'order_id=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionOrderId') + '&';
      uri += 'value=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionValue') + '&';
      uri += 'redir=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionRedir') + '&';
      uri += 'other=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionOther');

      document.getElementById(uniqIds[i]).innerHTML = '<img src=\'' + uri + '\' width=\'1\' height=\'1\' />';
    }
  },
  key: 'xandrconversion',
  name: 'Xandr (Conversion)',
  needConsent: true,
  type: 'ads',
  uri: 'https://www.xandr.com/privacy/cookie-policy/',
};

// helloasso
tarteaucitron.services.helloasso = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'helloasso';
    tarteaucitron.fallback(['tac_helloasso'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['tac_helloasso'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'HelloAsso iframe'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height'),
        url = x.getAttribute('data-url'),
        allowfullscreen = x.getAttribute('allowfullscreen');

      return '<iframe title="' + frame_title + '" id="haWidget" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
    });
  },
  key: 'helloasso',
  name: 'HelloAsso',
  needConsent: true,
  type: 'api',
  uri: 'https://www.helloasso.com/confidentialite',
};

// podcloud
tarteaucitron.services.podcloud = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'podcloud';
    tarteaucitron.fallback(['tac_podcloud'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['tac_podcloud'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'podCloud iframe'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height'),
        url = x.getAttribute('data-url'),
        allowfullscreen = x.getAttribute('allowfullscreen');

      return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
    });
  },
  key: 'podcloud',
  name: 'podCloud',
  needConsent: true,
  type: 'video',
  uri: 'https://podcloud.fr/privacy',
};

// facebookpost
tarteaucitron.services.facebookpost = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'facebookpost';
    tarteaucitron.fallback(['tac_facebookpost'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['tac_facebookpost'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Facebook iframe'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height'),
        url = x.getAttribute('data-url'),
        appId = x.getAttribute('data-appid'),
        allowfullscreen = x.getAttribute('allowfullscreen'),
        showText = x.getAttribute('data-show-text');

      return '<iframe title="' + frame_title + '" src="https://www.facebook.com/plugins/post.php?href=' + encodeURIComponent(url) + '&amp;width=' + width + '&amp;show_text=false&amp;appId=' + appId + '&amp;show_text=' + showText + '&amp;height=' + height + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
    });
  },
  key: 'facebookpost',
  name: 'Facebook (post)',
  needConsent: true,
  type: 'social',
  uri: 'https://www.facebook.com/policy.php',
};

// amplitude
tarteaucitron.services.amplitude = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.amplitude === undefined) {
      return;
    }
    tarteaucitron.addScript('https://cdn.amplitude.com/libs/amplitude-5.8.0-min.gz.js', '', function () {

      window.amplitude = {
        _iq: {},
        _q: [],
      };
      function s(e, t) { e.prototype[t] = function () { this._q.push([t].concat(Array.prototype.slice.call(arguments, 0))); return this; }; }
      var o = function () { this._q = []; return this; };
      var a = ['add', 'append', 'clearAll', 'prepend', 'set', 'setOnce', 'unset'];
      for (var u = 0; u < a.length; u++) { s(o, a[u]); }
      amplitude.Identify = o;
      var c = function () { this._q = []; return this; };
      var l = ['setProductId', 'setQuantity', 'setPrice', 'setRevenueType', 'setEventProperties'];
      for (var p = 0; p < l.length; p++) { s(c, l[p]); }
      amplitude.Revenue = c;
      var d = ['init', 'logEvent', 'logRevenue', 'setUserId', 'setUserProperties', 'setOptOut', 'setVersionName', 'setDomain', 'setDeviceId', 'enableTracking', 'setGlobalUserProperties', 'identify', 'clearUserProperties', 'setGroup', 'logRevenueV2', 'regenerateDeviceId', 'groupIdentify', 'onInit', 'logEventWithTimestamp', 'logEventWithGroups', 'setSessionId', 'resetSessionId'];
      function v(e) { function t(t) { e[t] = function () { e._q.push([t].concat(Array.prototype.slice.call(arguments, 0))); }; } for (var n = 0; n < d.length; n++) { t(d[n]); } }
      v(amplitude);
      amplitude.getInstance = function (e) { e = (!e || e.length === 0 ? '$default_instance' : e).toLowerCase(); if (!amplitude._iq.hasOwnProperty(e)) { amplitude._iq[e] = { _q: [] }; v(amplitude._iq[e]); } return amplitude._iq[e]; };

      amplitude.getInstance().init(tarteaucitron.user.amplitude);
    });
  },
  key: 'amplitude',
  name: 'Amplitude',
  needConsent: true,
  type: 'analytic',
  uri: 'https://amplitude.com/privacy',
};

// abtasty
tarteaucitron.services.abtasty = {
  cookies: ['ABTasty', 'ABTastySession'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.abtastyID === undefined) {
      return;
    }
    tarteaucitron.addScript('//try.abtasty.com/' + tarteaucitron.user.abtastyID + '.js');
  },
  key: 'abtasty',
  name: 'ABTasty',
  needConsent: true,
  type: 'api',
  uri: 'https://www.abtasty.com/terms-of-use/',
};


// yandex metrica
tarteaucitron.services.metrica = {
  cookies: ['_ym_metrika_enabled', '_ym_isad', '_ym_uid', '_ym_d', 'yabs-sid', '_ym_debug', '_ym_mp2_substs', '_ym_hostIndex', '_ym_mp2_track', 'yandexuid', 'usst'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.yandexmetrica === undefined) {
      return;
    }
    tarteaucitron.addScript('https://mc.yandex.ru/metrika/tag.js', '', function () {

      (function (m, e, t, r, i, k, a) {
        m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
        m[i].l = 1 * new Date(); k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a);
      })
      (window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

      ym(tarteaucitron.user.yandexmetrica, 'init', {
        accurateTrackBounce: true,
        clickmap: true,
        ecommerce: 'dataLayer',
        trackLinks: true,
        webvisor: true,
      });
    });
  },
  key: 'metrica',
  name: 'Yandex Metrica',
  needConsent: true,
  type: 'analytic',
  uri: 'https://yandex.com/legal/confidential/',
};

// addthis
tarteaucitron.services.addthis = {
  cookies: ['__atuvc', '__atuvs'],
  fallback: function () {
    'use strict';
    var id = 'addthis';
    tarteaucitron.fallback(['addthis_inline_share_toolbox'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    if (tarteaucitron.user.addthisPubId === undefined) {
      return;
    }
    if (tarteaucitron.isAjax === true) {
      window.addthis = null;
      window._adr = null;
      window._atc = null;
      window._atd = null;
      window._ate = null;
      window._atr = null;
      window._atw = null;
    }
    tarteaucitron.fallback(['addthis_inline_share_toolbox'], '');
    tarteaucitron.addScript('//s7.addthis.com/js/300/addthis_widget.js#pubid=' + tarteaucitron.user.addthisPubId);
  },
  key: 'addthis',
  name: 'AddThis',
  needConsent: true,
  type: 'social',
  uri: 'https://www.addthis.com/privacy/privacy-policy#publisher-visitors',
};

// addtoanyfeed
tarteaucitron.services.addtoanyfeed = {
  cookies: [],
  fallback: function () {
    'use strict';
    tarteaucitron.user.addtoanyfeedSubscribeLink = 'https://www.addtoany.com/subscribe?linkurl=' + tarteaucitron.user.addtoanyfeedUri;
  },
  js: function () {
    'use strict';
    if (tarteaucitron.user.addtoanyfeedUri === undefined) {
      return;
    }
    tarteaucitron.user.addtoanyfeedSubscribeLink = 'https://www.addtoany.com/subscribe?linkurl=' + tarteaucitron.user.addtoanyfeedUri;
    window.a2a_config = window.a2a_config || {};
    window.a2a_config.linkurl = tarteaucitron.user.addtoanyfeedUri;
    tarteaucitron.addScript('//static.addtoany.com/menu/feed.js');
  },
  key: 'addtoanyfeed',
  name: 'AddToAny (feed)',
  needConsent: true,
  type: 'social',
  uri: 'https://www.addtoany.com/privacy',
};

// addtoanyshare
tarteaucitron.services.addtoanyshare = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'addtoanyshare';
    tarteaucitron.fallback(['tac_addtoanyshare'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['tac_addtoanyshare'], function (elem) {
      elem.remove();
    }, true);
    tarteaucitron.addScript('//static.addtoany.com/menu/page.js');
  },
  key: 'addtoanyshare',
  name: 'AddToAny (share)',
  needConsent: true,
  type: 'social',
  uri: 'https://www.addtoany.com/privacy',
};

// aduptech ads
tarteaucitron.services.aduptech_ads = {
  cookies: [],
  fallback: function () {
    'use strict';
    tarteaucitron.fallback(['aduptech_ads'], tarteaucitron.engage('aduptech_ads'));
  },
  js: function () {
    'use strict';

    var IDENTIFIER = 'aduptech_ads',
      API_URL = 'https://s.d.adup-tech.com/jsapi';

    var elements = document.getElementsByClassName(IDENTIFIER);
    if (!elements || elements.length === 0) {
      return;
    }

    tarteaucitron.fallback([IDENTIFIER], '');

    tarteaucitron.addScript(API_URL, '', function () {
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (!element.getAttribute('id')) {
          element.setAttribute('id', IDENTIFIER + Math.random().toString(36).substr(2, 9));
        }

        window.uAd.embed(element.getAttribute('id'), {
          adtest: Boolean(element.getAttribute('test')),
          lazy: Boolean(element.getAttribute('lazy')),
          minCpc: element.getAttribute('minCpc') || '',
          pageUrl: element.getAttribute('pageUrl') || '',
          placementKey: element.getAttribute('placementKey'),
          query: element.getAttribute('query') || '',
          responsive: Boolean(element.getAttribute('responsive')),
          skip: element.getAttribute('skip') || '',
        });
      }
    });

  },
  key: 'aduptech_ads',
  name: 'Ad Up Technology (ads)',
  needConsent: true,
  type: 'ads',
  uri: 'https://www.adup-tech.com/datenschutz',
};

// aduptech conversion
tarteaucitron.services.aduptech_conversion = {
  cookies: [],
  js: function () {
    'use strict';

    var IDENTIFIER = 'aduptech_conversion',
      CONVERSION_PIXEL_BASE_URL = 'https://d.adup-tech.com/campaign/conversion';

    var elements = document.getElementsByClassName(IDENTIFIER);
    if (!elements || elements.length === 0) {
      return;
    }

    tarteaucitron.fallback([IDENTIFIER], '');

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      if (!element.getAttribute('advertiserId') || !element.getAttribute('conversionCode')) {
        continue;
      }

      var url = CONVERSION_PIXEL_BASE_URL +
                '/' + encodeURIComponent(element.getAttribute('advertiserId')) +
                '?t=' + encodeURIComponent(element.getAttribute('conversionCode'));

      if (element.getAttribute('price')) {
        url += '&price=' + encodeURIComponent(element.getAttribute('price'));
      }

      if (element.getAttribute('quantity')) {
        url += '&quantity=' + encodeURIComponent(element.getAttribute('quantity'));
      }

      if (element.getAttribute('total')) {
        url += '&total=' + encodeURIComponent(element.getAttribute('total'));
      }

      if (element.getAttribute('orderId')) {
        url += '&order_id=' + encodeURIComponent(element.getAttribute('orderId'));
      }

      if (element.getAttribute('itemNumber')) {
        url += '&item_number=' + encodeURIComponent(element.getAttribute('itemNumber'));
      }

      if (element.getAttribute('description')) {
        url += '&description=' + encodeURIComponent(element.getAttribute('description'));
      }

      (new Image()).src = url;
    }
  },
  key: 'aduptech_conversion',
  name: 'Ad Up Technology (conversion)',
  needConsent: true,
  type: 'ads',
  uri: 'https://www.adup-tech.com/datenschutz',
};

// aduptech retargeting
tarteaucitron.services.aduptech_retargeting = {
  cookies: [],
  js: function () {
    'use strict';

    var IDENTIFIER = 'aduptech_retargeting',
      API_URL = 'https://s.d.adup-tech.com/services/retargeting.js';

    var elements = document.getElementsByClassName(IDENTIFIER);
    if (!elements || elements.length === 0) {
      return;
    }

    tarteaucitron.fallback([IDENTIFIER], '');

    window.AdUpRetargeting = function (api) {
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        api.init();

        api.setAccount(element.getAttribute('account'));

        if (element.getAttribute('email')) {
          api.setEmail(element.getAttribute('email'));
        } else if (element.getAttribute('hashedEmail')) {
          api.setHashedEmail(element.getAttribute('hashedEmail'));
        }

        if (element.getAttribute('product')) {
          try {
            api.setProduct(JSON.parse(element.getAttribute('product')));
          } catch (e) {
            api.setProduct(element.getAttribute('product'));
          }
        }

        if (element.getAttribute('transaction')) {
          try {
            api.setTransaction(JSON.parse(element.getAttribute('transaction')));
          } catch (e) {
            api.setTransaction(element.getAttribute('transaction'));
          }
        }

        if (element.getAttribute('demarkUser')) {
          api.setDemarkUser();
        } else if (element.getAttribute('demarkProducts')) {
          api.setDemarkProducts();
        }

        if (element.getAttribute('conversionCode')) {
          api.setConversionCode(element.getAttribute('conversionCode'));
        }

        if (element.getAttribute('device')) {
          var setter = 'set' + element.getAttribute('device').charAt(0).toUpperCase() + element.getAttribute('device').slice(1);
          if (typeof api[setter] === 'function') {
            api[setter]();
          }
        }

        if (element.getAttribute('track')) {
          var tracker = 'track' + element.getAttribute('track').charAt(0).toUpperCase() + element.getAttribute('track').slice(1);
          if (typeof api[tracker] === 'function') {
            api[tracker]();
          } else {
            api.trackHomepage();
          }
        }
      };
    };

    tarteaucitron.addScript(API_URL);
  },
  key: 'aduptech_retargeting',
  name: 'Ad Up Technology (retargeting)',
  needConsent: true,
  type: 'ads',
  uri: 'https://www.adup-tech.com/datenschutz',
};

// alexa
tarteaucitron.services.alexa = {
  cookies: ['__asc', '__auc'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.alexaAccountID === undefined) {
      return;
    }
    window._atrk_opts = {
      atrk_acct: tarteaucitron.user.alexaAccountID,
      domain: window.location.hostname.match(/[^\.]*\.[^.]*$/)[0],
      dynamic: true,
    };
    tarteaucitron.addScript('https://d31qbv1cthcecs.cloudfront.net/atrk.js');
  },
  key: 'alexa',
  name: 'Alexa',
  needConsent: true,
  type: 'analytic',
  uri: 'https://www.alexa.com/help/privacy',
};

// amazon
tarteaucitron.services.amazon = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'amazon';
    tarteaucitron.fallback(['amazon_product'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['amazon_product'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Amazon iframe'),
        amazonId = x.getAttribute('amazonid'),
        productId = x.getAttribute('productid'),
        url = '//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=' + tarteaucitron.getLanguage().toUpperCase() + '&source=ss&ref=ss_til&ad_type=product_link&tracking_id=' + amazonId + '&marketplace=amazon&region=' + tarteaucitron.getLanguage().toUpperCase() + '&placement=' + productId + '&asins=' + productId + '&show_border=true&link_opens_in_new_window=true',
        iframe = '<iframe title="' + frame_title + '" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" src="' + url + '"></iframe>';

      return iframe;
    });
  },
  key: 'amazon',
  name: 'Amazon',
  needConsent: true,
  type: 'ads',
  uri: 'https://www.amazon.com/gp/help/customer/display.html/ref=help_search_1-1?ie=UTF8&nodeId=201909010&qid=1544617177&sr=1-1',
};

// calameo
tarteaucitron.services.calameo = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'calameo';
    tarteaucitron.fallback(['calameo-canvas'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['calameo-canvas'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Calameo iframe'),
        id = x.getAttribute('data-id'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height'),
        url = '//v.calameo.com/?bkcode=' + id,
        allowfullscreen = x.getAttribute('allowfullscreen');

      return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
    });
  },
  key: 'calameo',
  name: 'Calameo',
  needConsent: true,
  type: 'video',
  uri: 'https://fr.calameo.com/privacy',
};

// clicky
tarteaucitron.services.clicky = {
  cookies: ['_jsuid', '_eventqueue', '_referrer_og', '_utm_og', '_first_pageview', 'clicky_olark', 'no_trackyy_' + tarteaucitron.user.clickyId, 'unpoco_' + tarteaucitron.user.clickyId, 'heatmaps_g2g_' + tarteaucitron.user.clickyId],
  js: function () {
    'use strict';
    if (tarteaucitron.user.clickyId === undefined) {
      return;
    }
    tarteaucitron.addScript('//static.getclicky.com/js', '', function () {
      if (typeof clicky.init === 'function') {
        clicky.init(tarteaucitron.user.clickyId);
      }
      if (typeof tarteaucitron.user.clickyMore === 'function') {
        tarteaucitron.user.clickyMore();
      }
    });
  },
  key: 'clicky',
  name: 'Clicky',
  needConsent: true,
  type: 'analytic',
  uri: 'https://clicky.com/terms',
};

// clicmanager
tarteaucitron.services.clicmanager = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'clicmanager';
    tarteaucitron.fallback(['clicmanager-canvas'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    var uniqIds = [],
      i,
      uri;

    tarteaucitron.fallback(['clicmanager-canvas'], function (x) {
      var uniqId = '_' + Math.random().toString(36).substr(2, 9);
      uniqIds.push(uniqId);
      return '<div id="' + uniqId + '" c="' + x.getAttribute('c') + '" s="' + x.getAttribute('s') + '" t="' + x.getAttribute('t') + '"></div>';
    });

    for (i = 0; i < uniqIds.length; i += 1) {
      uri = '//ads.clicmanager.fr/exe.php?';
      uri += 'c=' + document.getElementById(uniqIds[i]).getAttribute('c') + '&';
      uri += 's=' + document.getElementById(uniqIds[i]).getAttribute('s') + '&';
      uri += 't=' + document.getElementById(uniqIds[i]).getAttribute('t');

      tarteaucitron.makeAsync.init(uri, uniqIds[i]);
    }
  },
  key: 'clicmanager',
  name: 'Clicmanager',
  needConsent: true,
  type: 'ads',
  uri: 'http://www.clicmanager.fr/infos_legales.php',
};

// compteur
tarteaucitron.services.compteur = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.compteurID === undefined) {
      return;
    }
    tarteaucitron.addScript('https://server2.compteur.fr/log7.js', '', function () { wtslog7(tarteaucitron.user.compteurID, 1); });
  },
  key: 'compteur',
  name: 'Compteur.fr',
  needConsent: true,
  type: 'analytic',
  uri: 'https://www.compteur.fr/help_privacy_policy.htm',
};

// contentsquare
tarteaucitron.services.contentsquare = {
  cookies: ['_cs_id', '_cs_s', '_cs_vars', '_cs_ex', '_cs_c', '_cs_optout'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.contentsquareID === undefined) {
      return;
    }
    tarteaucitron.addScript('//t.contentsquare.net/uxa/' + tarteaucitron.user.contentsquareID + '.js');
  },
  key: 'contentsquare',
  name: 'ContentSquare',
  needConsent: true,
  type: 'api',
  uri: 'https://docs.contentsquare.com/uxa-en/#collected-data',
};

// crazyegg
tarteaucitron.services.crazyegg = {
  cookies: [],
  js: function () {
    'use strict';

    if (tarteaucitron.user.crazyeggId === undefined) {
      return;
    }

    tarteaucitron.addScript('//script.crazyegg.com/pages/scripts/' + tarteaucitron.user.crazyeggId.substr(0, 4) + '/' + tarteaucitron.user.crazyeggId.substr(4, 4) + '.js');
  },
  key: 'crazyegg',
  name: 'Crazy Egg',
  needConsent: true,
  type: 'analytic',
  uri: 'https://www.crazyegg.com/privacy',
};

// clarity
tarteaucitron.services.clarity = {
  cookies: [],
  js: function () {
    'use strict';

    window['clarity'] = window['clarity'] || function () { (window['clarity'].q = window['clarity'].q || []).push(arguments); };

    tarteaucitron.addScript('https://www.clarity.ms/tag/' + tarteaucitron.user.clarity);
  },
  key: 'clarity',
  name: 'Clarity',
  needConsent: true,
  type: 'analytic',
  uri: 'https://clarity.microsoft.com/',
};

// criteo
tarteaucitron.services.criteo = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'criteo';
    tarteaucitron.fallback(['criteo-canvas'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    document.MAX_ct0 = '';
    var uniqIds = [],
      i,
      uri;

    tarteaucitron.fallback(['criteo-canvas'], function (x) {
      var uniqId = '_' + Math.random().toString(36).substr(2, 9);
      uniqIds.push(uniqId);
      return '<div id="' + uniqId + '" zoneid="' + x.getAttribute('zoneid') + '"></div>';
    });

    for (i = 0; i < uniqIds.length; i += 1) {
      uri = '//cas.criteo.com/delivery/ajs.php?';
      uri += 'zoneid=' + document.getElementById(uniqIds[i]).getAttribute('zoneid');
      uri += '&nodis=1&cb=' + Math.floor(Math.random() * 99999999999);
      uri += '&loc=' + encodeURI(window.location);
      uri += (document.MAX_used !== ',') ? '&exclude=' + document.MAX_used : '';
      uri += (document.charset !== undefined ? '&charset=' + document.charset : '');
      uri += (document.characterSet !== undefined ? '&charset=' + document.characterSet : '');
      uri += (document.referrer !== undefined) ? '&referer=' + encodeURI(document.referrer) : '';
      uri += (document.context !== undefined) ? '&context=' + encodeURI(document.context) : '';
      uri += ((document.MAX_ct0 !== undefined) && (document.MAX_ct0.substring(0, 4) === 'http')) ? '&ct0=' + encodeURI(document.MAX_ct0) : '';
      uri += (document.mmm_fo !== undefined) ? '&mmm_fo=1' : '';

      tarteaucitron.makeAsync.init(uri, uniqIds[i]);
    }
  },
  key: 'criteo',
  name: 'Criteo',
  needConsent: true,
  type: 'ads',
  uri: 'http://www.criteo.com/privacy/',
};

// criteo onetag
tarteaucitron.services.criteoonetag = {
  cookies: ['uid', 'tk', 'uid3pd'],
  js: function() {
    'use strict';
    if (tarteaucitron.user.criteoonetagAccount === undefined) return;

    window.criteo_q = window.criteo_q || []; 
    window.criteo_q.push({
      account: tarteaucitron.user.criteoonetagAccount,
      event: 'setAccount',
    });

    tarteaucitron.addScript('//static.criteo.net/js/ld/ld.js', '', function() {
      if (typeof tarteaucitron.user.criteoonetagMore === 'function') {
        tarteaucitron.user.criteoonetagMore();
      }
    });
  },
  key: 'criteoonetag',
  name: 'Criteo OneTag',
  needConsent: true,
  type: 'ads',
  uri: 'https://www.criteo.com/privacy/',
};

// artetv
tarteaucitron.services.artetv = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'artetv';
    tarteaucitron.fallback(['artetv_player'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['artetv_player'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Arte.tv iframe'),
        video_json = x.getAttribute('json'),
        video_width = x.getAttribute('width'),
        video_height = x.getAttribute('height'),
        video_frame,
        video_allowfullscreen = x.getAttribute('allowfullscreen');

      if (video_json === undefined) {
        return '';
      }

      video_frame = '<iframe title="' + frame_title + '" style="transition-duration: 0; transition-property: no; margin: 0 auto; position: relative; display: block; background-color: #000000;" src="https://www.arte.tv/player/v5/index.php?json_url=' + video_json + '" width="' + video_width + '" height="' + video_height + '" scrolling="no" ' + (video_allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
      return video_frame;
    });
  },
  key: 'artetv',
  name: 'Arte.tv',
  needConsent: true,
  type: 'video',
  uri: 'https://www.arte.tv/sites/fr/corporate/donnees-personnelles/',
};

// dailymotion
tarteaucitron.services.dailymotion = {
  cookies: ['ts', 'dmvk', 'hist', 'v1st', 's_vi'],
  fallback: function () {
    'use strict';
    var id = 'dailymotion';
    tarteaucitron.fallback(['dailymotion_player'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['dailymotion_player'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x, 'title') || 'Dailymotion iframe'),
        video_id = tarteaucitron.getElemAttr(x, 'videoID'),
        video_width = tarteaucitron.getElemAttr(x, 'width'),
        frame_width = 'width=',
        video_height = tarteaucitron.getElemAttr(x, 'height'),
        frame_height = 'height=',
        video_frame,
        embed_type = tarteaucitron.getElemAttr(x, 'embedType'),
        allowfullscreen = tarteaucitron.getElemAttr(x, 'allowfullscreen'),
        showinfo = tarteaucitron.getElemAttr(x, 'showinfo'),
        autoplay = tarteaucitron.getElemAttr(x, 'autoplay'),
        api = tarteaucitron.getElemAttr(x, 'api'),
        params = 'info=' + showinfo + '&autoPlay=' + autoplay + '&api=' + api;

      if (video_id === undefined) {
        return '';
      }
      if (video_width !== undefined) {
        frame_width += '"' + video_width + '" ';
      } else {
        frame_width += '"" ';
      }
      if (video_height !== undefined) {
        frame_height += '"' + video_height + '" ';
      } else {
        frame_height += '"" ';
      }
      if (embed_type === undefined || !['video', 'playlist'].includes(embed_type)) {
        embed_type = 'video';
      }
      video_frame = '<iframe title="' + frame_title + '" src="//www.dailymotion.com/embed/' + embed_type + '/' + video_id + '?' + params + '" ' + frame_width + frame_height + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
      return video_frame;
    });
  },
  key: 'dailymotion',
  name: 'Dailymotion',
  needConsent: true,
  type: 'video',
  uri: 'https://www.dailymotion.com/legal/privacy',
};

// dating affiliation
tarteaucitron.services.datingaffiliation = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'datingaffiliation';
    tarteaucitron.fallback(['datingaffiliation-canvas'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['datingaffiliation-canvas'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Dating Affiliation iframe'),
        comfrom = x.getAttribute('data-comfrom'),
        r = x.getAttribute('data-r'),
        p = x.getAttribute('data-p'),
        cf0 = x.getAttribute('data-cf0'),
        langue = x.getAttribute('data-langue'),
        forward_affiliate = x.getAttribute('data-forwardAffiliate'),
        cf2 = x.getAttribute('data-cf2'),
        cfsa2 = x.getAttribute('data-cfsa2'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height'),
        url = 'http://www.tools-affil2.com/rotaban/ban.php?' + comfrom;

      return '<iframe title="' + frame_title + '" src="' + url + '&r=' + r + '&p=' + p + '&cf0=' + cf0 + '&langue=' + langue + '&forward_affiliate=' + forward_affiliate + '&cf2=' + cf2 + '&cfsa2=' + cfsa2 + '" width="' + width + '" height="' + height + '" marginheight="0" marginwidth="0" scrolling="no"></iframe>';
    });
  },
  key: 'datingaffiliation',
  name: 'Dating Affiliation',
  needConsent: true,
  type: 'ads',
  uri: 'http://www.dating-affiliation.com/conditions-generales.php',
};

// dating affiliation popup
tarteaucitron.services.datingaffiliationpopup = {
  cookies: ['__utma', '__utmb', '__utmc', '__utmt_Tools', '__utmv', '__utmz', '_ga', '_gat', '_gat_UA-65072040-17', '__da-pu-xflirt-ID-pc-o169'],
  fallback: function () {
    'use strict';
    var id = 'datingaffiliationpopup';
    tarteaucitron.fallback(['datingaffiliationpopup-canvas'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    var uniqIds = [],
      i,
      uri;

    tarteaucitron.fallback(['datingaffiliationpopup-canvas'], function (x) {
      var uniqId = '_' + Math.random().toString(36).substr(2, 9);
      uniqIds.push(uniqId);
      return '<div id="' + uniqId + '" uri="' + x.getAttribute('uri') + '" comfrom="' + x.getAttribute('comfrom') + '" promo="' + x.getAttribute('promo') + '" productid="' + x.getAttribute('productid') + '" submitconfig="' + x.getAttribute('submitconfig') + '" ur="' + x.getAttribute('ur') + '" brand="' + x.getAttribute('brand') + '" lang="' + x.getAttribute('lang') + '" cf0="' + x.getAttribute('cf0') + '" cf2="' + x.getAttribute('cf2') + '" subid1="' + x.getAttribute('subid1') + '" cfsa2="' + x.getAttribute('cfsa2') + '" subid2="' + x.getAttribute('subid2') + '" nicheid="' + x.getAttribute('nicheid') + '" degreid="' + x.getAttribute('degreid') + '" bt="' + x.getAttribute('bt') + '" vis="' + x.getAttribute('vis') + '" hid="' + x.getAttribute('hid') + '" snd="' + x.getAttribute('snd') + '" aabd="' + x.getAttribute('aabd') + '" aabs="' + x.getAttribute('aabs') + '"></div>';
    });

    for (i = 0; i < uniqIds.length; i += 1) {
      uri = 'http://www.promotools.biz/da/popunder/script.php?';
      uri += 'comfrom=' + document.getElementById(uniqIds[i]).getAttribute('comfrom') + '&';
      uri += 'promo=' + document.getElementById(uniqIds[i]).getAttribute('promo') + '&';
      uri += 'product_id=' + document.getElementById(uniqIds[i]).getAttribute('productid') + '&';
      uri += 'submitconfig=' + document.getElementById(uniqIds[i]).getAttribute('submitconfig') + '&';
      uri += 'ur=' + document.getElementById(uniqIds[i]).getAttribute('ur') + '&';
      uri += 'brand=' + document.getElementById(uniqIds[i]).getAttribute('brand') + '&';
      uri += 'lang=' + document.getElementById(uniqIds[i]).getAttribute('lang') + '&';
      uri += 'cf0=' + document.getElementById(uniqIds[i]).getAttribute('cf0') + '&';
      uri += 'cf2=' + document.getElementById(uniqIds[i]).getAttribute('cf2') + '&';
      uri += 'subid1=' + document.getElementById(uniqIds[i]).getAttribute('subid1') + '&';
      uri += 'cfsa2=' + document.getElementById(uniqIds[i]).getAttribute('cfsa2') + '&';
      uri += 'subid2=' + document.getElementById(uniqIds[i]).getAttribute('subid2') + '&';
      uri += 'nicheId=' + document.getElementById(uniqIds[i]).getAttribute('nicheid') + '&';
      uri += 'degreId=' + document.getElementById(uniqIds[i]).getAttribute('degreid') + '&';
      uri += 'bt=' + document.getElementById(uniqIds[i]).getAttribute('bt') + '&';
      uri += 'vis=' + document.getElementById(uniqIds[i]).getAttribute('vis') + '&';
      uri += 'hid=' + document.getElementById(uniqIds[i]).getAttribute('hid') + '&';
      uri += 'snd=' + document.getElementById(uniqIds[i]).getAttribute('snd') + '&';
      uri += 'aabd=' + document.getElementById(uniqIds[i]).getAttribute('aabd') + '&';
      uri += 'aabs=' + document.getElementById(uniqIds[i]).getAttribute('aabs');

      tarteaucitron.makeAsync.init(uri, uniqIds[i]);
    }
  },
  key: 'datingaffiliationpopup',
  name: 'Dating Affiliation (Pop Up)',
  needConsent: true,
  type: 'ads',
  uri: 'http://www.dating-affiliation.com/conditions-generales.php',
};

// deezer
tarteaucitron.services.deezer = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'deezer';
    tarteaucitron.fallback(['deezer_player'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['deezer_player'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Deezer iframe'),
        deezer_id = x.getAttribute('deezerID'),
        deezer_width = x.getAttribute('width'),
        frame_width = 'width=',
        deezer_height = x.getAttribute('height'),
        frame_height = 'height=',
        deezer_frame,
        embed_theme = x.getAttribute('theme'),
        embed_type = x.getAttribute('embedType'),
        radius = x.getAttribute('radius'),
        tracklist = x.getAttribute('tracklist'),
        allowfullscreen = x.getAttribute('allowfullscreen'),
        params;

      if (deezer_id === undefined) {
        return '';
      }
      if (deezer_width !== undefined) {
        frame_width += '"' + deezer_width + '" ';
      } else {
        frame_width += '"" ';
      }
      if (deezer_height !== undefined) {
        frame_height += '"' + deezer_height + '" ';
      } else {
        frame_height += '"" ';
      }
      if (embed_theme === undefined || !['auto', 'light', 'dark'].includes(embed_theme)) {
        embed_theme = 'auto';
      }
      if (embed_type === undefined || !['album', 'track', 'playlist'].includes(embed_type)) {
        embed_type = 'album';
      }
      if (radius === undefined || !['true', 'false'].includes(radius)) {
        radius = 'true';
      }
      if (tracklist === undefined || !['true', 'false'].includes(tracklist)) {
        tracklist = 'true';
      }
      params = 'tracklist=' + tracklist + '&radius=' + radius;
      deezer_frame = '<iframe title="' + frame_title + '" src="//widget.deezer.com/widget/' + embed_theme + '/' + embed_type + '/' + deezer_id + '?' + params + '" ' + frame_width + frame_height + ' ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
      return deezer_frame;
    });
  },
  key: 'deezer',
  name: 'Deezer',
  needConsent: true,
  type: 'video',
  uri: 'https://www.deezer.com/legal/personal-datas',
};

// leadforensics
tarteaucitron.services.leadforensics = {
  cookies: ['trackalyzer'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.leadforensicsSf14gv === undefined ||
            tarteaucitron.user.leadforensicsIidentifier === undefined) {
      return;
    }

    window.sf14gv = tarteaucitron.user.leadforensicsSf14gv;

    (function () {
      var sf14g = document.createElement('script'); sf14g.async = true;
      sf14g.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 't.sf14g.com/sf14g.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sf14g, s);
    })();

    tarteaucitron.addScript('//secure.leadforensics.com/js/' + tarteaucitron.user.leadforensicsIidentifier + '.js');
  },
  key: 'leadforensics',
  name: 'LeadForensics',
  needConsent: true,
  type: 'analytic',
  uri: 'https://www.leadforensics.com/privacy-policy/',
};

// disqus
tarteaucitron.services.disqus = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'disqus';

    if (document.getElementById('disqus_thread')) {
      document.getElementById('disqus_thread').innerHTML = tarteaucitron.engage(id);
    }
  },
  js: function () {
    'use strict';
    if (tarteaucitron.user.disqusShortname === undefined) {
      return;
    }
    tarteaucitron.addScript('//' + tarteaucitron.user.disqusShortname + '.disqus.com/embed.js');
    tarteaucitron.addScript('//' + tarteaucitron.user.disqusShortname + '.disqus.com/count.js');
  },
  key: 'disqus',
  name: 'Disqus',
  needConsent: true,
  type: 'comment',
  uri: 'https://help.disqus.com/customer/portal/articles/466259-privacy-policy',
};

// ekomi
tarteaucitron.services.ekomi = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.ekomiCertId === undefined) {
      return;
    }
    window.eKomiIntegrationConfig = [
      { certId: tarteaucitron.user.ekomiCertId },
    ];
    tarteaucitron.addScript('//connect.ekomi.de/integration_1410173009/' + tarteaucitron.user.ekomiCertId + '.js');
  },
  key: 'ekomi',
  name: 'eKomi',
  needConsent: true,
  type: 'social',
  uri: 'http://www.ekomi-us.com/us/privacy/',
};

// etracker
tarteaucitron.services.etracker = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.etracker === undefined) {
      return;
    }

    tarteaucitron.addScript('//static.etracker.com/code/e.js', '_etLoader', function () { }, true, 'data-secure-code', tarteaucitron.user.etracker);
  },
  key: 'etracker',
  name: 'eTracker',
  needConsent: true,
  type: 'analytic',
  uri: 'https://www.etracker.com/en/data-protection.html',
};

// facebook
tarteaucitron.services.facebook = {
  cookies: ['xs', 'sb', 'fr', 'datr', 'dpr', 'c_user'],
  fallback: function () {
    'use strict';
    var id = 'facebook';
    tarteaucitron.fallback(['fb-post', 'fb-follow', 'fb-activity', 'fb-send', 'fb-share-button', 'fb-like', 'fb-video'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['fb-post', 'fb-follow', 'fb-activity', 'fb-send', 'fb-share-button', 'fb-like', 'fb-video'], '');
    tarteaucitron.addScript('//connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk.js#xfbml=1&version=v2.0', 'facebook-jssdk');
    if (tarteaucitron.isAjax === true) {
      if (typeof FB !== 'undefined') {
        FB.XFBML.parse();
      }
    }
  },
  key: 'facebook',
  name: 'Facebook',
  needConsent: true,
  type: 'social',
  uri: 'https://www.facebook.com/policy.php',
};

// facebooklikebox
tarteaucitron.services.facebooklikebox = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'facebooklikebox';
    tarteaucitron.fallback(['fb-like-box', 'fb-page'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['fb-like-box', 'fb-page'], '');
    tarteaucitron.addScript('//connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk.js#xfbml=1&version=v2.3', 'facebook-jssdk');
    if (tarteaucitron.isAjax === true) {
      if (typeof FB !== 'undefined') {
        FB.XFBML.parse();
      }
    }
  },
  key: 'facebooklikebox',
  name: 'Facebook (like box)',
  needConsent: true,
  type: 'social',
  uri: 'https://www.facebook.com/policy.php',
};

// facebookcomment
tarteaucitron.services.facebookcomment = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'facebookcomment';
    tarteaucitron.fallback(['fb-comments'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['fb-comments'], '');
    tarteaucitron.addScript('//connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk.js#xfbml=1&version=v2.0', 'facebook-jssdk');
    if (tarteaucitron.isAjax === true) {
      if (typeof FB !== 'undefined') {
        FB.XFBML.parse();
      }
    }
  },
  key: 'facebookcomment',
  name: 'Facebook (commentaire)',
  needConsent: true,
  type: 'comment',
  uri: 'https://www.facebook.com/policy.php',
};

// ferank
tarteaucitron.services.ferank = {
  cookies: [],
  js: function () {
    'use strict';
    tarteaucitron.addScript('//static.ferank.fr/pixel.js', '', function () {
      if (typeof tarteaucitron.user.ferankMore === 'function') {
        tarteaucitron.user.ferankMore();
      }
    });
  },
  key: 'ferank',
  name: 'FERank',
  needConsent: false,
  type: 'analytic',
  uri: 'https://www.ferank.fr/respect-vie-privee/#mesureaudience',
};

// pingdom
tarteaucitron.services.pingdom = {
  cookies: [],
  js: function () {
    'use strict';

    if (tarteaucitron.user.pingdomId === undefined) {
      return;
    }

    window._prum = [['id', tarteaucitron.user.pingdomId], ['mark', 'firstbyte', (new Date()).getTime()]];

    tarteaucitron.addScript('https://rum-static.pingdom.net/prum.min.js');
  },
  key: 'pingdom',
  name: 'Pingdom',
  needConsent: true,
  type: 'api',
  uri: 'https://www.solarwinds.com/general-data-protection-regulation-cloud',
};


// simpleanalytics
tarteaucitron.services.simpleanalytics = {
  cookies: [],
  js: function () {
    'use strict';
    tarteaucitron.addScript('https://scripts.simpleanalyticscdn.com/latest.js');
  },
  key: 'simpleanalytics',
  name: 'Simple Analytics',
  needConsent: false,
  type: 'analytic',
  uri: 'https://docs.simpleanalytics.com/what-we-collect',
};

// stonly
tarteaucitron.services.stonly = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.stonlyId === undefined) {
      return;
    }

    window.STONLY_WID = tarteaucitron.user.stonlyId;
    window.StonlyWidget || ((window.w = window.StonlyWidget = function () {
      window.w._api ? window.w._api.apply(window.w, arguments) : window.w.queue.push(arguments);
    }).queue = []);

    tarteaucitron.addScript('https://stonly.com/js/widget/v2/stonly-widget.js?v=' + Date.now());
  },
  key: 'stonly',
  name: 'Stonly',
  needConsent: true,
  type: 'api',
  uri: 'https://stonly.com/privacy',
};

// stripe
/*tarteaucitron.services.stripe = {
    "key": "stripe",
    "type": "api",
    "name": "Stripe",
    "uri": "https://stripe.com/cookies-policy/legal",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://js.stripe.com/v3/');
    }
};*/

// ferank pub
tarteaucitron.services.ferankpub = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'ferankpub';
    tarteaucitron.fallback(['ferank-publicite'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.addScript('//static.ferank.fr/publicite.async.js');
    if (tarteaucitron.isAjax === true) {
      if (typeof ferankReady === 'function') {
        ferankReady();
      }
    }
  },
  key: 'ferankpub',
  name: 'FERank (pub)',
  needConsent: false,
  type: 'ads',
  uri: 'https://www.ferank.fr/respect-vie-privee/#regiepublicitaire',
};

// get+
tarteaucitron.services.getplus = {
  cookies: ['_first_pageview', '_jsuid', 'no_trackyy_' + tarteaucitron.user.getplusId, '_eventqueue'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.getplusId === undefined) {
      return;
    }

    window.webleads_site_ids = window.webleads_site_ids || [];
    window.webleads_site_ids.push(tarteaucitron.user.getplusId);
    tarteaucitron.addScript('//stats.webleads-tracker.com/js');
  },
  key: 'getplus',
  name: 'Get+',
  needConsent: true,
  type: 'analytic',
  uri: 'http://www.getplus.fr/Conditions-generales-de-vente_a226.html',
};

// google+
tarteaucitron.services.gplus = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'gplus';
    tarteaucitron.fallback(['g-plus', 'g-plusone'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.addScript('https://apis.google.com/js/platform.js');
  },
  key: 'gplus',
  name: 'Google+',
  needConsent: true,
  type: 'social',
  uri: 'https://policies.google.com/privacy',
};

// google+ badge
tarteaucitron.services.gplusbadge = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'gplusbadge';
    tarteaucitron.fallback(['g-page', 'g-person'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.addScript('https://apis.google.com/js/platform.js');
  },
  key: 'gplusbadge',
  name: 'Google+ (badge)',
  needConsent: true,
  type: 'social',
  uri: 'https://policies.google.com/privacy',
};

// google adsense
tarteaucitron.services.adsense = {
  cookies: ['__gads'],
  fallback: function () {
    'use strict';
    var id = 'adsense';
    tarteaucitron.fallback(['adsbygoogle'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.addScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
  },
  key: 'adsense',
  name: 'Google Adsense',
  needConsent: true,
  readmoreLink: 'https://policies.google.com/technologies/partner-sites',
  type: 'ads',
  uri: 'https://adssettings.google.com/',
};


// google adsense automatic
tarteaucitron.services.adsenseauto = {
  cookies: ['__gads'],
  js: function () {
    'use strict';

    if (tarteaucitron.user.adsensecapub === undefined) {
      return;
    }
    tarteaucitron.addScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + tarteaucitron.user.adsensecapub, '', '', '', 'crossorigin', 'anonymous');
  },
  key: 'adsenseauto',
  name: 'Google Adsense Automatic',
  needConsent: true,
  readmoreLink: 'https://policies.google.com/technologies/partner-sites',
  type: 'ads',
  uri: 'https://adssettings.google.com/',
};

// Google Adsense Search
tarteaucitron.services.adsensesearch = {
  cookies: ['__gads'],
  fallback: function () {
    'use strict';
    var id = 'adsensesearch';
    tarteaucitron.fallback(['afscontainer1'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.addScript('https://www.google.com/adsense/search/ads.js');
  },
  key: 'adsensesearch',
  name: 'Google Adsense Search',
  needConsent: true,
  readmoreLink: 'https://policies.google.com/technologies/partner-sites',
  type: 'ads',
  uri: 'https://adssettings.google.com/',
};

// google partners badge
tarteaucitron.services.googlepartners = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'googlepartners';
    tarteaucitron.fallback(['g-partnersbadge'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.addScript('https://apis.google.com/js/platform.js');
  },
  key: 'googlepartners',
  name: 'Google Partners Badge',
  needConsent: true,
  type: 'ads',
  uri: 'https://adssettings.google.com/',
};

// google adsense search (form)
tarteaucitron.services.adsensesearchform = {
  cookies: [],
  js: function () {
    'use strict';
    tarteaucitron.addScript('//www.google.com/coop/cse/brand?form=cse-search-box&lang=' + tarteaucitron.getLanguage());
  },
  key: 'adsensesearchform',
  name: 'Google Adsense Search (form)',
  needConsent: true,
  type: 'ads',
  uri: 'https://adssettings.google.com/',
};

// google adsense search (result)
tarteaucitron.services.adsensesearchresult = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'adsensesearchresult';

    if (document.getElementById('gcse_searchresults')) {
      document.getElementById('gcse_searchresults').innerHTML = tarteaucitron.engage(id);
    }
  },
  js: function () {
    'use strict';
    if (tarteaucitron.user.adsensesearchresultCx === undefined) {
      return;
    }
    tarteaucitron.addScript('//www.google.com/cse/cse.js?cx=' + tarteaucitron.user.adsensesearchresultCx);
  },
  key: 'adsensesearchresult',
  name: 'Google Adsense Search (result)',
  needConsent: true,
  type: 'ads',
  uri: 'https://adssettings.google.com/',
};

// googleadwordsconversion
tarteaucitron.services.googleadwordsconversion = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.adwordsconversionId === undefined) {
      return;
    }

    tarteaucitron.addScript('//www.googleadservices.com/pagead/conversion_async.js', '', function () {
      window.google_trackConversion({
        google_conversion_color: tarteaucitron.user.adwordsconversionColor,
        google_conversion_currency: tarteaucitron.user.adwordsconversionCurrency,
        google_conversion_format: tarteaucitron.user.adwordsconversionFormat,
        google_conversion_id: tarteaucitron.user.adwordsconversionId,
        google_conversion_label: tarteaucitron.user.adwordsconversionLabel,
        google_conversion_language: tarteaucitron.user.adwordsconversionLanguage,
        google_conversion_value: tarteaucitron.user.adwordsconversionValue,
        google_custom_params: {
          parameter1: tarteaucitron.user.adwordsconversionCustom1,
          parameter2: tarteaucitron.user.adwordsconversionCustom2,
        },
      });
    });
  },
  key: 'googleadwordsconversion',
  name: 'Google Adwords (conversion)',
  needConsent: true,
  type: 'ads',
  uri: 'https://www.google.com/settings/ads',
};

// googleadwordsremarketing
tarteaucitron.services.googleadwordsremarketing = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.adwordsremarketingId === undefined) {
      return;
    }

    tarteaucitron.addScript('//www.googleadservices.com/pagead/conversion_async.js', '', function () {
      window.google_trackConversion({
        google_conversion_id: tarteaucitron.user.adwordsremarketingId,
        google_remarketing_only: true,
      });
    });
  },
  key: 'googleadwordsremarketing',
  name: 'Google Adwords (remarketing)',
  needConsent: true,
  type: 'ads',
  uri: 'https://www.google.com/settings/ads',
};

// google analytics (old)
tarteaucitron.services.gajs = {
  cookies: (function () {
    var googleIdentifier = tarteaucitron.user.gajsUa,
      tagUaCookie = '_gat_gtag_' + googleIdentifier,
      tagGCookie = '_ga_' + googleIdentifier;

    tagUaCookie = tagUaCookie.replace(/-/g, '_');
    tagGCookie = tagGCookie.replace(/G-/g, '');

    return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
  })(),
  js: function () {
    'use strict';
    window._gaq = window._gaq || [];
    window._gaq.push(['_setAccount', tarteaucitron.user.gajsUa]);
    if (timeExpire !== undefined) {
      _gaq.push(['_setVisitorCookieTimeout', timeExpire]);
    }

    if (tarteaucitron.user.gajsAnonymizeIp) {
      window._gaq.push(['_gat._anonymizeIp']);
    }

    if (tarteaucitron.user.gajsPageView) {
      window._gaq.push(['_trackPageview, ' + tarteaucitron.user.gajsPageView]);
    } else {
      window._gaq.push(['_trackPageview']);
    }

    tarteaucitron.addScript('//www.google-analytics.com/ga.js', '', function () {
      if (typeof tarteaucitron.user.gajsMore === 'function') {
        tarteaucitron.user.gajsMore();
      }
    });
  },
  key: 'gajs',
  name: 'Google Analytics (ga.js)',
  needConsent: true,
  type: 'analytic',
  uri: 'https://policies.google.com/privacy',
};

// google analytics
tarteaucitron.services.analytics = {
  cookies: (function () {
    var googleIdentifier = tarteaucitron.user.analyticsUa,
      tagUaCookie = '_gat_gtag_' + googleIdentifier,
      tagGCookie = '_ga_' + googleIdentifier;

    tagUaCookie = tagUaCookie.replace(/-/g, '_');
    tagGCookie = tagGCookie.replace(/G-/g, '');

    return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
  })(),
  js: function () {
    'use strict';
    window.GoogleAnalyticsObject = 'ga';
    window.ga = window.ga || function () {
      window.ga.q = window.ga.q || [];
      window.ga.q.push(arguments);
    };
    window.ga.l = new Date();
    tarteaucitron.addScript('https://www.google-analytics.com/analytics.js', '', function () {
      var uaCreate = { cookieExpires: (timeExpire !== undefined) ? timeExpire : 34128000 };
      tarteaucitron.extend(uaCreate, tarteaucitron.user.analyticsUaCreate || {});
      ga('create', tarteaucitron.user.analyticsUa, uaCreate);

      if (tarteaucitron.user.analyticsAnonymizeIp) {
        ga('set', 'anonymizeIp', true);
      }

      if (typeof tarteaucitron.user.analyticsPrepare === 'function') {
        tarteaucitron.user.analyticsPrepare();
      }

      if (tarteaucitron.user.analyticsPageView) {
        ga('send', 'pageview', tarteaucitron.user.analyticsPageView);
      } else {
        ga('send', 'pageview');
      }

      if (typeof tarteaucitron.user.analyticsMore === 'function') {
        tarteaucitron.user.analyticsMore();
      }
    });
  },
  key: 'analytics',
  name: 'Google Analytics (universal)',
  needConsent: true,
  type: 'analytic',
  uri: 'https://policies.google.com/privacy',
};

// google ads
tarteaucitron.services.googleads = {
  cookies: (function () {
    var googleIdentifier = tarteaucitron.user.googleadsId,
      tagUaCookie = '_gat_gtag_' + googleIdentifier,
      tagGCookie = '_ga_' + googleIdentifier;

    tagUaCookie = tagUaCookie.replace(/-/g, '_');
    tagGCookie = tagGCookie.replace(/G-/g, '');

    return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
  })(),
  js: function () {
    'use strict';
    window.dataLayer = window.dataLayer || [];
    tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + tarteaucitron.user.googleadsId, '', function () {
      window.gtag = function gtag() { dataLayer.push(arguments); };
      gtag('js', new Date());
      var additional_config_info = (timeExpire !== undefined) ? { anonymize_ip: true, cookie_expires: timeExpire / 1000 } : { anonymize_ip: true };

      gtag('config', tarteaucitron.user.googleadsId, additional_config_info);

      if (typeof tarteaucitron.user.googleadsMore === 'function') {
        tarteaucitron.user.googleadsMore();
      }
    });
  },
  key: 'googleads',
  name: 'Google Ads',
  needConsent: true,
  type: 'ads',
  uri: 'https://policies.google.com/privacy',
};

// google analytics
tarteaucitron.services.gtag = {
  cookies: (function () {
    var googleIdentifier = tarteaucitron.user.gtagUa,
      tagUaCookie = '_gat_gtag_' + googleIdentifier,
      tagGCookie = '_ga_' + googleIdentifier;

    tagUaCookie = tagUaCookie.replace(/-/g, '_');
    tagGCookie = tagGCookie.replace(/G-/g, '');

    return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
  })(),
  js: function () {
    'use strict';
    window.dataLayer = window.dataLayer || [];
    tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + tarteaucitron.user.gtagUa, '', function () {
      window.gtag = function gtag() { dataLayer.push(arguments); };
      gtag('js', new Date());
      var additional_config_info = (timeExpire !== undefined) ? { anonymize_ip: true, cookie_expires: timeExpire / 1000 } : { anonymize_ip: true };

      if (tarteaucitron.user.gtagCrossdomain) {
        /**
                 * https://support.google.com/analytics/answer/7476333?hl=en
                 * https://developers.google.com/analytics/devguides/collection/gtagjs/cross-domain
                 */
        gtag('config', tarteaucitron.user.gtagUa, additional_config_info, { linker: { domains: tarteaucitron.user.gtagCrossdomain } });
      } else {
        gtag('config', tarteaucitron.user.gtagUa, additional_config_info);
      }

      if (typeof tarteaucitron.user.gtagMore === 'function') {
        tarteaucitron.user.gtagMore();
      }
    });
  },
  key: 'gtag',
  name: 'Google Analytics (GA4)',
  needConsent: true,
  type: 'analytic',
  uri: 'https://policies.google.com/privacy',
};

tarteaucitron.services.firebase = {
  cookies: (function () {
    var googleIdentifier = tarteaucitron.user.firebaseMeasurementId,
      tagGCookie = '_ga_' + googleIdentifier;

    tagGCookie = tagGCookie.replace(/G-/g, '');

    return ['_ga', tagGCookie];
  })(),
  js: function () {
    'use strict';

    if (tarteaucitron.user.firebaseApiKey === undefined) {
      return;
    }

    tarteaucitron.addScript('https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js', '', function () {
      tarteaucitron.addScript('https://www.gstatic.com/firebasejs/8.6.2/firebase-analytics.js', '', function () {

        var firebaseConfig = {
          apiKey: tarteaucitron.user.firebaseApiKey,
          appId: tarteaucitron.user.firebaseAppId,
          authDomain: tarteaucitron.user.firebaseAuthDomain,
          databaseURL: tarteaucitron.user.firebaseDatabaseUrl,
          measurementId: tarteaucitron.user.firebaseMeasurementId,
          projectId: tarteaucitron.user.firebaseProjectId,
          storageBucket: tarteaucitron.user.firebaseStorageBucket,
        };
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
      });
    });
  },
  key: 'firebase',
  name: 'Firebase',
  needConsent: true,
  type: 'analytic',
  uri: 'https://firebase.google.com/support/privacy',
};

// genially
tarteaucitron.services.genially = {
  cookies: ['_gat', '_ga', '_gid'],
  fallback: function () {
    'use strict';
    var id = 'genially';
    tarteaucitron.fallback(['tac_genially'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';

    tarteaucitron.fallback(['tac_genially'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'genially iframe'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height'),
        geniallyid = x.getAttribute('geniallyid'),
        allowfullscreen = x.getAttribute('allowfullscreen');

      return '<div style="position: relative; padding-bottom: 109.00%; padding-top: 0; height: 0;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" title="' + frame_title + '" src="https://view.genial.ly/' + geniallyid + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe></div>';
    });
  },
  key: 'genially',
  name: 'genially',
  needConsent: true,
  type: 'api',
  uri: 'https://www.genial.ly/cookies',
};

// google maps
tarteaucitron.services.googlemaps = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'googlemaps';
    tarteaucitron.fallback(['googlemaps-canvas'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    var mapOptions,
      map,
      uniqIds = [],
      i;

    if (tarteaucitron.user.mapscallback === undefined) {
      tarteaucitron.user.mapscallback = 'tac_googlemaps_callback';
    }

    // Add Google Maps libraries if any (https://developers.google.com/maps/documentation/javascript/libraries)
    var googleMapsLibraries = '';
    if (tarteaucitron.user.googlemapsLibraries) {
      googleMapsLibraries = '&libraries=' + tarteaucitron.user.googlemapsLibraries;
    }

    tarteaucitron.addScript('//maps.googleapis.com/maps/api/js?v=3.exp&key=' + tarteaucitron.user.googlemapsKey + '&callback=' + tarteaucitron.user.mapscallback + googleMapsLibraries);

    window.tac_googlemaps_callback = function () {
      tarteaucitron.fallback(['googlemaps-canvas'], function (x) {
        var uniqId = '_' + Math.random().toString(36).substr(2, 9);
        uniqIds.push(uniqId);
        return '<div id="' + uniqId + '" zoom="' + x.getAttribute('zoom') + '" latitude="' + x.getAttribute('latitude') + '" longitude="' + x.getAttribute('longitude') + '" style="width:' + x.offsetWidth + 'px;height:' + x.offsetHeight + 'px"></div>';
      });

      var i;
      for (i = 0; i < uniqIds.length; i += 1) {
        mapOptions = {
          center: new google.maps.LatLng(parseFloat(document.getElementById(uniqIds[i]).getAttribute('latitude'), 10), parseFloat(document.getElementById(uniqIds[i]).getAttribute('longitude'), 10)),
          zoom: parseInt(document.getElementById(uniqIds[i]).getAttribute('zoom'), 10),
        };
        map = new google.maps.Map(document.getElementById(uniqIds[i]), mapOptions);
        new google.maps.Marker({ map: map, position: { lat: parseFloat(document.getElementById(uniqIds[i]).getAttribute('latitude'), 10), lng: parseFloat(document.getElementById(uniqIds[i]).getAttribute('longitude'), 10) } });
      }
    };
  },
  key: 'googlemaps',
  name: 'Google Maps',
  needConsent: true,
  type: 'api',
  uri: 'https://policies.google.com/privacy',
};

// googlemaps search
tarteaucitron.services.googlemapssearch = {
  cookies: ['nid'],
  fallback: function () {
    'use strict';
    var id = 'googlemapssearch';
    tarteaucitron.fallback(['googlemapssearch'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['googlemapssearch'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Google search iframe'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height'),
        // url = x.getAttribute("data-url");
        query = escape(x.getAttribute('data-search')),
        key = x.getAttribute('data-api-key');

      return '<iframe title="' + frame_title + '" width="' + width + '" height="' + height + '" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=' + query + '&key=' + key + '" allowfullscreen></iframe> ';
    });
  },
  key: 'googlemapssearch',
  name: 'Google Maps Search API',
  needConsent: true,
  type: 'api',
  uri: 'https://policies.google.com/privacy',
};

// googlemaps embed iframe
tarteaucitron.services.googlemapsembed = {
  cookies: ['apisid', 'hsid', 'nid', 'sapisid', 'sid', 'sidcc', 'ssid', '1p_jar'],
  fallback: function () {
    'use strict';
    var id = 'googlemapsembed';
    tarteaucitron.fallback(['googlemapsembed'], function (elem) {
      elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
      elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['googlemapsembed'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Google maps iframe'),
        width = tarteaucitron.getElemWidth(x),
        height = tarteaucitron.getElemHeight(x),
        url = x.getAttribute('data-url');

      return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency allowfullscreen></iframe>';
    });
  },
  key: 'googlemapsembed',
  name: 'Google Maps Embed',
  needConsent: true,
  type: 'api',
  uri: 'https://policies.google.com/privacy',
};


// openstreetmap embed iframe
tarteaucitron.services.openstreetmap = {
  cookies: ['apisid', 'hsid', 'nid', 'sapisid', 'sid', 'sidcc', 'ssid', '1p_jar'],
  fallback: function () {
    'use strict';
    var id = 'openstreetmap';
    tarteaucitron.fallback(['openstreetmap'], function (elem) {
      elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
      elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['openstreetmap'], function (x) {
      var width = tarteaucitron.getElemWidth(x),
        height = tarteaucitron.getElemHeight(x),
        url = x.getAttribute('data-url');

      return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" allowfullscreen></iframe>';
    });
  },
  key: 'openstreetmap',
  name: 'Openstreetmap Embed',
  needConsent: true,
  type: 'api',
  uri: 'https://wiki.osmfoundation.org/wiki/Privacy_Policy#Cookies',
};

// geoportail embed iframe
tarteaucitron.services.geoportail = {
  cookies: ['apisid', 'hsid', 'nid', 'sapisid', 'sid', 'sidcc', 'ssid', '1p_jar'],
  fallback: function () {
    'use strict';
    var id = 'geoportail';
    tarteaucitron.fallback(['geoportail'], function (elem) {
      elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
      elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['geoportail'], function (x) {
      var width = tarteaucitron.getElemWidth(x),
        height = tarteaucitron.getElemHeight(x),
        url = x.getAttribute('data-url');

      return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" sandbox="allow-forms allow-scripts allow-same-origin" allowfullscreen></iframe>';
    });
  },
  key: 'geoportail',
  name: 'Geoportail maps Embed',
  needConsent: true,
  type: 'api',
  uri: 'https://www.ign.fr/institut/gestion-des-cookies',
};


// google tag manager
tarteaucitron.services.googletagmanager = {
  cookies: ['_ga', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '__gads', '_drt_', 'FLC', 'exchange_uid', 'id', 'fc', 'rrs', 'rds', 'rv', 'uid', 'UIDR', 'UID', 'clid', 'ipinfo', 'acs'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.googletagmanagerId === undefined) {
      return;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'gtm.js',
      'gtm.start': new Date().getTime(),
    });
    tarteaucitron.addScript('https://www.googletagmanager.com/gtm.js?id=' + tarteaucitron.user.googletagmanagerId);
  },
  key: 'googletagmanager',
  name: 'Google Tag Manager',
  needConsent: true,
  type: 'api',
  uri: 'https://policies.google.com/privacy',
};

// google tag manager multiple
tarteaucitron.services.multiplegoogletagmanager = {
  cookies: ['_ga', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '__gads', '_drt_', 'FLC', 'exchange_uid', 'id', 'fc', 'rrs', 'rds', 'rv', 'uid', 'UIDR', 'UID', 'clid', 'ipinfo', 'acs'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.multiplegoogletagmanagerId === undefined) {
      return;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'gtm.js',
      'gtm.start': new Date().getTime(),
    });

    tarteaucitron.user.multiplegoogletagmanagerId.forEach(function (id) {
      tarteaucitron.addScript('https://www.googletagmanager.com/gtm.js?id=' + id);
    });

  },
  key: 'multiplegoogletagmanager',
  name: 'Google Tag Manager',
  needConsent: true,
  type: 'api',
  uri: 'https://policies.google.com/privacy',
};

// google webfonts
tarteaucitron.services.googlefonts = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.googleFonts === undefined) {
      return;
    }
    tarteaucitron.addScript('//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', '', function () {
      WebFont.load({
        google: {
          families: tarteaucitron.user.googleFonts,
        },
      });
    });
  },
  key: 'googlefonts',
  name: 'Google Webfonts',
  needConsent: true,
  type: 'api',
  uri: 'https://policies.google.com/privacy',
};

// hubspot
tarteaucitron.services.hubspot = {
  cookies: ['hubspotutk', 'fr', '__hstc', '__hssrc', '__hssc', '__cfduid'],
  js: function () {
    'use strict';
    tarteaucitron.addScript('//js.hs-scripts.com/' + tarteaucitron.user.hubspotId + '.js', 'hs-script-loader');
  },
  key: 'hubspot',
  name: 'Hubspot',
  needConsent: true,
  type: 'analytic',
  uri: 'https://legal.hubspot.com/privacy-policy',
};

// instagram
tarteaucitron.services.instagram = {
  cookies: ['shbts', 'sessionid', 'csrftoken', 'rur', 'shbid', 'mid', 'ds_usr_id', 'ig_did', 'ig_cb', 'datr'],
  fallback: function () {
    'use strict';
    var id = 'instagram';
    tarteaucitron.fallback(['instagram_post'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['instagram_post'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Instagram iframe'),
        post_id = x.getAttribute('postId'),
        post_permalink = x.getAttribute('data-instgrm-permalink'),
        embed_width = x.getAttribute('width'),
        embed_height = x.getAttribute('height'),
        frame_width,
        frame_height,
        post_frame;

      if (post_permalink != null) {
        tarteaucitron.addScript('//www.instagram.com/embed.js', 'instagram-embed');

        return '';
      }

      if (post_id === undefined) {
        return '';
      }

      if (embed_width !== undefined) {
        frame_width = 'width="' + embed_width + '" ';
      } else {
        frame_width = '"" ';
      }
      if (embed_height !== undefined) {
        frame_height = 'height="' + embed_height + '" ';
      } else {
        frame_height = '"" ';
      }

      post_frame = '<iframe title="' + frame_title + '" src="//www.instagram.com/' + post_id + '/embed" ' + frame_width + frame_height + '></iframe>';

      return post_frame;
    });
  },
  key: 'instagram',
  name: 'Instagram',
  needConsent: true,
  type: 'social',
  uri: 'https://www.instagram.com/legal/privacy/',
};

// jsapi
tarteaucitron.services.jsapi = {
  cookies: [],
  js: function () {
    'use strict';
    tarteaucitron.addScript('//www.google.com/jsapi');
  },
  key: 'jsapi',
  name: 'Google jsapi',
  needConsent: true,
  type: 'api',
  uri: 'https://policies.google.com/privacy',
};

// twitterwidgetsapi
tarteaucitron.services.twitterwidgetsapi = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'twitterwidgetsapi';
    tarteaucitron.fallback(['tacTwitterAPI'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['tacTwitterAPI'], '');
    tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
  },
  key: 'twitterwidgetsapi',
  name: 'Twitter Widgets API',
  needConsent: true,
  type: 'api',
  uri: 'https://support.twitter.com/articles/20170514',
};

// recaptcha
tarteaucitron.services.recaptcha = {
  cookies: ['nid'],
  fallback: function () {
    'use strict';
    var id = 'recaptcha';
    tarteaucitron.fallback(['g-recaptcha'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    window.tacRecaptchaOnLoad = tarteaucitron.user.recaptchaOnLoad || function () { };
    tarteaucitron.fallback(['g-recaptcha'], '');

    if (tarteaucitron.user.recaptchaapi === undefined) {
      tarteaucitron.addScript('https://www.google.com/recaptcha/api.js?onload=tacRecaptchaOnLoad');
    } else {
      tarteaucitron.addScript('https://www.google.com/recaptcha/api.js?onload=tacRecaptchaOnLoad&render=' + tarteaucitron.user.recaptchaapi);
    }

  },
  key: 'recaptcha',
  name: 'reCAPTCHA',
  needConsent: true,
  type: 'api',
  uri: 'https://policies.google.com/privacy',
};

// linkedin
tarteaucitron.services.linkedin = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'linkedin';
    tarteaucitron.fallback(['tacLinkedin'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['tacLinkedin'], '');
    tarteaucitron.addScript('//platform.linkedin.com/in.js');
    if (tarteaucitron.isAjax === true) {
      if (typeof IN !== 'undefined') {
        IN.parse();
      }
    }
  },
  key: 'linkedin',
  name: 'Linkedin',
  needConsent: true,
  type: 'social',
  uri: 'https://www.linkedin.com/legal/cookie_policy',
};

// mautic
tarteaucitron.services.mautic = {
  cookies: ['mtc_id', 'mtc_sid'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.mauticurl === undefined) {
      return;
    }

    window.MauticTrackingObject = 'mt';
    window.mt = window.mt || function () {
      window.mt.q = window.mt.q || [];
      window.mt.q.push(arguments);
    };

    tarteaucitron.addScript(tarteaucitron.user.mauticurl, '', function () {
      mt('send', 'pageview');
    });
  },
  key: 'mautic',
  name: 'Mautic',
  needConsent: true,
  type: 'analytic',
  uri: 'https://www.mautic.org/privacy-policy/',
};

// microsoftcampaignanalytics
tarteaucitron.services.microsoftcampaignanalytics = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.microsoftcampaignanalyticsUUID === undefined) {
      return;
    }

    tarteaucitron.addScript('//flex.atdmt.com/mstag/site/' + tarteaucitron.user.microsoftcampaignanalyticsUUID + '/mstag.js', 'mstag_tops', function () {
      window.mstag = { loadTag: function () { }, time: (new Date()).getTime() };
      window.mstag.loadTag('analytics', { actionid: tarteaucitron.user.microsoftcampaignanalyticsactionId, dedup: '1', domainId: tarteaucitron.user.microsoftcampaignanalyticsdomainId, type: '1' });
    });
  },
  key: 'microsoftcampaignanalytics',
  name: 'Microsoft Campaign Analytics',
  needConsent: true,
  type: 'analytic',
  uri: 'https://privacy.microsoft.com/privacystatement/',
};

// onesignal
tarteaucitron.services.onesignal = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.onesignalAppId === undefined) {
      return;
    }
    window.OneSignal = window.OneSignal || [];

    window.OneSignal.push(function () {
      window.OneSignal.init({
        appId: tarteaucitron.user.onesignalAppId,
      });
    });

    tarteaucitron.addScript('https://cdn.onesignal.com/sdks/OneSignalSDK.js');
  },
  key: 'onesignal',
  name: 'OneSignal',
  needConsent: true,
  type: 'api',
  uri: 'https://onesignal.com/privacy_policy',
};

// pinterest
tarteaucitron.services.pinterest = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'pinterest';
    tarteaucitron.fallback(['tacPinterest'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['tacPinterest'], '');
    tarteaucitron.addScript('//assets.pinterest.com/js/pinit.js');
  },
  key: 'pinterest',
  name: 'Pinterest',
  needConsent: true,
  type: 'social',
  uri: 'https://about.pinterest.com/privacy-policy',
};

// prelinker
tarteaucitron.services.prelinker = {
  cookies: ['_sp_id.32f5', '_sp_ses.32f5'],
  fallback: function () {
    'use strict';
    var id = 'prelinker';
    tarteaucitron.fallback(['prelinker-canvas'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    var uniqIds = [],
      i,
      uri;

    tarteaucitron.fallback(['prelinker-canvas'], function (x) {
      var uniqId = '_' + Math.random().toString(36).substr(2, 9);
      uniqIds.push(uniqId);
      return '<div id="' + uniqId + '" siteId="' + x.getAttribute('siteId') + '" bannerId="' + x.getAttribute('bannerId') + '" defaultLanguage="' + x.getAttribute('defaultLanguage') + '" tracker="' + x.getAttribute('tracker') + '"></div>';
    });

    for (i = 0; i < uniqIds.length; i += 1) {
      uri = 'http://promo.easy-dating.org/banner/index?';
      uri += 'site_id=' + document.getElementById(uniqIds[i]).getAttribute('siteId') + '&';
      uri += 'banner_id=' + document.getElementById(uniqIds[i]).getAttribute('bannerId') + '&';
      uri += 'default_language=' + document.getElementById(uniqIds[i]).getAttribute('defaultLanguage') + '&';
      uri += 'tr4ck=' + document.getElementById(uniqIds[i]).getAttribute('trackrt');

      tarteaucitron.makeAsync.init(uri, uniqIds[i]);
    }
  },
  key: 'prelinker',
  name: 'Prelinker',
  needConsent: true,
  type: 'ads',
  uri: 'http://www.prelinker.com/index/index/cgu/',
};

// prezi
tarteaucitron.services.prezi = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'prezi';
    tarteaucitron.fallback(['prezi-canvas'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['prezi-canvas'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Prezi iframe'),
        id = x.getAttribute('data-id'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height'),
        url = 'https://prezi.com/embed/' + id + '/?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0';

      return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency allowfullscreen></iframe>';
    });
  },
  key: 'prezi',
  name: 'Prezi',
  needConsent: true,
  type: 'video',
  uri: 'https://prezi.com/privacy-policy/',
};

// pubdirecte
tarteaucitron.services.pubdirecte = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'pubdirecte';
    tarteaucitron.fallback(['pubdirecte-canvas'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    var uniqIds = [],
      i,
      uri;

    tarteaucitron.fallback(['pubdirecte-canvas'], function (x) {
      var uniqId = '_' + Math.random().toString(36).substr(2, 9);
      uniqIds.push(uniqId);
      return '<div id="' + uniqId + '" pid="' + x.getAttribute('pid') + '" ref="' + x.getAttribute('ref') + '"></div>';
    });

    for (i = 0; i < uniqIds.length; i += 1) {
      uri = '//www.pubdirecte.com/script/banniere.php?';
      uri += 'id=' + document.getElementById(uniqIds[i]).getAttribute('pid') + '&';
      uri += 'ref=' + document.getElementById(uniqIds[i]).getAttribute('ref');

      tarteaucitron.makeAsync.init(uri, uniqIds[i]);
    }
  },
  key: 'pubdirecte',
  name: 'Pubdirecte',
  needConsent: true,
  type: 'ads',
  uri: 'http://pubdirecte.com/contact.php',
};

// purechat
tarteaucitron.services.purechat = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.purechatId === undefined) {
      return;
    }

    tarteaucitron.addScript('//app.purechat.com/VisitorWidget/WidgetScript', '', function () {
      try {
        window.w = new PCWidget({ c: tarteaucitron.user.purechatId, f: true });
      } catch (e) { }
    });
  },
  key: 'purechat',
  name: 'PureChat',
  needConsent: true,
  type: 'support',
  uri: 'https://www.purechat.com/privacy',
};

// Intercom
tarteaucitron.services.intercomChat = {
  cookies: [
    'intercom-id-' + tarteaucitron.user.intercomKey,
    'intercom-session-' + tarteaucitron.user.intercomKey,
  ],
  fallback: function () {
    'use strict';
    var id = 'intercomChat';
    tarteaucitron.fallback(
      ['intercom-chat'],
      function () {
        // Execute callback if function `intercomChatDisable`
        // is defined
        if (typeof intercomChatDisable === 'function') {
          intercomChatDisable();
        }
        return tarteaucitron.engage(id);
      },
    );
  },
  js: function () {
    window.intercomSettings = {
      app_id: tarteaucitron.user.intercomKey,
    };

    var w = window;
    var ic = w.Intercom;
    if (typeof ic === 'function') {
      ic('reattach_activator');
      ic('update', w.intercomSettings);
    } else {
      var i = function () {
        i.c(arguments);
      };
      i.q = [];
      i.c = function (args) {
        i.q.push(args);
      };
      w.Intercom = i;
      tarteaucitron.addScript(
        'https://widget.intercom.io/widget/' + tarteaucitron.user.intercomKey,
        '',
        function () {
          // Execute callback if function `intercomChatEnable`
          // is defined
          if (typeof intercomChatEnable === 'function') {
            intercomChatEnable();
          }
        },
      );
    }
  },
  key: 'intercomChat',
  name: 'Intercom',
  needConsent: true,
  readmoreLink: 'https://www.intercom.com/legal/privacy',
  type: 'support',
  uri: 'https://www.intercom.com/',
};

// rumbletalk
tarteaucitron.services.rumbletalk = {
  cookies: ['AWSALB'],
  fallback: function () {
    'use strict';
    var id = 'rumbletalk';
    tarteaucitron.fallback(['rumbletalk'], function (elem) {
      elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
      elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';

      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    if (tarteaucitron.user.rumbletalkid === undefined) {
      return;
    }

    tarteaucitron.addScript('https://rumbletalk.com/client/?' + tarteaucitron.user.rumbletalkid);

    tarteaucitron.fallback(['rumbletalk'], function (x) {
      var width = tarteaucitron.getElemWidth(x),
        height = tarteaucitron.getElemHeight(x),
        id = x.getAttribute('data-id');

      return '<div style="height: ' + height + 'px; width: ' + width + 'px;"><div id="' + id + '"></div></div>';
    });
  },
  key: 'rumbletalk',
  name: 'RumbleTalk',
  needConsent: true,
  type: 'social',
};

// shareaholic
tarteaucitron.services.shareaholic = {
  cookies: ['__utma', '__utmb', '__utmc', '__utmz', '__utmt_Shareaholic%20Pageviews'],
  fallback: function () {
    'use strict';
    var id = 'shareaholic';
    tarteaucitron.fallback(['shareaholic-canvas'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    if (tarteaucitron.user.shareaholicSiteId === undefined) {
      return;
    }

    tarteaucitron.fallback(['shareaholic-canvas'], '');
    tarteaucitron.addScript('//dsms0mj1bbhn4.cloudfront.net/assets/pub/shareaholic.js', '', function () {
      try {
        Shareaholic.init(tarteaucitron.user.shareaholicSiteId);
      } catch (e) { }
    });
  },
  key: 'shareaholic',
  name: 'Shareaholic',
  needConsent: true,
  type: 'social',
  uri: 'https://shareaholic.com/privacy/choices',
};

// shareasale
tarteaucitron.services.shareasale = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'shareasale';
    tarteaucitron.fallback(['shareasale-canvas'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    var uniqIds = [],
      i,
      uri;

    tarteaucitron.fallback(['shareasale-canvas'], function (x) {
      var uniqId = '_' + Math.random().toString(36).substr(2, 9);
      uniqIds.push(uniqId);
      return '<div id="' + uniqId + '" amount="' + x.getAttribute('amount') + '" tracking="' + x.getAttribute('tracking') + '" transtype="' + x.getAttribute('transtype') + '" persale="' + x.getAttribute('persale') + '" perlead="' + x.getAttribute('perlead') + '" perhit="' + x.getAttribute('perhit') + '" merchantID="' + x.getAttribute('merchantID') + '"></div>';
    });

    for (i = 0; i < uniqIds.length; i += 1) {
      uri = 'https://shareasale.com/sale.cfm?';
      uri += 'amount=' + document.getElementById(uniqIds[i]).getAttribute('amount') + '&';
      uri += 'tracking=' + document.getElementById(uniqIds[i]).getAttribute('tracking') + '&';
      uri += 'transtype=' + document.getElementById(uniqIds[i]).getAttribute('transtype') + '&';
      uri += 'persale=' + document.getElementById(uniqIds[i]).getAttribute('persale') + '&';
      uri += 'perlead=' + document.getElementById(uniqIds[i]).getAttribute('perlead') + '&';
      uri += 'perhit=' + document.getElementById(uniqIds[i]).getAttribute('perhit') + '&';
      uri += 'merchantID=' + document.getElementById(uniqIds[i]).getAttribute('merchantID');

      document.getElementById(uniqIds[i]).innerHTML = '<img src=\'' + uri + '\' width=\'1\' height=\'1\' />';
    }
  },
  key: 'shareasale',
  name: 'ShareASale',
  needConsent: true,
  type: 'ads',
  uri: 'https://www.shareasale.com/PrivacyPolicy.pdf',
};

// sharethis
tarteaucitron.services.sharethis = {
  cookies: ['__unam'],
  fallback: function () {
    'use strict';
    var id = 'sharethis';
    tarteaucitron.fallback(['tacSharethis'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    if (tarteaucitron.user.sharethisPublisher === undefined) {
      return;
    }
    var switchTo5x = true,
      uri = ('https:' === document.location.protocol ? 'https://ws' : 'http://w') + '.sharethis.com/button/buttons.js';

    tarteaucitron.fallback(['tacSharethis'], '');
    tarteaucitron.addScript(uri, '', function () {
      stLight.options({ doNotCopy: false, doNotHash: false, hashAddressBar: false, publisher: tarteaucitron.user.sharethisPublisher });
    });

    if (tarteaucitron.isAjax === true) {
      if (typeof stButtons !== 'undefined') {
        stButtons.locateElements();
      }
    }
  },
  key: 'sharethis',
  name: 'ShareThis',
  needConsent: true,
  type: 'social',
  uri: 'http://www.sharethis.com/legal/privacy/',
};

// slideshare
tarteaucitron.services.slideshare = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'slideshare';
    tarteaucitron.fallback(['slideshare-canvas'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['slideshare-canvas'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Slideshare iframe'),
        id = x.getAttribute('data-id'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height'),
        url = '//www.slideshare.net/slideshow/embed_code/' + id;

      return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency allowfullscreen></iframe>';
    });
  },
  key: 'slideshare',
  name: 'SlideShare',
  needConsent: true,
  type: 'video',
  uri: 'https://www.linkedin.com/legal/privacy-policy',
};

// soundcloud
tarteaucitron.services.soundcloud = {
  cookies: ['sc_anonymous_id', 'sclocale'],
  fallback: function () {
    'use strict';
    tarteaucitron.fallback(['soundcloud_player'], function (elem) {
      elem.style.height = elem.getAttribute('data-height') + 'px';
      return tarteaucitron.engage('soundcloud');
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['soundcloud_player'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Soundcloud iframe'),
        player_height = x.getAttribute('data-height'),
        frame_height = 'height="' + player_height + '" ',
        playable_id = x.getAttribute('data-playable-id'),
        playable_type = x.getAttribute('data-playable-type'),
        playable_url = x.getAttribute('data-playable-url'),
        color = x.getAttribute('data-color'),
        autoplay = x.getAttribute('data-auto-play'),
        hideRelated = x.getAttribute('data-hide-related'),
        showComments = x.getAttribute('data-show-comments'),
        showUser = x.getAttribute('data-show-user'),
        showReposts = x.getAttribute('data-show-reposts'),
        showTeaser = x.getAttribute('data-show-teaser'),
        visual = x.getAttribute('data-visual'),
        artwork = x.getAttribute('data-artwork');

      var allowAutoplay = autoplay === 'true' ? 'allow="autoplay"' : '';

      if (playable_id === undefined && playable_url === undefined) {
        return '';
      }

      // Allow to embed from API results (playable_type + playable_id)
      var qs = '?url=https%3A//api.soundcloud.com/' + playable_type + '/' + playable_id;
      // Or from raw URL from Soundcloud website
      if (playable_url && playable_url.length > 0) qs = '?url=' + escape(playable_url);

      if (hideRelated && hideRelated.length > 0) qs += '&hide_related=' + hideRelated;
      if (color && color.length > 0) qs += '&color=' + color.replace('#', '%23');
      if (autoplay && autoplay.length > 0) qs += '&auto_play=' + autoplay;
      if (showComments && showComments.length > 0) qs += '&show_comments=' + showComments;
      if (hideRelated && hideRelated.length > 0) qs += '&hide_related=' + hideRelated;
      if (showUser && showUser.length > 0) qs += '&show_user=' + showUser;
      if (showReposts && showReposts.length > 0) qs += '&show_reposts=' + showReposts;
      if (showTeaser && showTeaser.length > 0) qs += '&show_teaser=' + showTeaser;
      if (visual && visual.length > 0) qs += '&visual=' + visual;
      if (artwork && artwork.length > 0) qs += '&show_artwork=' + artwork;

      return '<iframe title="' + frame_title + '" width="100%" ' + frame_height + ' scrolling="no" ' + allowAutoplay + ' src="https://w.soundcloud.com/player/' + qs + '"></iframe>';
    });
  },
  key: 'soundcloud',
  name: 'SoundCloud',
  needConsent: true,
  type: 'video',
};

// spotify
tarteaucitron.services.spotify = {
  cookies: ['sp_landing', '_ga', 'sp_ab', 'sp_landingref', 'sp_t', 'sp_usid', 'OptanonConsent', 'sp_m', 'spot'],
  fallback: function () {
    'use strict';
    var id = 'spotify';
    tarteaucitron.fallback(['spotify_player'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['spotify_player'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Spotify iframe'),
        spotify_id = x.getAttribute('spotifyID'),
        spotify_width = x.getAttribute('width'),
        frame_width = 'width=',
        spotify_height = x.getAttribute('height'),
        frame_height = 'height=',
        spotify_frame;

      if (spotify_id === undefined) {
        return '';
      }
      if (spotify_width !== undefined) {
        frame_width += '"' + spotify_width + '" ';
      } else {
        frame_width += '"" ';
      }
      if (spotify_height !== undefined) {
        frame_height += '"' + spotify_height + '" ';
      } else {
        frame_height += '"" ';
      }
      spotify_frame = '<iframe title="' + frame_title + '" src="//open.spotify.com/embed/' + spotify_id + '" ' + frame_width + frame_height + ' allowfullscreen></iframe>';
      return spotify_frame;
    });
  },
  key: 'spotify',
  name: 'Spotify',
  needConsent: true,
  type: 'video',
  uri: 'https://www.spotify.com/us/legal/privacy-policy/',
};

// statcounter
tarteaucitron.services.statcounter = {
  cookies: ['sc_is_visitor_unique'],
  fallback: function () {
    'use strict';
    var id = 'statcounter';
    tarteaucitron.fallback(['statcounter-canvas'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    var uniqIds = [],
      i,
      uri = '//statcounter.com/counter/counter.js';

    tarteaucitron.fallback(['statcounter-canvas'], function (x) {
      var uniqId = '_' + Math.random().toString(36).substr(2, 9);
      uniqIds.push(uniqId);
      return '<div id="' + uniqId + '"></div>';
    });

    for (i = 0; i < uniqIds.length; i += 1) {
      tarteaucitron.makeAsync.init(uri, uniqIds[i]);
    }
  },
  key: 'statcounter',
  name: 'StatCounter',
  needConsent: true,
  type: 'analytic',
  uri: 'https://fr.statcounter.com/about/legal/#privacy',
};

// timelinejs
tarteaucitron.services.timelinejs = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'timelinejs';
    tarteaucitron.fallback(['timelinejs-canvas'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['timelinejs-canvas'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Twitter iframe'),
        spreadsheet_id = x.getAttribute('spreadsheet_id'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height'),
        lang = x.getAttribute('lang_2_letter'),
        font = x.getAttribute('font'),
        map = x.getAttribute('map'),
        start_at_end = x.getAttribute('start_at_end'),
        hash_bookmark = x.getAttribute('hash_bookmark'),
        start_at_slide = x.getAttribute('start_at_slide'),
        start_zoom = x.getAttribute('start_zoom'),
        url = '//cdn.knightlab.com/libs/timeline/latest/embed/index.html?source=' + spreadsheet_id + '&font=' + font + '&maptype=' + map + '&lang=' + lang + '&start_at_end=' + start_at_end + '&hash_bookmark=' + hash_bookmark + '&start_at_slide=' + start_at_slide + '&start_zoom_adjust=' + start_zoom + '&height=' + height;

      return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" allowtransparency allowfullscreen></iframe>';
    });
  },
  key: 'timelinejs',
  name: 'Timeline JS',
  needConsent: true,
  type: 'api',
  uri: 'http://timeline.knightlab.com/#help',
};

// tagcommander
tarteaucitron.services.tagcommander = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.tagcommanderid === undefined) {
      return;
    }
    tarteaucitron.addScript('https://cdn.tagcommander.com/' + tarteaucitron.user.tagcommanderid + '.js');
  },
  key: 'tagcommander',
  name: 'TagCommander',
  needConsent: true,
  type: 'api',
  uri: 'https://www.commandersact.com/en/privacy/',
};

// typekit
tarteaucitron.services.typekit = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.typekitId === undefined) {
      return;
    }
    tarteaucitron.addScript('//use.typekit.net/' + tarteaucitron.user.typekitId + '.js', '', function () {
      try {
        Typekit.load();
      } catch (e) { }
    });
  },
  key: 'typekit',
  name: 'Typekit (adobe)',
  needConsent: true,
  type: 'api',
  uri: 'https://www.adobe.com/privacy.html',
};

// twenga
tarteaucitron.services.twenga = {
  cookies: [],
  js: function () {
    'use strict';

    if (tarteaucitron.user.twengaId === undefined || tarteaucitron.user.twengaLocale === undefined) {
      return;
    }

    tarteaucitron.addScript('//tracker.twenga.' + tarteaucitron.user.twengaLocale + '/st/tracker_' + tarteaucitron.user.twengaId + '.js');
  },
  key: 'twenga',
  name: 'Twenga',
  needConsent: true,
  type: 'ads',
  uri: 'http://www.twenga.com/privacy.php',
};

// twitter
tarteaucitron.services.twitter = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'twitter';
    tarteaucitron.fallback(['tacTwitter'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['tacTwitter'], '');
    tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
  },
  key: 'twitter',
  name: 'Twitter',
  needConsent: true,
  type: 'social',
  uri: 'https://support.twitter.com/articles/20170514',
};

// twitter embed
tarteaucitron.services.twitterembed = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'twitterembed';
    tarteaucitron.fallback(['twitterembed-canvas'], function (elem) {
      elem.style.width = elem.getAttribute('data-width') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    var uniqIds = [],
      i,
      e,
      html;

    tarteaucitron.fallback(['twitterembed-canvas'], function (x) {
      var uniqId = '_' + Math.random().toString(36).substr(2, 9);
      uniqIds.push(uniqId);
      html = '<div id="' + uniqId + '" ';
      html += 'tweetid="' + x.getAttribute('tweetid') + '" ';
      html += 'theme="' + x.getAttribute('theme') + '" ';
      html += 'cards="' + x.getAttribute('cards') + '" ';
      html += 'conversation="' + x.getAttribute('conversation') + '" ';
      html += 'data-width="' + x.getAttribute('data-width') + '" ';
      html += 'data-align="' + x.getAttribute('data-align') + '" ';
      html += '></div>';
      return html;
    });

    tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs', function () {
      var i;
      for (i = 0; i < uniqIds.length; i += 1) {
        e = document.getElementById(uniqIds[i]);
        twttr.widgets.createTweet(
          e.getAttribute('tweetid'),
          e,
          {
            align: e.getAttribute('data-align'),
            cards: e.getAttribute('cards'),
            conversation: e.getAttribute('conversation'),
            dnt: true,
            lang: tarteaucitron.getLanguage(),
            theme: e.getAttribute('theme'),
            width: e.getAttribute('data-width'),
          },
        );
      }
    });
  },
  key: 'twitterembed',
  name: 'Twitter (cards)',
  needConsent: true,
  type: 'social',
  uri: 'https://support.twitter.com/articles/20170514',
};

// twitter timeline
tarteaucitron.services.twittertimeline = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'twittertimeline';
    tarteaucitron.fallback(['tacTwitterTimelines'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['tacTwitterTimelines'], '');
    tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
  },
  key: 'twittertimeline',
  name: 'Twitter (timelines)',
  needConsent: true,
  type: 'social',
  uri: 'https://support.twitter.com/articles/20170514',
};

// twitter universal website tag
tarteaucitron.services.twitteruwt = {
  cookies: [],
  js: function () {
    'use strict';

    window.twq = function () {
      window.twq.exe ? window.twq.exe.apply(window.twq, arguments) : window.twq.queue.push(arguments);
    };
    window.twq.version = '1.1';
    window.twq.queue = [];

    tarteaucitron.addScript('https://static.ads-twitter.com/uwt.js', '', function () {
      window.twq('init', tarteaucitron.user.twitteruwtId);
      window.twq('track', 'PageView');
    });
  },
  key: 'twitteruwt',
  name: 'Twitter Universal Website Tag',
  needConsent: true,
  type: 'analytic',
  uri: 'https://business.twitter.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites.html',
};

// user voice
tarteaucitron.services.uservoice = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.userVoiceApi === undefined) {
      return;
    }
    tarteaucitron.addScript('//widget.uservoice.com/' + tarteaucitron.user.userVoiceApi + '.js');
  },
  key: 'uservoice',
  name: 'UserVoice',
  needConsent: true,
  type: 'support',
  uri: 'https://www.uservoice.com/privacy/',
};

// vimeo
tarteaucitron.services.vimeo = {
  cookies: ['__utmt_player', '__utma', '__utmb', '__utmc', '__utmv', 'vuid', '__utmz', 'player'],
  fallback: function () {
    'use strict';
    var id = 'vimeo';
    tarteaucitron.fallback(['vimeo_player'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['vimeo_player'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x, 'title') || 'Vimeo iframe'),
        video_width = tarteaucitron.getElemAttr(x, 'width'),
        frame_width = 'width=',
        video_height = tarteaucitron.getElemAttr(x, 'height'),
        frame_height = 'height=',

        video_id = tarteaucitron.getElemAttr(x, 'videoID'),
        video_hash = tarteaucitron.getElemAttr(x, 'data-hash') || '',
        video_allowfullscreen = tarteaucitron.getElemAttr(x, 'data-allowfullscreen'),

        video_qs = '',
        attrs = ['title', 'byline', 'portrait', 'loop', 'autoplay', 'autopause', 'background', 'color', 'controls', 'maxheight', 'maxwidth', 'muted', 'playsinline', 'speed', 'transparent'],
        params = attrs.filter(function (a) {
          return tarteaucitron.getElemAttr(x, a) !== null;
        }).map(function (a) {
          return a + '=' + tarteaucitron.getElemAttr(x, a);
        }),

        video_frame;

      if (video_id === undefined) {
        return '';
      }

      // query params
      if (video_hash.length > 0) {
        params.push('h=' + video_hash);
      }
      if (params.length > 0) {
        video_qs = '?' + params.join('&');
      }

      // attributes
      if (video_width !== undefined) {
        frame_width += '"' + video_width + '" ';
      } else {
        frame_width += '"" ';
      }
      if (video_height !== undefined) {
        frame_height += '"' + video_height + '" ';
      } else {
        frame_height += '"" ';
      }

      video_frame = '<iframe title="' + frame_title + '" src="//player.vimeo.com/video/' + video_id + video_qs + '" ' + frame_width + frame_height + (video_allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';

      return video_frame;
    });
  },
  key: 'vimeo',
  name: 'Vimeo',
  needConsent: true,
  type: 'video',
  uri: 'https://vimeo.com/privacy',
};

// visualrevenue
tarteaucitron.services.visualrevenue = {
  cookies: ['__vrf', '__vrm', '__vrl', '__vry', '__vru', '__vrid', '__vrz'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.visualrevenueId === undefined) {
      return;
    }
    window._vrq = window._vrq || [];
    window._vrq.push(['id', tarteaucitron.user.visualrevenueId]);
    window._vrq.push(['automate', true]);
    window._vrq.push(['track', function () { }]);
    tarteaucitron.addScript('http://a.visualrevenue.com/vrs.js');
  },
  key: 'visualrevenue',
  name: 'VisualRevenue',
  needConsent: true,
  type: 'analytic',
  uri: 'http://www.outbrain.com/legal/privacy-713/',
};

// verizon dot tag
tarteaucitron.services.verizondottag = {
  cookies: [],
  js: function () {
    'use strict';

    window.dotq = window.dotq || [];
    window.dotq.push({
      projectId: tarteaucitron.user.verizondottagProjectId,
      properties: { pixelId: tarteaucitron.user.verizondottagPixelId },
    });

    tarteaucitron.addScript('https://s.yimg.com/wi/ytc.js', '', function () {
      //const items = window.dotq;
      window.dotq = [];
      window.dotq.push = function (item) {
        YAHOO.ywa.I13N.fireBeacon([item]);
      };
      YAHOO.ywa.I13N.fireBeacon(items);
    });
  },
  key: 'verizondottag',
  name: 'Verizon Dot Tag',
  needConsent: true,
  type: 'analytic',
  uri: 'https://developer.verizonmedia.com/native/guide/audience-management/dottags/',
};

// vshop
tarteaucitron.services.vshop = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'vshop';
    tarteaucitron.fallback(['vcashW'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['vcashW'], '');
    tarteaucitron.addScript('//vshop.fr/js/w.js');
  },
  key: 'vshop',
  name: 'vShop',
  needConsent: true,
  type: 'ads',
  uri: 'http://vshop.fr/privacy-policy',
};

// wysistat
tarteaucitron.services.wysistat = {
  cookies: ['Wysistat'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.wysistat === undefined) {
      return;
    }
    tarteaucitron.addScript('//www.wysistat.com/statistique.js', '', function () {
      window.stat(tarteaucitron.user.wysistat.cli, tarteaucitron.user.wysistat.frm, tarteaucitron.user.wysistat.prm, tarteaucitron.user.wysistat.ce, tarteaucitron.user.wysistat.page, tarteaucitron.user.wysistat.roi, tarteaucitron.user.wysistat.prof, tarteaucitron.user.wysistat.cpt);
    });
  },
  key: 'wysistat',
  name: 'Wysistat',
  needConsent: true,
  type: 'analytic',
  uri: 'http://wysistat.net/contact/',
};

// xiti
tarteaucitron.services.xiti = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.xitiId === undefined) {
      return;
    }
    var Xt_param = 's=' + tarteaucitron.user.xitiId + '&p=',
      Xt_r,
      Xt_h,
      Xt_i,
      Xt_s,
      div = document.createElement('div');
    try {
      Xt_r = top.document.referrer;
    } catch (e) {
      Xt_r = document.referrer;
    }
    Xt_h = new Date();
    Xt_i = '<img style="display:none" border="0" alt="" ';
    Xt_i += 'src="http://logv3.xiti.com/hit.xiti?' + Xt_param;
    Xt_i += '&hl=' + Xt_h.getHours() + 'x' + Xt_h.getMinutes() + 'x' + Xt_h.getSeconds();
    if (parseFloat(navigator.appVersion) >= 4) {
      Xt_s = screen;
      Xt_i += '&r=' + Xt_s.width + 'x' + Xt_s.height + 'x' + Xt_s.pixelDepth + 'x' + Xt_s.colorDepth;
    }

    div.innerHTML = Xt_i + '&ref=' + Xt_r.replace(/[<>"]/g, '').replace(/&/g, '$') + '" title="Internet Audience">';
    document.getElementsByTagName('body')[0].appendChild(div.firstChild);

    if (typeof tarteaucitron.user.xitiMore === 'function') {
      tarteaucitron.user.xitiMore();
    }
  },
  key: 'xiti',
  name: 'Xiti',
  needConsent: true,
  type: 'analytic',
  uri: 'https://www.atinternet.com/rgpd-et-vie-privee/',
};

// AT Internet
tarteaucitron.services.atinternet = {
  cookies: ['atidvisitor', 'atreman', 'atredir', 'atsession', 'atuserid', 'atauthority'],
  fallback: function () {
    'use strict';
    if (tarteaucitron.user.atLibUrl === undefined) {
      return;
    }

    if (tarteaucitron.user.atNoFallback === true) {
      return;
    }

    tarteaucitron.user.atinternetAlreadyLoaded = true;

    tarteaucitron.addScript(tarteaucitron.user.atLibUrl, '', function () {

      window.tag = new ATInternet.Tracker.Tag();

      if (typeof tarteaucitron.user.atMore === 'function') {
        tarteaucitron.user.atMore();
      }

      if (typeof window.tag.privacy !== 'undefined') {

        var visitorMode = window.tag.privacy.getVisitorMode();
        if (visitorMode !== null && visitorMode.name !== undefined && visitorMode.name == 'optout') {
          window.tag.privacy.setVisitorOptout();
        } else {
          window.tag.privacy.setVisitorMode('cnil', 'exempt');
        }
      }

      if (tarteaucitron.user.atinternetSendData !== false) {
        window.tag.page.send();
      }
    });
  },
  js: function () {
    'use strict';
    if (tarteaucitron.user.atLibUrl === undefined) {
      return;
    }

    if (tarteaucitron.user.atinternetAlreadyLoaded !== undefined) {
      return;
    }

    tarteaucitron.addScript(tarteaucitron.user.atLibUrl, '', function () {

      window.tag = new ATInternet.Tracker.Tag();

      if (typeof tarteaucitron.user.atMore === 'function') {
        tarteaucitron.user.atMore();
      }

      if (typeof window.tag.privacy !== 'undefined') {
        window.tag.privacy.setVisitorOptin();
      }

      if (tarteaucitron.user.atinternetSendData !== false) {
        window.tag.page.send();
      }
    });
  },
  key: 'atinternet',
  name: 'AT Internet (privacy by design)',
  needConsent: true,
  safeanalytic: false,
  type: 'analytic',
  uri: 'https://www.atinternet.com/rgpd-et-vie-privee/',
};

// AT Internet
tarteaucitron.services.atinternethightrack = {
  cookies: ['atidvisitor', 'atreman', 'atredir', 'atsession'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.atLibUrl === undefined) {
      return;
    }

    tarteaucitron.addScript(tarteaucitron.user.atLibUrl, '', function () {

      var tag = new ATInternet.Tracker.Tag();

      if (typeof tarteaucitron.user.atMore === 'function') {
        tarteaucitron.user.atMore();
      }
    });
  },
  key: 'atinternethightrack',
  name: 'AT Internet',
  needConsent: true,
  type: 'analytic',
  uri: 'https://www.atinternet.com/rgpd-et-vie-privee/',
};

// youtube
tarteaucitron.services.youtube = {
  cookies: ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP'],
  fallback: function () {
    'use strict';
    var id = 'youtube';
    tarteaucitron.fallback(['youtube_player'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['youtube_player'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x, 'title') || 'Youtube iframe'),
        video_id = tarteaucitron.getElemAttr(x, 'videoID'),
        srcdoc = tarteaucitron.getElemAttr(x, 'srcdoc'),
        loading = tarteaucitron.getElemAttr(x, 'loading'),
        video_width = tarteaucitron.getElemAttr(x, 'width'),
        frame_width = 'width=',
        video_height = tarteaucitron.getElemAttr(x, 'height'),
        frame_height = 'height=',
        video_frame,
        allowfullscreen = tarteaucitron.getElemAttr(x, 'allowfullscreen'),
        attrs = ['theme', 'rel', 'controls', 'showinfo', 'autoplay', 'mute', 'start', 'loop', 'enablejsapi'],
        params = attrs.filter(function (a) {
          return tarteaucitron.getElemAttr(x, a) !== null;
        }).map(function (a) {
          return a + '=' + tarteaucitron.getElemAttr(x, a);
        }).join('&');

      if(tarteaucitron.getElemAttr(x, 'loop') == 1) {
        params = params + '&playlist=' + video_id;
      }

      if (video_id === undefined) {
        return '';
      }
      if (video_width !== undefined) {
        frame_width += '"' + video_width + '" ';
      } else {
        frame_width += '"" ';
      }
      if (video_height !== undefined) {
        frame_height += '"' + video_height + '" ';
      } else {
        frame_height += '"" ';
      }

      if (srcdoc !== undefined && srcdoc !== null && srcdoc !== '') {
        srcdoc = 'srcdoc="' + srcdoc + '" ';
      } else {
        srcdoc = '';
      }

      if (loading !== undefined && loading !== null && loading !== '') {
        loading = 'loading ';
      } else {
        loading = '';
      }

      video_frame = '<iframe title="' + frame_title + '" type="text/html" ' + frame_width + frame_height + ' src="//www.youtube-nocookie.com/embed/' + video_id + '?' + params + '"' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + ' ' + srcdoc + ' ' + loading + '></iframe>';
      return video_frame;
    });
  },
  key: 'youtube',
  name: 'YouTube',
  needConsent: true,
  type: 'video',
  uri: 'https://policies.google.com/privacy',
};

// youtube playlist
tarteaucitron.services.youtubeplaylist = {
  cookies: ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP'],
  fallback: function () {
    'use strict';
    var id = 'youtubeplaylist';
    tarteaucitron.fallback(['youtube_playlist_player'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['youtube_playlist_player'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x, 'title') || 'Youtube iframe'),
        playlist_id = tarteaucitron.getElemAttr(x, 'playlistID'),
        video_width = tarteaucitron.getElemAttr(x, 'width'),
        frame_width = 'width=',
        video_height = tarteaucitron.getElemAttr(x, 'height'),
        frame_height = 'height=',
        video_frame,
        allowfullscreen = tarteaucitron.getElemAttr(x, 'allowfullscreen'),
        params = 'theme=' + tarteaucitron.getElemAttr(x, 'theme') + '&rel=' + tarteaucitron.getElemAttr(x, 'rel') + '&controls=' + tarteaucitron.getElemAttr(x, 'controls') + '&showinfo=' + tarteaucitron.getElemAttr(x, 'showinfo') + '&autoplay=' + tarteaucitron.getElemAttr(x, 'autoplay') + '&mute=' + tarteaucitron.getElemAttr(x, 'mute');

      if (playlist_id === undefined) {
        return '';
      }
      if (video_width !== undefined) {
        frame_width += '"' + video_width + '" ';
      } else {
        frame_width += '"" ';
      }
      if (video_height !== undefined) {
        frame_height += '"' + video_height + '" ';
      } else {
        frame_height += '"" ';
      }
      video_frame = '<iframe title="' + frame_title + '" type="text/html" ' + frame_width + frame_height + ' src="//www.youtube-nocookie.com/embed/videoseries?list=' + playlist_id + '&' + params + '"' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
      return video_frame;
    });
  },
  key: 'youtubeplaylist',
  name: 'YouTube (playlist)',
  needConsent: true,
  type: 'video',
  uri: 'https://policies.google.com/privacy',
};

// zopim
tarteaucitron.services.zopim = {
  cookies: ['__zlcid', '__zprivacy'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.zopimID === undefined) {
      return;
    }
    tarteaucitron.addScript('//v2.zopim.com/?' + tarteaucitron.user.zopimID);
  },
  key: 'zopim',
  name: 'Zopim',
  needConsent: true,
  type: 'support',
  uri: 'https://www.zopim.com/privacy',
};

// kameleoon
tarteaucitron.services.kameleoon = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.kameleoon !== undefined) {
      tarteaucitron.addScript('https://' + tarteaucitron.user.kameleoon + '.kameleoon.eu/kameleoon.js');
    }
  },
  key: 'kameleoon',
  name: 'Kameleoon',
  needConsent: true,
  type: 'analytic',
  uri: 'https://www.kameleoon.com/fr/compliance/rgpd',
};

// linkedin insight
tarteaucitron.services.linkedininsighttag = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.linkedininsighttag !== undefined) {
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(tarteaucitron.user.linkedininsighttag);
    }

    tarteaucitron.addScript('https://snap.licdn.com/li.lms-analytics/insight.min.js');
  },
  key: 'linkedininsighttag',
  name: 'Linkedin Insight',
  needConsent: true,
  type: 'ads',
  uri: 'https://www.linkedin.com/legal/cookie_policy',
};

// xiti smartTag
tarteaucitron.services.xiti_smarttag = {
  cookies: ['atidvisitor', 'atreman', 'atredir', 'atsession', 'attvtreman', 'attvtsession'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.xiti_smarttagLocalPath !== undefined) {
      tarteaucitron.addScript(tarteaucitron.user.xiti_smarttagLocalPath, 'smarttag', null, null, 'onload', 'addTracker();');
    } else {
      var xitiSmarttagId = tarteaucitron.user.xiti_smarttagSiteId;
      if (xitiSmarttagId === undefined) {
        return;
      }

      tarteaucitron.addScript('//tag.aticdn.net/' + xitiSmarttagId + '/smarttag.js', 'smarttag', null, null, 'onload', 'addTracker();');
    }
  },
  key: 'xiti_smarttag',
  name: 'Xiti (SmartTag)',
  needConsent: true,
  type: 'analytic',
  uri: 'https://helpcentre.atinternet-solutions.com/hc/fr/categories/360002439300-Privacy-Centre',
};

// facebook pixel
tarteaucitron.services.facebookpixel = {
  cookies: ['datr', 'fr', 'reg_ext_ref', 'reg_fb_gate', 'reg_fb_ref', 'sb', 'wd', 'x-src', '_fbp'],
  js: function () {
    'use strict';
    var n;
    if (window.fbq) return;
    n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!window._fbq) window._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    tarteaucitron.addScript('https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', tarteaucitron.user.facebookpixelId);
    fbq('track', 'PageView');

    if (typeof tarteaucitron.user.facebookpixelMore === 'function') {
      tarteaucitron.user.facebookpixelMore();
    }
  },
  key: 'facebookpixel',
  name: 'Facebook Pixel',
  needConsent: true,
  type: 'ads',
  uri: 'https://www.facebook.com/policy.php',
};

//Issuu
tarteaucitron.services.issuu = {
  cookies: ['__qca', 'iutk', 'mc'],
  fallback: function () {
    'use strict';
    var id = 'issuu';
    tarteaucitron.fallback(['issuu_player'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['issuu_player'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Issuu iframe'),
        issuu_id = x.getAttribute('issuuID'),
        issuu_width = x.getAttribute('width'),
        frame_width = 'width=',
        issuu_height = x.getAttribute('height'),
        frame_height = 'height=',
        issuu_frame,
        issuu_embed;

      if (issuu_id === undefined) {
        return '';
      }
      if (issuu_width !== undefined) {
        frame_width += '"' + issuu_width + '" ';
      } else {
        frame_width += '"" ';
      }
      if (issuu_height !== undefined) {
        frame_height += '"' + issuu_height + '" ';
      } else {
        frame_height += '"" ';
      }


      if (issuu_id.match(/\d+\/\d+/)) { issuu_embed = '#' + issuu_id; } else if (issuu_id.match(/d=(.*)&u=(.*)/)) { issuu_embed = '?' + issuu_id; }


      issuu_frame = '<iframe title="' + frame_title + '" type="text/html" ' + frame_width + frame_height + ' src="//e.issuu.com/embed.html' + issuu_embed + '"></iframe>';

      return issuu_frame;
    });
  },
  key: 'issuu',
  name: 'Issuu',
  needConsent: true,
  type: 'other',
  uri: 'https://issuu.com/legal/privacy',
};

// webmecanik
tarteaucitron.services.webmecanik = {
  cookies: ['mtc_id', 'mtc_sid'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.webmecanikurl === undefined) {
      return;
    }

    window.MauticTrackingObject = 'mt';
    window.mt = window.mt || function () {
      window.mt.q = window.mt.q || [];
      window.mt.q.push(arguments);
    };

    tarteaucitron.addScript(tarteaucitron.user.webmecanikurl, '', function () {
      mt('send', 'pageview');
    });
  },
  key: 'webmecanik',
  name: 'Webmecanik',
  needConsent: true,
  type: 'analytic',
  uri: 'https://webmecanik.com/tos',
};

// google analytics multiple
tarteaucitron.services.multiplegtag = {
  cookies: (function () {

    var cookies = ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '_gcl_au'];

    if (tarteaucitron.user.multiplegtagUa !== undefined) {
      tarteaucitron.user.multiplegtagUa.forEach(function (ua) {
        cookies.push('_gat_gtag_' + ua.replace(/-/g, '_'));
        cookies.push('_ga_' + ua.replace(/G-/g, ''));
      });
    }

    return cookies;
  })(),
  js: function () {
    'use strict';
    window.dataLayer = window.dataLayer || [];
    // TODO: delete after Campaign
    tarteaucitron.user.multiplegtagUa = ['DC-2953234'];
    if (tarteaucitron.user.multiplegtagUa !== undefined) {
      tarteaucitron.user.multiplegtagUa.forEach(function (ua) {
        tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + ua, '', function () {
          window.gtag = function gtag() { dataLayer.push(arguments); };
          gtag('js', new Date());
          var additional_config_info = (timeExpire !== undefined) ? { anonymize_ip: true, cookie_expires: timeExpire / 1000 } : { anonymize_ip: true };
          gtag('config', ua, additional_config_info);
          // TODO: delete after Campaign
          if (window.location.pathname === '/decouvrir-les-metiers') {
            gtag('event', 'conversion', {
              allow_custom_scripts: true,
              send_to: 'DC-2953234/SIG-M0/lpformat+unique',
            });
          }
        });
      });
    }
  },
  key: 'multiplegtag',
  name: 'Google Foodlight (gtag.json)',
  needConsent: true,
  type: 'analytic',
  uri: 'https://support.google.com/analytics/answer/6004245',
};

// Koban
tarteaucitron.services.koban = {
  cookies: ['kbntrk'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.kobanurl === undefined) {
      return;
    }
    if (tarteaucitron.user.kobanapi === undefined) {
      return;
    }
    window.KobanObject = 'kb';
    window.kb = window.kb || function () {
      window.kb.q = window.kb.q || [];
      window.kb.q.push(arguments);
    };
    window.kb.l = new Date();
    kb('reg', tarteaucitron.user.kobanapi);
    tarteaucitron.addScript(tarteaucitron.user.kobanurl, '', function () {
    });
  },
  key: 'koban',
  name: 'Koban',
  needConsent: true,
  type: 'analytic',
  uri: 'https://koban.cloud/tos',
};

// matomo

/*
    1. Set the following variable before the initialization :

    tarteaucitron.user.matomoId = YOUR_SITE_ID_FROM_MATOMO;
    tarteaucitron.user.matomoHost = "YOUR_MATOMO_URL"; //eg: https://stat.mydomain.com/

    2. Push the service :

    (tarteaucitron.job = tarteaucitron.job || []).push('matomo');  // (or 'matomocloud' for cloud version)

    3. HTML
    You don't need to add any html code, if the service is authorized, the javascript is added. otherwise no.
 */
tarteaucitron.services.matomo = {
  cookies: ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'piwik_ignore', '_pk_uid'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.matomoId === undefined) {
      return;
    }

    window._paq = window._paq || [];
    window._paq.push(['setSiteId', tarteaucitron.user.matomoId]);
    window._paq.push(['setTrackerUrl', tarteaucitron.user.matomoHost + 'piwik.php']);
    window._paq.push(['setDoNotTrack', 1]);
    window._paq.push(['trackPageView']);
    window._paq.push(['setIgnoreClasses', ['no-tracking', 'colorbox']]);
    window._paq.push(['enableLinkTracking']);
    window._paq.push([function () {
      var self = this;
      function getOriginalVisitorCookieTimeout() {
        var now = new Date(),
          nowTs = Math.round(now.getTime() / 1000),
          visitorInfo = self.getVisitorInfo();
        var createTs = parseInt(visitorInfo[2]);
        var cookieTimeout = 33696000; // 13 mois en secondes
        var originalTimeout = createTs + cookieTimeout - nowTs;
        return originalTimeout;
      }
      this.setVisitorCookieTimeout(getOriginalVisitorCookieTimeout());
    }]);

    tarteaucitron.addScript(tarteaucitron.user.matomoHost + 'piwik.js', '', '', true, 'defer', true);

    // waiting for piwik to be ready to check first party cookies
    var interval = setInterval(function () {
      if (typeof Piwik === 'undefined') return;

      clearInterval(interval);

      // make piwik/matomo cookie accessible by getting tracker
      Piwik.getTracker();

      // looping throught cookies
      var theCookies = document.cookie.split(';');
      for (var i = 1; i <= theCookies.length; i++) {
        var cookie = theCookies[i - 1].split('=');
        var cookieName = cookie[0].trim();

        // if cookie starts like a piwik one, register it
        if (cookieName.indexOf('_pk_') === 0) {
          tarteaucitron.services.matomo.cookies.push(cookieName);
        }
      }
    }, 100);
  },
  key: 'matomo',
  name: 'Matomo (privacy by design)',
  needConsent: false,
  type: 'analytic',
  uri: 'https://matomo.org/faq/general/faq_146/',
};


tarteaucitron.services.matomohightrack = {
  cookies: ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'piwik_ignore', '_pk_uid'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.matomoId === undefined) {
      return;
    }

    window._paq = window._paq || [];
    window._paq.push(['setSiteId', tarteaucitron.user.matomoId]);
    window._paq.push(['setTrackerUrl', tarteaucitron.user.matomoHost + 'piwik.php']);
    window._paq.push(['trackPageView']);
    window._paq.push(['setIgnoreClasses', ['no-tracking', 'colorbox']]);
    window._paq.push(['enableLinkTracking']);
    window._paq.push([function () {
      var self = this;
    }]);

    tarteaucitron.addScript(tarteaucitron.user.matomoHost + 'piwik.js', '', '', true, 'defer', true);

    // waiting for piwik to be ready to check first party cookies
    var interval = setInterval(function () {
      if (typeof Piwik === 'undefined') return;

      clearInterval(interval);
      Piwik.getTracker();

      var theCookies = document.cookie.split(';');
      for (var i = 1; i <= theCookies.length; i++) {
        var cookie = theCookies[i - 1].split('=');
        var cookieName = cookie[0].trim();

        if (cookieName.indexOf('_pk_') === 0) {
          tarteaucitron.services.matomo.cookies.push(cookieName);
        }
      }
    }, 100);
  },
  key: 'matomohightrack',
  name: 'Matomo',
  needConsent: false,
  type: 'analytic',
  uri: 'https://matomo.org/faq/general/faq_146/',
};


tarteaucitron.services.matomocloud = {
  cookies: ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'mtm_consent', 'matomo_ignore', 'matomo_sessid'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.matomoId === undefined) {
      return;
    }

    window._paq = window._paq || [];
    window._paq.push(['setSiteId', tarteaucitron.user.matomoId]);
    window._paq.push(['setTrackerUrl', tarteaucitron.user.matomoHost + 'matomo.php']);
    window._paq.push(['setDoNotTrack', 1]);
    window._paq.push(['trackPageView']);
    window._paq.push(['setIgnoreClasses', ['no-tracking', 'colorbox']]);
    window._paq.push(['enableLinkTracking']);
    window._paq.push([function () {
      var self = this;
      function getOriginalVisitorCookieTimeout() {
        var now = new Date(),
          nowTs = Math.round(now.getTime() / 1000),
          visitorInfo = self.getVisitorInfo();
        var createTs = parseInt(visitorInfo[2]);
        var cookieTimeout = 33696000; // 13 mois en secondes
        var originalTimeout = createTs + cookieTimeout - nowTs;
        return originalTimeout;
      }
      this.setVisitorCookieTimeout(getOriginalVisitorCookieTimeout());
    }]);

    tarteaucitron.addScript('https://cdn.matomo.cloud/matomo.js', '', '', true, 'defer', true);

    // waiting for Matomo to be ready to check first party cookies
    var interval = setInterval(function () {
      if (typeof Matomo === 'undefined') return;

      clearInterval(interval);

      // make Matomo cookie accessible by getting tracker
      Matomo.getTracker();

      // looping through cookies
      var theCookies = document.cookie.split(';');
      for (var i = 1; i <= theCookies.length; i++) {
        var cookie = theCookies[i - 1].split('=');
        var cookieName = cookie[0].trim();

        // if cookie starts like a matomo one, register it
        if (cookieName.indexOf('_pk_') === 0) {
          tarteaucitron.services.matomo.cookies.push(cookieName);
        }
      }
    }, 100);
  },
  key: 'matomocloud',
  name: 'Matomo Cloud (privacy by design)',
  needConsent: false,
  type: 'analytic',
  uri: 'https://matomo.org/faq/general/faq_146/',
};


// Hotjar
/*
   1. Set the following variable before the initialization :
    tarteaucitron.user.hotjarId = YOUR_WEBSITE_ID;
   tarteaucitron.user.HotjarSv = XXXX; // Can be found in your website tracking code as "hjvs=XXXX"
    2. Push the service :
    (tarteaucitron.job = tarteaucitron.job || []).push('hotjar');
    3. HTML
   You don't need to add any html code, if the service is autorized, the javascript is added. otherwise no.
 */
tarteaucitron.services.hotjar = {
  cookies: ['hjClosedSurveyInvites', '_hjDonePolls', '_hjMinimizedPolls', '_hjDoneTestersWidgets', '_hjMinimizedTestersWidgets', '_hjDoneSurveys', '_hjIncludedInSample', '_hjShownFeedbackMessage', '_hjAbsoluteSessionInProgress', '_hjIncludeInPageviewSample', '_hjid'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.hotjarId === undefined || tarteaucitron.user.HotjarSv === undefined) {
      return;
    }
    window.hj = window.hj || function () {
      (window.hj.q = window.hj.q || []).push(arguments);
    };
    window._hjSettings = {
      hjid: tarteaucitron.user.hotjarId,
      hjsv: tarteaucitron.user.HotjarSv,
    };
    var uri = 'https://static.hotjar.com/c/hotjar-';
    var extension = '.js?sv=';
    tarteaucitron.addScript(uri + window._hjSettings.hjid + extension + window._hjSettings.hjsv);
  },
  key: 'hotjar',
  name: 'Hotjar',
  needConsent: true,
  type: 'analytic',
  uri: 'https://help.hotjar.com/hc/en-us/categories/115001323967-About-Hotjar',
};

// bing ads universal event tracking
tarteaucitron.services.bingads = {
  cookies: ['_uetmsclkid', '_uetvid', '_uetsid'],
  js: function () {
    'use strict';
    //var u = tarteaucitron.user.bingadsTag || 'uetq';
    window.uetq = window.uetq || [];

    tarteaucitron.addScript('https://bat.bing.com/bat.js', '', function () {
      var bingadsCreate = { ti: tarteaucitron.user.bingadsID };

      if ('bingadsStoreCookies' in tarteaucitron.user) {
        bingadsCreate['storeConvTrackCookies'] = tarteaucitron.user.bingadsStoreCookies;
      }

      bingadsCreate.q = window.uetq;
      window.uetq = new UET(bingadsCreate);
      window.uetq.push('pageLoad');

      if (typeof tarteaucitron.user.bingadsMore === 'function') {
        tarteaucitron.user.bingadsMore();
      }
    });
  },
  key: 'bingads',
  name: 'Bing Ads Universal Event Tracking',
  needConsent: true,
  type: 'ads',
  uri: 'https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads',
};

//Matterport
tarteaucitron.services.matterport = {
  cookies: ['__cfduid', 'ajs_anonymous_id', 'ajs_group_id', 'ajs_user_id'],
  fallback: function () {
    'use strict';
    var id = 'matterport';
    tarteaucitron.fallback(['matterport'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['matterport'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Matterport iframe'),
        matterport_id = x.getAttribute('matterportID'),
        matterport_width = x.getAttribute('width'),
        frame_width = 'width=',
        matterport_height = x.getAttribute('height'),
        frame_height = 'height=',
        matterport_parameters = x.getAttribute('parameters'),
        matterport_allowfullscreen = x.getAttribute('allowfullscreen'),
        matterport_frame;

      if (matterport_id === undefined) {
        return '';
      }
      if (matterport_width !== undefined) {
        frame_width += '"' + matterport_width + '" ';
      } else {
        frame_width += '"" ';
      }
      if (matterport_height !== undefined) {
        frame_height += '"' + matterport_height + '" ';
      } else {
        frame_height += '"" ';
      }
      if (matterport_parameters === undefined) {
        return '';
      }

      matterport_frame = '<iframe title="' + frame_title + '" type="text/html" ' + frame_width + frame_height + ' src="https://my.matterport.com/show/?m=' + matterport_id + '&utm_source=hit-content' + matterport_parameters + '"' + (matterport_allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
      return matterport_frame;
    });
  },
  key: 'matterport',
  name: 'Matterport',
  needConsent: true,
  type: 'other',
  uri: 'https://matterport.com/es/legal/privacy-policy/',
};

// Adform
tarteaucitron.services.adform = {
  cookies: [],
  js: function () {
    'use strict';

    if (tarteaucitron.user.adformpm === undefined || tarteaucitron.user.adformpagename === undefined) {
      return;
    }

    window._adftrack = {
      divider: encodeURIComponent('|'),
      pagename: encodeURIComponent(tarteaucitron.user.adformpagename),
      pm: tarteaucitron.user.adformpm,
    };

    tarteaucitron.addScript('https://track.adform.net/serving/scripts/trackpoint/async/');
  },
  key: 'adform',
  name: 'Adform',
  needConsent: true,
  type: 'ads',
  uri: 'https://site.adform.com/privacy-center/overview/',
};

// Active Campaign
tarteaucitron.services.activecampaign = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.actid === undefined) {
      return;
    }

    window.trackcmp_email = '';

    tarteaucitron.addScript('https://trackcmp.net/visit?actid=' + tarteaucitron.user.actid + '&e=' + encodeURIComponent(trackcmp_email) + '&r=' + encodeURIComponent(document.referrer) + '&u=' + encodeURIComponent(window.location.href));
  },
  key: 'activecampaign',
  name: 'Active Campaign',
  needConsent: true,
  type: 'ads',
  uri: 'https://www.activecampaign.com/privacy-policy/',
};

// tawk.to
tarteaucitron.services.tawkto = {
  cookies: [],
  js: function () {
    'use strict';
    if (tarteaucitron.user.tawktoId === undefined) {
      return;
    }

    tarteaucitron.user.tawktoWidgetId = tarteaucitron.user.tawktoWidgetId || 'default';

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    tarteaucitron.addScript('https://embed.tawk.to/' + tarteaucitron.user.tawktoId + '/' + tarteaucitron.user.tawktoWidgetId);
  },
  key: 'tawkto',
  name: 'Tawk.to chat',
  needConsent: true,
  type: 'support',
  uri: 'https://www.tawk.to/data-protection/',

};

// getquanty
tarteaucitron.services.getquanty = {
  cookies: ['_first_pageview', 'eqy_sessionid', 'eqy_siteid', 'cluid', 'eqy_company', 'cluid', 'gq_utm', '_jsuid'],
  fallback: function () {
    'use strict';
    if (tarteaucitron.user.getguanty === undefined) {
      return;
    }

    tarteaucitron.user.getquantyAlreadyLoaded = true;

    tarteaucitron.addScript('https://get.smart-data-systems.com/gq?site_id=' + tarteaucitron.user.getguanty + '&notrack=1');
  },
  js: function () {
    'use strict';
    if (tarteaucitron.user.getguanty === undefined) {
      return;
    }

    if (tarteaucitron.user.getquantyAlreadyLoaded !== undefined) {
      return;
    }

    tarteaucitron.addScript('https://get.smart-data-systems.com/gq?site_id=' + tarteaucitron.user.getguanty + '&consent=1');
  },
  key: 'getquanty',
  name: 'GetQuanty',
  needConsent: true,
  type: 'analytic',
  uri: 'https://www.getquanty.com/mentions-legales/',
};

// emolytics
tarteaucitron.services.emolytics = {
  cookies: ['__hssc', '__hssrc', '__hstc', '_ga', '_gid', 'hubspotutk', 'lang', 'incap_ses_', 'nlbi_', 'visid_incap_'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.emolyticsID === undefined) {
      return;
    }
    var scriptEmolytics = document.createElement('script');
    scriptEmolytics.text = 'var getsmily_id="' + tarteaucitron.user.emolyticsID + '";';
    document.getElementsByTagName('body')[0].appendChild(scriptEmolytics);
    tarteaucitron.addScript('https://cdn.emolytics.com/script/emolytics-widget.js');
  },
  key: 'emolytics',
  name: 'Emolytics',
  needConsent: true,
  type: 'analytic',
  uri: 'https://www.emolytics.com/main/privacy-policy.php',
};

// youtubeapi
tarteaucitron.services.youtubeapi = {
  cookies: [],
  js: function () {
    'use strict';
    tarteaucitron.addScript('https://www.youtube.com/player_api');
  },
  key: 'youtubeapi',
  name: 'Youtube (Js API)',
  needConsent: true,
  type: 'video',
  uri: 'https://policies.google.com/privacy',
};

// Facil'ITI
tarteaucitron.services.faciliti = {
  cookies: ['FACIL_ITI_LS'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.facilitiID === undefined) {
      return;
    }

    (function (w, d, s, f) {
      w[f] = w[f] || { conf: function () { (w[f].data = w[f].data || []).push(arguments); } };
      var l = d.createElement(s), e = d.getElementsByTagName(s)[0];
      l.async = 1; l.src = 'https://ws.facil-iti.com/tag/faciliti-tag.min.js'; e.parentNode.insertBefore(l, e);
    }(window, document, 'script', 'FACIL_ITI'));
    FACIL_ITI.conf('userId', tarteaucitron.user.facilitiID);
  },
  key: 'faciliti',
  name: "Facil'ITI",
  needConsent: true,
  type: 'other',
  uri: 'https://ws.facil-iti.com/mentions-legales.html',
};

// userlike
tarteaucitron.services.userlike = {
  cookies: ['uslk_s', 'uslk_e'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.userlikeKey === undefined) {
      return;
    }
    tarteaucitron.addScript('//userlike-cdn-widgets.s3-eu-west-1.amazonaws.com/' + tarteaucitron.user.userlikeKey);
  },
  key: 'userlike',
  name: 'Userlike',
  needConsent: true,
  type: 'support',
  uri: 'https://www.userlike.com/en/terms#privacy-policy',
};

// adobeanalytics
tarteaucitron.services.adobeanalytics = {
  cookies: ['s_ecid', 's_cc', 's_sq', 's_vi', 's_fid'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.adobeanalyticskey === undefined) {
      return;
    }
    tarteaucitron.addScript('//assets.adobedtm.com/launch-' + tarteaucitron.user.adobeanalyticskey + '.min.js');
  },
  key: 'adobeanalytics',
  name: 'Adobe Analytics',
  needConsent: true,
  type: 'analytic',
  uri: 'https://www.adobe.com/privacy/policy.html',
};

// woopra customer journey analytics
tarteaucitron.services.woopra = {
  cookies: ['wooTracker', 'intercom-session-erbfalba', 'intercom-id-erbfalba'],
  js: function () {
    'use strict';
    //var w = tarteaucitron.user.woopraDomain;
    //window[w] = window[w] || [];

    (function () {
      var t, i, e, n = window, o = document, a = arguments, s = 'script', r = ['config', 'track', 'identify', 'visit', 'push', 'call', 'trackForm', 'trackClick'], c = function () { var t, i = this; for (i._e = [], t = 0; r.length > t; t++)(function (t) { i[t] = function () { return i._e.push([t].concat(Array.prototype.slice.call(arguments, 0))), i; }; })(r[t]); }; for (n._w = n._w || {}, t = 0; a.length > t; t++)n._w[a[t]] = n[a[t]] = n[a[t]] || new c; i = o.createElement(s), i.async = 1, i.src = '//static.woopra.com/js/w.js', e = o.getElementsByTagName(s)[0], e.parentNode.insertBefore(i, e);
    })('woopra');

    woopra.config({
      domain: tarteaucitron.user.woopraDomain,
    });
    woopra.track();
  },
  key: 'woopra',
  name: 'Woopra Customer Journey Analytics',
  needConsent: true,
  type: 'analytic',
  uri: 'https://www.woopra.com/privacy',
};

// ausha
tarteaucitron.services.ausha = {
  cookies: [],
  fallback: function () {
    'use strict';
    tarteaucitron.fallback(['ausha_player'], function (elem) {
      elem.style.height = elem.getAttribute('data-height') + 'px';
      return tarteaucitron.engage('ausha');
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['ausha_player'], function (x) {
      var player_height = x.getAttribute('data-height'),
        podcast_id = x.getAttribute('data-podcast-id'),
        player_id = x.getAttribute('data-player-id'),
        playlist = x.getAttribute('data-playlist'),
        useshowid = x.getAttribute('data-useshowid'),
        color = x.getAttribute('data-color');

      if (podcast_id === undefined) {
        return '';
      }

      var src = 'https://player.ausha.co/index.html?podcastId=' + podcast_id + '&v=3';

      if (useshowid == '1') {
        src = 'https://player.ausha.co/index.html?showId=' + podcast_id + '&v=3';
      }

      if (playlist && playlist.length > 0) src += '&playlist=' + playlist;
      if (color && color.length > 0) src += '&color=' + color.replace('#', '%23');
      if (player_id && player_id.length > 0) src += '&playerId=' + player_id;

      return '<iframe id="' + player_id + '" loading="lazy" width="100%" height="' + player_height + '" scrolling="no" frameborder="no" src="' + src + '"></iframe>';
    });

    tarteaucitron.addScript('//player.ausha.co/ausha-player.js', 'ausha-player');
  },
  key: 'ausha',
  name: 'Ausha',
  needConsent: true,
  type: 'video',
  uri: 'https://www.ausha.co/protection-personal-data/',
};

// visiblee
tarteaucitron.services.visiblee = {
  cookies: ['visitor_v2', tarteaucitron.user.visibleedomain, 'check', 'campaign_ref_' + tarteaucitron.user.visibleedomain, 'reload_' + tarteaucitron.user.visibleedomain],
  js: function () {
    'use strict';

    if (tarteaucitron.user.visibleeclientid === undefined) {
      return;
    }
    tarteaucitron.addScript('//www.link-page.info/tracking_' + tarteaucitron.user.visibleeclientid + '.js', 'visiblee');
  },
  key: 'visiblee',
  name: 'Visiblee',
  needConsent: true,
  type: 'analytic',
  uri: 'http://confidentiality.visiblee.io/fr/confidentialite',
};

// bandcamp
tarteaucitron.services.bandcamp = {
  cookies: ['client_id', 'BACKENDID', '_comm_playlist'],
  fallback: function () {
    'use strict';
    tarteaucitron.fallback(['bandcamp_player'], function (elem) {
      elem.style.width = elem.getAttribute('width');
      elem.style.height = elem.getAttribute('height');
      return tarteaucitron.engage('bandcamp');
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['bandcamp_player'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Bandcamp iframe'),
        album_id = x.getAttribute('albumID'),
        bandcamp_width = x.getAttribute('width'),
        frame_width = 'width=',
        bandcamp_height = x.getAttribute('height'),
        frame_height = 'height=',
        attrs = ['size', 'bgcol', 'linkcol', 'artwork', 'minimal', 'tracklist', 'package', 'transparent'],
        params = attrs.filter(function (a) {
          return x.getAttribute(a) !== null;
        }).map(function (a) {
          if (a && a.length > 0) return a + '=' + x.getAttribute(a);
        }).join('/');

      if (album_id === null) {
        return '';
      }

      if (bandcamp_width !== null || bandcamp_width !== '') {
        frame_width += '"' + bandcamp_width + '" ';
      } else {
        frame_width += '"" ';
      }
      if (bandcamp_height !== null || bandcamp_height !== '') {
        frame_height += '"' + bandcamp_height + '" ';
      } else {
        frame_height += '"" ';
      }

      var src = 'https://bandcamp.com/EmbeddedPlayer/album=' + album_id + '/' + params;

      return '<iframe title="' + frame_title + '"' + frame_width + frame_height + 'src="' + src + '" frameborder="0" allowfullscreen seamless></iframe>';
    });
  },
  key: 'bandcamp',
  name: 'Bandcamp',
  needConsent: true,
  readmoreLink: 'https://bandcamp.com/privacy',
  type: 'video',
  uri: 'https://bandcamp.com',
};

// Discord Widget
tarteaucitron.services.discord = {
  cookies: ['__cfruid', '__dcfduid', '_ga', '_gcl_au', 'OptanonConsent', 'locale', '_gid'],
  fallback: function () {
    'use strict';
    var id = 'discord';
    tarteaucitron.fallback(['discord_widget'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['discord_widget'], function (x) {
      var id = x.getAttribute('guildID'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height');
      var widgetURL = 'https://discord.com/widget?id=' + id;
      return '<iframe width="' + width + '" height="' + height + '" src="' + widgetURL + '"></iframe>';
    });
  },
  key: 'discord',
  name: 'Discord (Server Widget)',
  needConsent: true,
  type: 'social',
  uri: 'https://discord.com/privacy',
};

// Google Maps
tarteaucitron.services.maps_noapi = {
  cookies: ['NID', 'OGPC', '1P_JAR', 'CONSENT'],
  fallback: function () {
    'use strict';
    var id = 'maps_noapi';
    tarteaucitron.fallback(['googlemaps_embed'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['googlemaps_embed'], function (x) {
      var id = x.getAttribute('id'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height');
      var widgetURL = 'https://google.com/maps/embed?pb=' + id;
      return '<iframe width="' + width + '" height="' + height + '" src="' + widgetURL + '" style="border:0;" allowfullscreen="" loading="lazy"></iframe>';
    });
  },
  key: 'maps_noapi',
  name: 'Google Maps',
  needConsent: true,
  type: 'other',
  uri: 'https://policies.google.com/privacy',
};

// hCaptcha
tarteaucitron.services.hcaptcha = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'hcaptcha';
    tarteaucitron.fallback(['h-captcha'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['h-captcha'], '');
    tarteaucitron.addScript('https://hcaptcha.com/1/api.js', 'hcaptcha');
  },
  key: 'hcaptcha',
  name: 'hCaptcha',
  needConsent: true,
  type: 'other',
  uri: 'https://www.hcaptcha.com/privacy',
};

// France Culture
tarteaucitron.services.fculture = {
  cookies: ['_gid', 'didomi_token', 'outbrain_cid_fetch', 'xtvrn', 'xtant', 'YSC', 'ABTasty', 'xtan', 'ABTastySession', 'xtidc', '_ga', 'VISITOR_INFO1_LIVE', 'euconsent-v2', 'v1st', 'dmvk', 'ts', 'VISITOR_INFO1_LIVE', 'YSC'],
  fallback: function () {
    'use strict';
    var id = 'fculture';
    tarteaucitron.fallback(['fculture_embed'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['fculture_embed'], function (x) {
      var id = x.getAttribute('id'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height');
      return '<iframe src="https://www.franceculture.fr/player/export-reecouter?content=' + id + '" height="' + height + '" width="' + width + '"></iframe>';
    });
  },
  key: 'fculture',
  name: 'France Culture',
  needConsent: true,
  type: 'video',
  uri: 'https://www.radiofrance.com/politique-d-utilisation-des-cookies-sur-les-sites-internet-du-groupe-radio-france',
};

// Acast
tarteaucitron.services.acast = {
  cookies: ['intercom-id-ayi0335i', 'intercom-session-ayi0335i'],
  fallback: function () {
    'use strict';
    var id = 'acast';
    tarteaucitron.fallback(['acast_embed'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['acast_embed'], function (x) {
      var id = x.getAttribute('id1'),
        id2 = x.getAttribute('id2'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height'),
        seek = x.getAttribute('seek');
      var widgetURL = 'https://embed.acast.com/' + id + '/' + id2 + '?seek=' + seek;
      return '<iframe title="Embed Player" width="' + width + '" height="' + height + '" src="' + widgetURL + '" scrolling="no" frameBorder="0" style="border: none; overflow: hidden;"></iframe>';
    });
  },
  key: 'acast',
  name: 'Acast',
  needConsent: true,
  type: 'video',
  uri: 'https://www.acast.com/en/privacy',
};

// Mixcloud
tarteaucitron.services.mixcloud = {
  cookies: ['UID', '_gat', '__stripe_mid', '_gid', '_ga', 'c', 'csrftoken', '__stripe_sid', 'mx_t'],
  fallback: function () {
    'use strict';
    var id = 'mixcloud';
    tarteaucitron.fallback(['mixcloud_embed'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['mixcloud_embed'], function (x) {
      var id = x.getAttribute('id'),
        hidecover = x.getAttribute('hidecover'),
        mini = x.getAttribute('mini'),
        light = x.getAttribute('light'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height');
      return '<iframe width="' + width + '" height="' + height + '" src="https://www.mixcloud.com/widget/iframe/?hide_cover=' + hidecover + '&mini=' + mini + '&light=' + light + '&feed=' + id + '" frameborder="0" ></iframe>';
    });
  },
  key: 'mixcloud',
  name: 'Mixcloud',
  needConsent: true,
  type: 'video',
  uri: 'https://www.mixcloud.com/privacy/',
};

// Google Agenda
tarteaucitron.services.gagenda = {
  cookies: ['CONSENT', 'NID'],
  fallback: function () {
    'use strict';
    var id = 'gagenda';
    tarteaucitron.fallback(['gagenda_embed'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['gagenda_embed'], function (x) {
      var calendar_data = x.getAttribute('data'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height');
      return '<iframe loarding="lazy" width="' + width + '" height="' + height + '" src="https://www.google.com/calendar/embed?' + calendar_data + '" frameborder="0" scrolling="no" style="border-width:0"></iframe>';
    });
  },
  key: 'gagenda',
  name: 'Google Agenda',
  needConsent: true,
  type: 'other',
  uri: 'https://policies.google.com/privacy',
};

// Google Docs
tarteaucitron.services.gdocs = {
  cookies: ['CONSENT', 'NID'],
  fallback: function () {
    'use strict';
    var id = 'gdocs';
    tarteaucitron.fallback(['gdocs_embed'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['gdocs_embed'], function (x) {
      var id = x.getAttribute('id'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height');
      return '<iframe width="' + width + '" height="' + height + '" src="https://docs.google.com/document/d/e/' + id + '/pub?embedded=true"></iframe>';
    });
  },
  key: 'gdocs',
  name: 'Google Docs',
  needConsent: true,
  type: 'other',
  uri: 'https://policies.google.com/privacy',
};

// Google Sheets
tarteaucitron.services.gsheets = {
  cookies: ['CONSENT', 'NID'],
  fallback: function () {
    'use strict';
    var id = 'gsheets';
    tarteaucitron.fallback(['gsheets_embed'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['gsheets_embed'], function (x) {
      var id = x.getAttribute('id'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height'),
        headers = x.getAttribute('headers');
      return '<iframe width="' + width + '" height="' + height + '" src="https://docs.google.com/spreadsheets/d/e/' + id + '/pubhtml?widget=true&amp;headers=' + headers + '"></iframe>';
    });
  },
  key: 'gsheets',
  name: 'Google Sheets',
  needConsent: true,
  type: 'other',
  uri: 'https://policies.google.com/privacy',
};

// Google Slides
tarteaucitron.services.gslides = {
  cookies: ['CONSENT', 'NID'],
  fallback: function () {
    'use strict';
    var id = 'gslides';
    tarteaucitron.fallback(['gslides_embed'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['gslides_embed'], function (x) {
      var id = x.getAttribute('id'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height'),
        autostart = x.getAttribute('autostart'),
        loop = x.getAttribute('loop'),
        delay = x.getAttribute('delay');
      return '<iframe width="' + width + '" height="' + height + '" src="https://docs.google.com/presentation/d/e/' + id + '/embed?start=' + autostart + '&loop=' + loop + '&delayms=' + delay + '" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';
    });
  },
  key: 'gslides',
  name: 'Google Slides',
  needConsent: true,
  type: 'other',
  uri: 'https://policies.google.com/privacy',
};

// Google Forms
tarteaucitron.services.gforms = {
  cookies: ['CONSENT', 'NID'],
  fallback: function () {
    'use strict';
    var id = 'gforms';
    tarteaucitron.fallback(['gforms_embed'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['gforms_embed'], function (x) {
      var id = x.getAttribute('id'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height');
      return '<iframe width="' + width + '" height="' + height + '" src="https://docs.google.com/forms/d/e/' + id + '/viewform?embedded=true" frameborder="0" marginheight="0" marginwidth="0"></iframe>';
    });
  },
  key: 'gforms',
  name: 'Google Forms',
  needConsent: true,
  type: 'other',
  uri: 'https://policies.google.com/privacy',
};

// Google Optimize
tarteaucitron.services.goptimize = {
  cookies: ['CONSENT', 'NID'],
  js: function () {
    'use strict';

    if (tarteaucitron.user.goptimize === undefined) {
      return;
    }

    tarteaucitron.addScript('https://www.googleoptimize.com/optimize.js?id=' + tarteaucitron.user.goptimize);
  },
  key: 'goptimize',
  name: 'Google Optimize',
  needConsent: true,
  type: 'other',
  uri: 'https://policies.google.com/privacy',
};

// Marketo munchkin
tarteaucitron.services.marketomunchkin = {
  cookies: ['OptAnon', '_mkto_trk'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.marketomunchkinkey === undefined) {
      return;
    }
    var didInit = false;
    function initMunchkin() {
      if (didInit === false) {
        didInit = true;
        Munchkin.init(tarteaucitron.user.marketomunchkinkey);
      }
    }
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = '//munchkin.marketo.net/munchkin.js';
    s.onreadystatechange = function () {
      if (this.readyState == 'complete' || this.readyState == 'loaded') {
        initMunchkin();
      }
    };
    s.onload = initMunchkin;
    document.getElementsByTagName('head')[0].appendChild(s);
  },
  key: 'marketomunchkin',
  name: 'Marketo munchkin',
  needConsent: true,
  type: 'api',
  uri: 'https://documents.marketo.com/legal/cookies',
};

// outbrain
tarteaucitron.services.outbrain = {
  cookies: [],
  js: function () {
    'use strict';

    tarteaucitron.addScript('https://widgets.outbrain.com/outbrain.js');
  },
  key: 'outbrain',
  name: 'Outbrain',
  needConsent: true,
  type: 'ads',
  uri: 'https://www.outbrain.com/fr/advertisers/guidelines/',
};

// affilae
tarteaucitron.services.affilae = {
  cookies: [],
  js: function () {
    'use strict';

    if (tarteaucitron.user.affilae === undefined) {
      return;
    }
        
    window._ae = { pid: tarteaucitron.user.affilae };

    tarteaucitron.addScript('https://static.affilae.com/ae-v3.5.js');
  },
  key: 'affilae',
  name: 'Affilae',
  needConsent: true,
  type: 'ads',
  uri: 'https://affilae.com/en/privacy-cookie-policy/',
};

// Canal-U.tv
tarteaucitron.services.canalu = {
  cookies: [],
  fallback: function () {
    'use strict';
    tarteaucitron.fallback(['canalu_player'], function (elem) {
      return tarteaucitron.engage('canalu');
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['canalu_player'], function (x) {
      var video_title = tarteaucitron.fixSelfXSS(x.getAttribute('videoTitle')),
        frame_url = 'https://www.canal-u.tv/embed/' + video_title;

      return '<div style="position:relative;padding-bottom:56.25%;padding-top:10px;height:0;overflow:hidden;">' +
                   '<iframe src="' + frame_url + '?width=100%&amp;height=100%" ' +
                        'style="position:absolute;top:0;left:0;width:100%;height: 100%;" ' +
                        'frameborder="0" ' +
                        'allowfullscreen ' +
                        'scrolling="no">' +
                   '</iframe>' +
                   '</div>';
    });
  },
  key: 'canalu',
  name: 'Canal-U.tv',
  needConsent: true,
  type: 'video',
  uri: 'https://www.canal-u.tv/conditions-generales-utilisations',
};

// WebTV Normandie Université
tarteaucitron.services.webtvnu = {
  cookies: [],
  fallback: function () {
    'use strict';
    tarteaucitron.fallback(['webtvnu_player'], function (elem) {
      return tarteaucitron.engage('webtvnu');
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['webtvnu_player'], function (x) {
      var frame_url = 'https://webtv.normandie-univ.fr/permalink/' + x.getAttribute('videoID') + '/iframe/',
        width = x.getAttribute('width'),
        height = x.getAttribute('height');

      return '<iframe width="' + width + '" height="' + height + '" src="' + frame_url + '" allowfullscreen="allowfullscreen" allow="autoplay"></iframe>';
    });
  },
  key: 'webtvnu',
  name: 'WebTV Normandie Université',
  needConsent: true,
  type: 'video',
  uri: 'https://docs.google.com/document/d/1tpVclj4QBoAq1meSZgYrpNECwp7dbmb_IhICY3sTl9c/edit',
};

// studizz
tarteaucitron.services.studizz = {
  cookies: [],
  js: function () {
    'use strict';

    if (tarteaucitron.user.studizzToken === undefined) {
      return;
    }

    tarteaucitron.addScript('https://webchat.studizz.fr/webchat.js?token=' + tarteaucitron.user.studizzToken);
  },
  key: 'studizz',
  name: 'Studizz Chatbot',
  needConsent: true,
  type: 'other',
  uri: 'https://group.studizz.fr/',
};

// meteofrance
tarteaucitron.services.meteofrance = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'meteofrance';
    tarteaucitron.fallback(['tac_meteofrance'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['tac_meteofrance'], function (x) {
      var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute('title') || 'Météo France iframe'),
        width = x.getAttribute('width'),
        height = x.getAttribute('height'),
        insee = x.getAttribute('data-insee'),
        allowfullscreen = x.getAttribute('allowfullscreen');

      return '<iframe title="' + frame_title + '" src="https://meteofrance.com/widget/prevision/' + insee + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
    });
  },
  key: 'meteofrance',
  name: 'Météo France',
  needConsent: true,
  type: 'api',
  uri: 'https://meteofrance.com/politique-de-confidentialite',
};

// m6meteo
tarteaucitron.services.m6meteo = {
  cookies: [],
  fallback: function () {
    'use strict';
    var id = 'm6meteo';
    tarteaucitron.fallback(['tac_m6meteo'], function (elem) {

      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['tac_m6meteo'], function (x) {
      var id = x.getAttribute('data-id');

      tarteaucitron.addScript('https://www.meteocity.com/widget/js/'+id);

      return '<div id="cont_'+id+'"><div id="spa_'+id+'"><a id="a_'+id+'" href="#"></a> ©<a target="_top" href="https://www.meteocity.com">M6météo</a></div></div>';
    });
  },
  key: 'm6meteo',
  name: 'M6 Météo',
  needConsent: true,
  type: 'api',
  uri: 'https://gdpr.m6tech.net/charte-confidentialite-m6-web-meteocity.pdf',
};

// mtcaptcha
tarteaucitron.services.mtcaptcha = {
  cookies: ['mtv1Pulse','mtv1ConfSum','mtv1Pong'],
  js: function () {

    window.mtcaptchaConfig = {
      sitekey: tarteaucitron.user.mtcaptchaSitekey,
    };

    tarteaucitron.addScript('https://service.mtcaptcha.com/mtcv1/client/mtcaptcha.min.js');
    tarteaucitron.addScript('https://service2.mtcaptcha.com/mtcv1/client/mtcaptcha2.min.js');
  },
  key: 'mtcaptcha',
  name: 'MTcaptcha',
  needConsent: true,
  readmoreLink: 'https://www.mtcaptcha.com/faq-cookie-declaration',
  type: 'api',

  uri: 'https://www.mtcaptcha.com',
};

// Internet Archive / https://archive.org
tarteaucitron.services.archive = {
  cookies: ['abtest-identifier','donation-identifier'],
  fallback: function () {
    'use strict';
    var id = 'archive';
    tarteaucitron.fallback(['archive_player'], function (elem) {
      elem.style.width = elem.getAttribute('data-width') + 'px';
      elem.style.height = elem.getAttribute('data-height') + 'px';
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['archive_player'], function (x) {
      var video_id = tarteaucitron.getElemAttr(x, 'data-videoID'),
        video_width = tarteaucitron.getElemAttr(x, 'data-width'),
        frame_width = 'width=',
        video_height = tarteaucitron.getElemAttr(x, 'data-height'),
        frame_height = 'height=',
        video_frame;

      if (video_id === undefined) {
        return '';
      }
      if (video_width !== undefined) {
        frame_width += '"' + video_width + '" ';
      } else {
        frame_width += '"" ';
      }
      if (video_height !== undefined) {
        frame_height += '"' + video_height + '" ';
      } else {
        frame_height += '"" ';
      }
      video_frame = '<iframe src="https://archive.org/embed/' + video_id + '" ' + frame_width + frame_height + ' frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>';
      return video_frame;
    });
  },
  key: 'archive',
  name: 'Internet Archive',
  needConsent: true,
  type: 'video',
  uri: 'https://archive.org/about/terms.php',
};

// Gallica
tarteaucitron.services.gallica = {
  cookies: ['dtCookie', 'dtLatC', 'dtPC', 'dtSa', 'rxVisitor', 'rxvt', 'xtvrn'],
  fallback: function () {
    'use strict';
    var id = 'gallica';
    tarteaucitron.fallback(['gallica_player'], function (elem) {
      elem.style = elem.getAttribute('data-style');
      return tarteaucitron.engage(id);
    });
  },
  js: function () {
    'use strict';
    tarteaucitron.fallback(['gallica_player'], function (x) {
      var src = tarteaucitron.getElemAttr(x, 'data-src'),
        style = tarteaucitron.getElemAttr(x, 'data-style'),
        frame;
      if (src === undefined) {
        return '';
      }
      frame = '<iframe style="'+ style + '" src="' + src + '"></iframe>';
      return frame;
    });
  },
  key: 'gallica',
  name: 'Gallica',
  needConsent: true,
  type: 'other',
  uri: 'https://gallica.bnf.fr/edit/und/conditions-dutilisation-des-contenus-de-gallica',
};

// crisp
tarteaucitron.services.crisp = {
  cookies: ['crisp-client', '__cfduid'],
  js: function () {
    'use strict';

    if (tarteaucitron.user.crispID === undefined) {
      return;
    }

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = tarteaucitron.user.crispID;

    tarteaucitron.addScript('https://client.crisp.chat/l.js');
  },
  key: 'crisp',
  name: 'Crisp Chat',
  needConsent: false,
  type: 'other',
  uri: 'https://help.crisp.chat/en/article/crisp-chatbox-cookie-ip-policy-1147xor/',
};

// microanalytics
tarteaucitron.services.microanalytics = {
  cookies: [],
  js: function () {
    'use strict';

    if (tarteaucitron.user.microanalyticsID === undefined) {
      return;
    }

    tarteaucitron.addScript('https://microanalytics.io/js/script.js', tarteaucitron.user.microanalyticsID, undefined, true, 'data-host', 'https://microanalytics.io');
  },
  key: 'microanalytics',
  name: 'MicroAnalytic',
  needConsent: false,
  type: 'analytic',
  uri: 'https://microanalytics.io/page/privacy',
};

// facebookcustomerchat
tarteaucitron.services.facebookcustomerchat = {
  cookies: ['act','c_user','datr','dpr','presence','sb','wd','xs','/tr'],
  fallback: function () {
    'use strict';
    var id = 'facebookcustomerchat';
    tarteaucitron.fallback(['fb-customerchat'], tarteaucitron.engage(id));
  },
  js: function () {
    'use strict';

    if (tarteaucitron.user.facebookChatID === undefined) {
      return;
    }

    tarteaucitron.fallback(['fb-customerchat'], '');
    window.fbAsyncInit=function(){FB.init({ appId:tarteaucitron.user.facebookChatID,autoLogAppEvents:!0,version:'v3.0',xfbml:!0 });};
    tarteaucitron.addScript('https://connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk/xfbml.customerchat.js', 'facebook-jssdk');
  },
  key: 'facebookcustomerchat',
  name: 'Facebook (Customer Chat)',
  needConsent: true,
  type: 'social',
  uri: 'https://www.facebook.com/policies/cookies/',
};

// weborama
tarteaucitron.services.weborama = {
  cookies: [],
  js: function () {
    'use strict';
    tarteaucitron.addScript('https://cstatic.weborama.fr/js/advertiserv2/adperf_conversion.js');
  },
  key: 'weborama',
  name: 'Weborama',
  needConsent: true,
  type: 'analytic',
  uri: 'https://weborama.com/faq-cnil-avril-2021/',
};

// tiktok
tarteaucitron.services.tiktok = {
  cookies: [],
  js: function () {
    'use strict';

    if (tarteaucitron.user.tiktokId === undefined) {
      return;
    }

    tarteaucitron.addScript('https://analytics.tiktok.com/i18n/pixel/sdk.js?sdkid=' + tarteaucitron.user.tiktokId);
  },
  key: 'tiktok',
  name: 'Tiktok',
  needConsent: true,
  type: 'analytic',
  uri: 'https://www.tiktok.com/legal/tiktok-website-cookies-policy',
};

// Klaviyo
tarteaucitron.services.klaviyo = {
  cookies: ['__kla_id'],
  js: function () {
    'use strict';
    if (tarteaucitron.user.klaviyoCompanyId === undefined) {
      return;
    }
    tarteaucitron.addScript('//static.klaviyo.com/onsite/js/klaviyo.js?company_id=' + tarteaucitron.user.klaviyoCompanyId);
  },
  key: 'klaviyo',
  name: 'Klaviyo',
  needConsent: true,
  type: 'ads',
  uri: 'https://help.klaviyo.com/hc/en-us/articles/360034666712-About-Cookies-in-Klaviyo',
};
