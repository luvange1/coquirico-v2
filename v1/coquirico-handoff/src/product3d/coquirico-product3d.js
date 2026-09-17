(function (global) {
  'use strict';

  if (!global.THREE) throw new Error('CoquiricoProduct3D requires THREE r128 or compatible.');

  var THREE = global.THREE;
  var ASSET_ROOT = 'coquirico-handoff/assets/';
  var TEX_ROOT = ASSET_ROOT + 'product3d/textures/';

  var PRODUCTS = {
    'coquetearte': {
      id: 'coquetearte', family: 'can', label: 'Coquetearte',
      eyebrowEs: 'Producto principal · Sin alcohol', eyebrowEn: 'Core product · Non-alcoholic',
      noteEs: 'La lata real y el punto de referencia para toda la familia.',
      noteEn: 'The real can and the reference point for the full family.',
      texture: TEX_ROOT + 'coquetearte-seamless-wrap-v3.webp', accent: '#f2c75d', backdrop: '#193d2b',
      finish: 'cream', condensation: true, authoritative: true
    },
    'el-original': {
      id: 'el-original', family: 'coquito', label: 'El Original Vegan Coquito',
      eyebrowEs: 'Festivo · Disponibilidad por confirmar', eyebrowEn: 'Holiday · Availability TBC',
      noteEs: 'Botella de 750 mL con coco y ron blanco.',
      noteEn: '750 mL bottle made with coconut and white rum.',
      texture: TEX_ROOT + 'el-original-seamless-wrap-v5.webp',
      neckTexture: TEX_ROOT + 'el-original-neck-wrap-v5.webp',
      accent: '#d39b5f', backdrop: '#392016',
      finish: 'ivory', authoritative: false
    },
    'brisa-de-parcha': {
      id: 'brisa-de-parcha', family: 'can', label: 'Brisa de Parcha',
      eyebrowEs: 'Estudio de sabor · No disponible', eyebrowEn: 'Flavor study · Not available',
      noteEs: 'Territorio visual de estudio; no representa una fórmula aprobada.',
      noteEn: 'Visual study territory; it does not represent an approved formula.',
      texture: TEX_ROOT + 'brisa-de-parcha-seamless-wrap-v2.webp', accent: '#f6d859', backdrop: '#6f4d1c',
      finish: 'gold', condensation: true, authoritative: false
    },
    'guayaba-rosada': {
      id: 'guayaba-rosada', family: 'can', label: 'Guayaba Rosada',
      eyebrowEs: 'Estudio de sabor · No disponible', eyebrowEn: 'Flavor study · Not available',
      noteEs: 'Territorio visual de estudio; no representa una fórmula aprobada.',
      noteEn: 'Visual study territory; it does not represent an approved formula.',
      texture: TEX_ROOT + 'guayaba-rosada-seamless-wrap-v2.webp', accent: '#ff927f', backdrop: '#5b2330',
      finish: 'coral', condensation: true, authoritative: false
    },
    'cafe-y-canela': {
      id: 'cafe-y-canela', family: 'can', label: 'Café y Canela',
      eyebrowEs: 'Estudio de sabor · No disponible', eyebrowEn: 'Flavor study · Not available',
      noteEs: 'Territorio visual de estudio; no representa una fórmula aprobada.',
      noteEn: 'Visual study territory; it does not represent an approved formula.',
      texture: TEX_ROOT + 'cafe-y-canela-seamless-wrap-v2.webp', accent: '#d79760', backdrop: '#321b18',
      finish: 'umber', condensation: true, authoritative: false
    },
    'future-rum': {
      id: 'future-rum', family: 'rum', label: 'Rum Expression',
      eyebrowEs: 'Concepto futuro 21+ · No disponible actualmente',
      eyebrowEn: 'Future 21+ concept · Not currently available',
      noteEs: 'Estudio de botella adulta; no anuncia un producto ni una fecha.',
      noteEn: 'Adult bottle study; it does not announce a product or a date.',
      texture: TEX_ROOT + 'future-rum-front-label-v2.webp', accent: '#c7a864', backdrop: '#071a19',
      finish: 'smoked', authoritative: false
    },
    'flamboyan-at-dusk': {
      id: 'flamboyan-at-dusk', family: 'can', label: 'Flamboyán at Dusk',
      eyebrowEs: 'Estudio de arte · No disponible', eyebrowEn: 'Artwork study · Not available',
      noteEs: 'Estudio de empaque artístico; no es un sabor.',
      noteEn: 'Packaging artwork study; it is not a flavor.',
      texture: TEX_ROOT + 'flamboyan-at-dusk-seamless-wrap-v2.webp', accent: '#ee744e', backdrop: '#401d28',
      finish: 'coral', authoritative: false
    },
    'rain-on-palm': {
      id: 'rain-on-palm', family: 'can', label: 'Rain on Palm',
      eyebrowEs: 'Estudio de arte · No disponible', eyebrowEn: 'Artwork study · Not available',
      noteEs: 'Estudio de empaque artístico; no es un sabor.',
      noteEn: 'Packaging artwork study; it is not a flavor.',
      texture: TEX_ROOT + 'rain-on-palm-dark-seamless-wrap-v3.webp', accent: '#68c3ae', backdrop: '#061d1b',
      finish: 'teal', condensation: true, authoritative: false
    },
    'coqui-chorus': {
      id: 'coqui-chorus', family: 'can', label: 'Coquí Chorus',
      eyebrowEs: 'Estudio de arte · No disponible', eyebrowEn: 'Artwork study · Not available',
      noteEs: 'Estudio de empaque artístico; no es un sabor.',
      noteEn: 'Packaging artwork study; it is not a flavor.',
      texture: TEX_ROOT + 'coqui-chorus-seamless-wrap-v2.webp', accent: '#e9b666', backdrop: '#243c2e',
      finish: 'cream', authoritative: false
    },
    'caribbean-night-01': {
      id: 'caribbean-night-01', family: 'can', label: 'Caribbean Night No. 01',
      eyebrowEs: 'Estudio de arte · No disponible', eyebrowEn: 'Artwork study · Not available',
      noteEs: 'Estudio de empaque artístico; no es un sabor.',
      noteEn: 'Packaging artwork study; it is not a flavor.',
      texture: TEX_ROOT + 'caribbean-night-01-seamless-wrap-v2.webp', accent: '#d5ad58', backdrop: '#101633',
      finish: 'indigo', authoritative: false
    }
  };

  function makeEnvironment(renderer, product) {
    var canvas = document.createElement('canvas');
    canvas.width = 768; canvas.height = 384;
    var ctx = canvas.getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 384);
    gradient.addColorStop(0, '#071611');
    gradient.addColorStop(0.36, product.backdrop);
    gradient.addColorStop(0.58, product.accent);
    gradient.addColorStop(0.76, '#244033');
    gradient.addColorStop(1, '#030706');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, 768, 384);
    var glow = ctx.createRadialGradient(570, 112, 4, 570, 112, 180);
    glow.addColorStop(0, 'rgba(255,235,185,.96)');
    glow.addColorStop(0.2, 'rgba(255,203,125,.56)');
    glow.addColorStop(1, 'rgba(255,203,125,0)');
    ctx.fillStyle = glow; ctx.fillRect(0, 0, 768, 384);
    var texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    var pmrem = new THREE.PMREMGenerator(renderer);
    var target = pmrem.fromEquirectangular(texture);
    texture.dispose(); pmrem.dispose();
    return target.texture;
  }

  function loadColorTexture(path, renderer, render) {
    var texture = new THREE.TextureLoader().load(path, function () {
      texture.needsUpdate = true;
      render();
    });
    texture.encoding = THREE.sRGBEncoding;
    texture.wrapS = THREE.RepeatWrapping;
    texture.offset.x = 0.5;
    texture.anisotropy = Math.min(12, renderer.capabilities.getMaxAnisotropy());
    return texture;
  }

  function metal(color, roughness) {
    return new THREE.MeshStandardMaterial({
      color: color, metalness: 1, roughness: roughness,
      envMapIntensity: 1.35
    });
  }

  function addCanEnds(group) {
    var gold = metal(0xd3ae59, 0.24);
    var aluminum = metal(0xc9c8c2, 0.28);
    var darkAluminum = metal(0x817f7a, 0.45);
    var topY = 1.31;
    var topTaper = new THREE.Mesh(new THREE.CylinderGeometry(0.345, 0.46, 0.16, 96, 1, true), gold);
    topTaper.position.y = 1.20; group.add(topTaper);
    var neck = new THREE.Mesh(new THREE.CylinderGeometry(0.345, 0.345, 0.065, 96, 1, true), gold);
    neck.position.y = 1.312; group.add(neck);
    var rim = new THREE.Mesh(new THREE.TorusGeometry(0.345, 0.022, 14, 96), gold);
    rim.rotation.x = Math.PI / 2; rim.position.y = 1.345; group.add(rim);
    var lid = new THREE.Mesh(new THREE.CircleGeometry(0.335, 96), aluminum);
    lid.rotation.x = -Math.PI / 2; lid.position.y = 1.336; group.add(lid);
    var lidInset = new THREE.Mesh(new THREE.RingGeometry(0.245, 0.285, 64), darkAluminum);
    lidInset.rotation.x = -Math.PI / 2; lidInset.position.y = 1.341; group.add(lidInset);
    var tab = new THREE.Mesh(new THREE.RingGeometry(0.05, 0.11, 36), aluminum);
    tab.rotation.x = -Math.PI / 2; tab.scale.y = 1.55;
    tab.position.set(0.045, topY + 0.035, 0.02); group.add(tab);
    var tabBridge = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.012, 0.048), aluminum);
    tabBridge.position.set(-0.035, topY + 0.04, 0.02); group.add(tabBridge);

    var bottomTaper = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.39, 0.15, 96, 1, true), aluminum);
    bottomTaper.position.y = -1.20; group.add(bottomTaper);
    var bottom = new THREE.Mesh(new THREE.CircleGeometry(0.39, 96), darkAluminum);
    bottom.rotation.x = Math.PI / 2; bottom.position.y = -1.278; group.add(bottom);
  }

  function addCondensation(group) {
    var geometry = new THREE.SphereGeometry(1, 8, 6);
    var material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, roughness: 0.08, metalness: 0,
      transmission: 0.42, transparent: true, opacity: 0.44,
      clearcoat: 1, clearcoatRoughness: 0.02, depthWrite: false
    });
    var drops = new THREE.InstancedMesh(geometry, material, 28);
    var dummy = new THREE.Object3D();
    var seed = 417;
    function random() {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    }
    for (var i = 0; i < 28; i++) {
      var angle = -1.12 + random() * 2.24;
      var radius = 0.463;
      dummy.position.set(Math.sin(angle) * radius, -1.02 + random() * 2.05, Math.cos(angle) * radius);
      var size = 0.012 + random() * 0.024;
      dummy.scale.set(size * (0.72 + random() * 0.3), size * (1 + random() * 1.4), size * 0.38);
      dummy.updateMatrix(); drops.setMatrixAt(i, dummy.matrix);
    }
    drops.instanceMatrix.needsUpdate = true;
    group.add(drops);
  }

  function buildCan(product, renderer, render) {
    var group = new THREE.Group();
    var texture = loadColorTexture(product.texture, renderer, render);
    var bodyMaterial = new THREE.MeshPhysicalMaterial({
      map: texture, color: product.authoritative ? 0xd2c6b2 : 0xffffff,
      roughness: 0.44, metalness: 0.14,
      clearcoat: 0.38, clearcoatRoughness: 0.3, envMapIntensity: 0.72
    });
    var body = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 2.25, 128, 2, true), bodyMaterial);
    group.add(body);
    addCanEnds(group);
    if (product.condensation) addCondensation(group);
    group.userData.disposeItems = [texture, bodyMaterial];
    group.rotation.x = -0.035;
    return group;
  }

  function lathe(points, material) {
    var vectors = points.map(function (p) { return new THREE.Vector2(p[0], p[1]); });
    return new THREE.Mesh(new THREE.LatheGeometry(vectors, 128), material);
  }

  function addCapRibs(group, radius, y, height, color, count) {
    var capMat = new THREE.MeshStandardMaterial({ color: color, metalness: 0.12, roughness: 0.33 });
    var cap = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 64), capMat);
    cap.position.y = y; group.add(cap);
    var ribMat = new THREE.MeshStandardMaterial({ color: color, metalness: 0.24, roughness: 0.42 });
    for (var i = 0; i < count; i++) {
      var angle = i / count * Math.PI * 2;
      var rib = new THREE.Mesh(new THREE.BoxGeometry(0.015, height * 0.82, 0.03), ribMat);
      rib.position.set(Math.sin(angle) * (radius + 0.005), y, Math.cos(angle) * (radius + 0.005));
      rib.rotation.y = angle; group.add(rib);
    }
  }

  function buildCoquitoBottle(product, renderer, render) {
    var group = new THREE.Group();
    var ceramic = new THREE.MeshPhysicalMaterial({
      color: 0xf2eee5, roughness: 0.38, metalness: 0,
      clearcoat: 0.32, clearcoatRoughness: 0.28, envMapIntensity: 0.46
    });
    var profile = [
      [0.35, -1.50], [0.42, -1.47], [0.465, -1.38], [0.48, -1.24],
      [0.48, 0.88], [0.47, 0.95], [0.43, 1.04], [0.35, 1.13],
      [0.27, 1.20], [0.225, 1.26], [0.22, 1.53]
    ];
    var bottle = lathe(profile, ceramic); group.add(bottle);
    var base = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.038, 96), ceramic);
    base.position.y = -1.505; group.add(base);

    var cork = new THREE.MeshPhysicalMaterial({
      color: 0x754324, roughness: 0.52, metalness: 0.14,
      clearcoat: 0.12, clearcoatRoughness: 0.44, envMapIntensity: 0.34
    });
    var cap = new THREE.Mesh(new THREE.CylinderGeometry(0.235, 0.235, 0.27, 72), cork);
    cap.position.y = 1.67; group.add(cap);
    var capTop = new THREE.Mesh(new THREE.CylinderGeometry(0.238, 0.238, 0.024, 72), cork);
    capTop.position.y = 1.815; group.add(capTop);
    var capBandMaterial = metal(0xb28142, 0.38);
    var capBand = new THREE.Mesh(new THREE.TorusGeometry(0.229, 0.011, 10, 72), capBandMaterial);
    capBand.rotation.x = Math.PI / 2; capBand.position.y = 1.54; group.add(capBand);

    var wrapTexture = loadColorTexture(product.texture, renderer, render);
    var wrapMaterial = new THREE.MeshPhysicalMaterial({
      map: wrapTexture, color: 0xc9c1b4, roughness: 0.66, metalness: 0,
      clearcoat: 0.1, clearcoatRoughness: 0.54, envMapIntensity: 0.18
    });
    var wrap = new THREE.Mesh(new THREE.CylinderGeometry(0.486, 0.486, 2.14, 128, 1, true), wrapMaterial);
    wrap.position.y = -0.19; group.add(wrap);

    var neckTexture = loadColorTexture(product.neckTexture, renderer, render);
    var neckMaterial = new THREE.MeshPhysicalMaterial({
      map: neckTexture, color: 0xc9c1b4, roughness: 0.68, metalness: 0,
      clearcoat: 0.08, clearcoatRoughness: 0.56, envMapIntensity: 0.16
    });
    var neckWrap = new THREE.Mesh(new THREE.CylinderGeometry(0.226, 0.226, 0.27, 96, 1, true), neckMaterial);
    neckWrap.position.y = 1.39; group.add(neckWrap);
    group.scale.setScalar(0.97);
    group.userData.disposeItems = [wrapTexture, neckTexture, ceramic, cork, capBandMaterial, wrapMaterial, neckMaterial];
    return group;
  }

  function buildRumBottle(product, renderer, render) {
    var group = new THREE.Group();
    var glass = new THREE.MeshPhysicalMaterial({
      color: 0x000d0b, roughness: 0.32, metalness: 0.02,
      clearcoat: 0.84, clearcoatRoughness: 0.14, envMapIntensity: 0.26
    });
    var profile = [
      [0.42, -1.45], [0.52, -1.43], [0.57, -1.34], [0.58, -1.16],
      [0.58, 0.66], [0.565, 0.74], [0.51, 0.84], [0.38, 0.95],
      [0.26, 1.02], [0.215, 1.10], [0.215, 1.39]
    ];
    group.add(lathe(profile, glass));
    var baseRing = new THREE.Mesh(new THREE.TorusGeometry(0.54, 0.035, 16, 96), glass);
    baseRing.rotation.x = Math.PI / 2; baseRing.position.y = -1.42; group.add(baseRing);
    var baseDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.035, 96), glass);
    baseDisc.position.y = -1.455; group.add(baseDisc);

    var closureGold = metal(0xa77c2f, 0.2);
    var cap = new THREE.Mesh(new THREE.CylinderGeometry(0.255, 0.255, 0.285, 72), closureGold);
    cap.position.y = 1.535; group.add(cap);
    var capTop = new THREE.Mesh(new THREE.TorusGeometry(0.252, 0.018, 12, 72), closureGold);
    capTop.rotation.x = Math.PI / 2; capTop.position.y = 1.678; group.add(capTop);
    var capBottom = capTop.clone(); capBottom.position.y = 1.392; group.add(capBottom);
    var ribGeometry = new THREE.BoxGeometry(0.007, 0.2, 0.014);
    var ribs = new THREE.InstancedMesh(ribGeometry, closureGold, 30);
    var ribDummy = new THREE.Object3D();
    for (var ribIndex = 0; ribIndex < 30; ribIndex++) {
      var ribAngle = ribIndex / 30 * Math.PI * 2;
      ribDummy.position.set(Math.sin(ribAngle) * 0.259, 1.535, Math.cos(ribAngle) * 0.259);
      ribDummy.rotation.y = ribAngle; ribDummy.updateMatrix();
      ribs.setMatrixAt(ribIndex, ribDummy.matrix);
    }
    ribs.instanceMatrix.needsUpdate = true; group.add(ribs);
    var neckBand = new THREE.Mesh(new THREE.TorusGeometry(0.218, 0.022, 14, 72), closureGold);
    neckBand.rotation.x = Math.PI / 2; neckBand.position.y = 1.39; group.add(neckBand);

    var labelTexture = loadColorTexture(product.texture, renderer, render);
    labelTexture.offset.x = 0;
    labelTexture.wrapS = THREE.ClampToEdgeWrapping;
    var labelMaterial = new THREE.MeshBasicMaterial({
      map: labelTexture, color: 0xffffff, side: THREE.DoubleSide,
      toneMapped: false
    });
    var label = new THREE.Mesh(
      new THREE.CylinderGeometry(0.586, 0.586, 1.4, 96, 1, true, -0.915, 1.83),
      labelMaterial
    );
    label.position.y = -0.04; group.add(label);
    group.scale.setScalar(0.94);
    group.userData.disposeItems = [labelTexture, glass, labelMaterial, closureGold];
    return group;
  }

  function makeContactShadow() {
    var canvas = document.createElement('canvas'); canvas.width = canvas.height = 192;
    var ctx = canvas.getContext('2d');
    var gradient = ctx.createRadialGradient(96, 96, 5, 96, 96, 92);
    gradient.addColorStop(0, 'rgba(0,0,0,.62)'); gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, 192, 192);
    var texture = new THREE.CanvasTexture(canvas);
    var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.72, depthWrite: false });
    var shadow = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.66), material);
    shadow.rotation.x = -Math.PI / 2; shadow.position.y = -1.52;
    shadow.userData.disposeItems = [texture, material];
    return shadow;
  }

  function mount(canvas, options) {
    options = options || {};
    var initial = PRODUCTS[options.product] || PRODUCTS.coquetearte;
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(global.devicePixelRatio || 1, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.99;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(31, 1, 0.1, 50);
    camera.position.set(0, 0.08, 6.4);
    scene.add(new THREE.HemisphereLight(0xe6f4de, 0x081610, 0.78));
    var key = new THREE.DirectionalLight(0xffe4bd, 1.86); key.position.set(3.5, 4.5, 4); scene.add(key);
    var fill = new THREE.DirectionalLight(0x86c2a3, 0.7); fill.position.set(-4, 0.8, 3); scene.add(fill);
    var rim = new THREE.DirectionalLight(0xbfe9ff, 1.28); rim.position.set(-2.5, 3.5, -4); scene.add(rim);
    var warm = new THREE.PointLight(0xffc366, 0.46, 14); warm.position.set(1.8, 0.5, 3); scene.add(warm);

    var root = new THREE.Group(); scene.add(root);
    var shadow = makeContactShadow(); scene.add(shadow);
    var current = null;
    var product = initial;
    var environment = null;
    var reduced = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var dragging = false, lastX = 0, lastY = 0, userY = 0, userX = 0;
    var intro = 0, visible = true, destroyed = false;
    var clock = new THREE.Clock();

    function render() { if (!destroyed) renderer.render(scene, camera); }

    function resetRotation() {
      userX = 0; userY = 0;
      root.rotation.x = 0; root.rotation.y = 0;
      render();
    }

    function build(next) {
      if (next.family === 'coquito') return buildCoquitoBottle(next, renderer, render);
      if (next.family === 'rum') return buildRumBottle(next, renderer, render);
      return buildCan(next, renderer, render);
    }

    function disposeObject(object) {
      object.traverse(function (node) {
        if (node.geometry) node.geometry.dispose();
        if (node.material) {
          var list = Array.isArray(node.material) ? node.material : [node.material];
          list.forEach(function (material) {
            if (material.map) material.map.dispose();
            material.dispose();
          });
        }
      });
    }

    function setProduct(id) {
      var next = PRODUCTS[id]; if (!next) return false;
      product = next;
      if (current) { root.remove(current); disposeObject(current); }
      if (environment) environment.dispose();
      environment = makeEnvironment(renderer, next); scene.environment = environment;
      current = build(next); root.add(current);
      resetRotation(); intro = reduced ? 1 : 0;
      canvas.style.setProperty('--product-accent', next.accent);
      canvas.dispatchEvent(new CustomEvent('coquirico:productchange', { detail: next }));
      render(); return true;
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      var width = Math.max(1, Math.round(rect.width));
      var height = Math.max(1, Math.round(rect.height));
      var pixelRatio = Math.min(global.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(width * pixelRatio) || canvas.height !== Math.round(height * pixelRatio)) {
        renderer.setPixelRatio(pixelRatio); renderer.setSize(width, height, false);
        camera.aspect = width / height; camera.updateProjectionMatrix();
      }
      camera.position.z = width < 520 ? 7.0 : 6.25;
      render();
    }

    function pointerDown(event) {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      dragging = true; lastX = event.clientX; lastY = event.clientY;
      canvas.classList.add('is-dragging');
      try { canvas.setPointerCapture(event.pointerId); } catch (error) {}
    }
    function pointerMove(event) {
      if (!dragging) return;
      var dx = event.clientX - lastX, dy = event.clientY - lastY;
      lastX = event.clientX; lastY = event.clientY;
      /* Free grab: full-speed yaw, and pitch wide enough to tip the can right over (see lid/base).
         Was clamped to a -0.28..0.22 sliver, which made drags feel like the can was stuck. */
      userY += dx * 0.011; userX = Math.max(-1.6, Math.min(1.6, userX + dy * 0.009));
      if (reduced) { root.rotation.y = userY; root.rotation.x = userX; render(); }
    }
    function pointerUp(event) {
      dragging = false; canvas.classList.remove('is-dragging');
      try { canvas.releasePointerCapture(event.pointerId); } catch (error) {}
    }
    canvas.addEventListener('pointerdown', pointerDown);
    canvas.addEventListener('pointermove', pointerMove);
    canvas.addEventListener('pointerup', pointerUp);
    canvas.addEventListener('pointercancel', pointerUp);
    canvas.addEventListener('dblclick', resetRotation);
    global.addEventListener('resize', resize, { passive: true });

    var observer = global.IntersectionObserver ? new IntersectionObserver(function (entries) {
      visible = entries[0] && entries[0].isIntersecting;
    }, { rootMargin: '120px' }) : null;
    if (observer) observer.observe(canvas);
    document.addEventListener('visibilitychange', function () { visible = !document.hidden; });

    function tick() {
      if (destroyed || reduced) return;
      global.requestAnimationFrame(tick);
      if (!visible) return;
      var elapsed = clock.getElapsedTime();
      intro += (1 - intro) * 0.09;
      var ease = 1 - Math.pow(1 - Math.min(1, intro), 3);
      root.scale.setScalar(0.78 + 0.22 * ease);
      var idleYaw = reduced ? 0 : Math.sin(elapsed * 0.52) * 0.055;
      root.rotation.y += ((userY + idleYaw) - root.rotation.y) * (dragging ? 0.24 : 0.065);
      root.rotation.x += (userX - root.rotation.x) * 0.08;
      root.position.y = reduced ? 0 : Math.sin(elapsed * 0.82) * 0.035;
      shadow.material.opacity = 0.62 - root.position.y * 1.2;
      render();
    }

    function destroy() {
      destroyed = true;
      if (observer) observer.disconnect();
      canvas.removeEventListener('pointerdown', pointerDown);
      canvas.removeEventListener('pointermove', pointerMove);
      canvas.removeEventListener('pointerup', pointerUp);
      canvas.removeEventListener('pointercancel', pointerUp);
      global.removeEventListener('resize', resize);
      if (current) disposeObject(current);
      disposeObject(shadow);
      if (environment) environment.dispose();
      renderer.dispose();
    }

    setProduct(initial.id); resize(); tick();
    return {
      setProduct: setProduct,
      resize: resize,
      resetRotation: resetRotation,
      destroy: destroy,
      getProduct: function () { return product; }
    };
  }

  global.CoquiricoProduct3D = { products: PRODUCTS, mount: mount };
})(window);
