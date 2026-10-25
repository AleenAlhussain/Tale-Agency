module.exports = [
"[project]/apps/web/src/lib/hero3d.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "startHero",
    ()=>startHero
]);
/* TALAL·AT hero: Michelangelo's David as a marble bust with a VR visor, plus faint floating shapes.
   Scrolling turns the head, the cursor tilts it, everything stops when you stop.
   David bust: Scan the World (via Wikimedia Commons), CC BY-SA 4.0. Ported from the static site as-is. */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/geometries/RoundedBoxGeometry.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$environments$2f$RoomEnvironment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/environments/RoomEnvironment.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$utils$2f$BufferGeometryUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/utils/BufferGeometryUtils.js [app-ssr] (ecmascript)");
;
;
;
;
const CFG = Object.assign({
    gogPos: [
        0.19,
        0.158,
        0.176
    ],
    gogYaw: 0.87,
    gogPitch: -0.05,
    gogSize: [
        0.6,
        0.2,
        0.32
    ],
    restYaw: 0.02,
    restPitch: -0.05
}, window.HERO3D_CFG || {});
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = matchMedia('(pointer: coarse)').matches;
function cssv(n) {
    return getComputedStyle(root).getPropertyValue(n).trim();
}
function dark() {
    return root.getAttribute('data-theme') === 'dark';
}
function decodeMesh(M) {
    /* the mesh arrives as a binary file (public/assets/3d/david-mesh.bin) */ const buf = M.buf;
    const q = new Int16Array(buf.buffer, 0, M.n * 3), pos = new Float32Array(M.n * 3), k = M.s / 32767;
    for(let i = 0; i < q.length; i++)pos[i] = q[i] * k;
    const off = M.n * 6, isz = M.u32 ? 4 : 2, iend = off + M.f * 3 * isz;
    const idx = M.u32 ? new Uint32Array(buf.buffer.slice(off, iend)) : new Uint16Array(buf.buffer.slice(off, iend));
    const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    g.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](pos, 3));
    g.setIndex(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](idx, 1));
    if (M.ao) g.setAttribute('ao', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](new Uint8Array(buf.buffer.slice(iend, iend + M.n)), 1, true));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$utils$2f$BufferGeometryUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toCreasedNormals"])(g, Math.PI / 3);
}
const NOISE = `vec3 h3(vec3 p){p=fract(p*vec3(.1031,.1030,.0973));p+=dot(p,p.yxz+33.33);return fract((p.xxy+p.yxx)*p.zyx);}
  float vn(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
    float a=h3(i).x,b=h3(i+vec3(1,0,0)).x,c=h3(i+vec3(0,1,0)).x,d=h3(i+vec3(1,1,0)).x,e=h3(i+vec3(0,0,1)).x,g=h3(i+vec3(1,0,1)).x,k=h3(i+vec3(0,1,1)).x,l=h3(i+vec3(1,1,1)).x;
    return mix(mix(mix(a,b,f.x),mix(c,d,f.x),f.y),mix(mix(e,g,f.x),mix(k,l,f.x),f.y),f.z);}
  float fbm(vec3 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*vn(p);p*=2.03;a*=.5;}return v;}
  float smear(vec3 o){
    vec3 q=vec3(o.x*.82+o.y*.57,-o.x*.57+o.y*.82,o.z);
    float base=fbm(vec3(q.x*1.5,q.y*5.2,q.z*1.5)+3.1);
    float m=smoothstep(.55,.6,base);
    float bristle=smoothstep(.2,.7,vn(vec3(q.x*2.,q.y*70.,q.z*2.)));
    m*=mix(.35,1.,bristle);
    m*=smoothstep(-.35,.05,o.x+o.z*.5+.12*sin(o.y*7.));
    float face=smoothstep(.1,.2,o.x*.77+o.z*.64)*smoothstep(-.08,.02,o.y)*smoothstep(.4,.3,o.y);
    return clamp(m*(1.-face),0.,1.);}
  float ridge(vec3 p){return 1.-abs(vn(p)*2.-1.);}
  /* > 0 inside the marble, < 0 broken away: a jagged break under the chest, the arms snapped off at the shoulders */
  float keepF(vec3 p){
    float nb=(fbm(p*vec3(4.2,2.,4.2))-.5)*.22+(ridge(p*9.)-.5)*.09+(vn(p*27.)-.5)*.025+smoothstep(.8,.97,ridge(p*vec3(3.2,1.,3.2)+1.3))*.14;
    float fb=p.y-(-.6+.28*p.x-.3*p.z+nb);
    float e=pow((p.x-.056)/.49,2.)+pow((p.z-.031)/.43,2.);
    float ns=(fbm(p*vec3(3.,5.,3.)+11.)-.5)*.5+(ridge(p*vec3(9.,16.,9.)+3.)-.5)*.22+(vn(p*30.)-.5)*.05;
    float fs=(1.05+(p.y+.3)*1.1-e+ns)*.35;
    float fh=mix(.667-(p.x+p.z)+(fbm(p*6.+5.)-.5)*.14+(ridge(p*15.)-.5)*.04,1.,smoothstep(-.17,-.06,p.y));
    return min(min(fb,fs),fh);}`;
/* LED dot-matrix texture: lit dots run magenta to neon */ function ledTexture(text) {
    const C = 72, Rw = 16, cell = 16, cv = document.createElement('canvas');
    cv.width = C * cell;
    cv.height = Rw * cell;
    const x = cv.getContext('2d');
    const bm = document.createElement('canvas');
    bm.width = C;
    bm.height = Rw;
    const b = bm.getContext('2d');
    b.fillStyle = '#000';
    b.fillRect(0, 0, C, Rw);
    b.fillStyle = '#fff';
    b.textBaseline = 'middle';
    b.textAlign = 'center';
    b.font = '900 15px "Arial Black","Helvetica Neue",Arial,sans-serif';
    b.fillText(text, C / 2, Rw / 2 + 1);
    const d = b.getImageData(0, 0, C, Rw).data;
    x.fillStyle = '#0b0306';
    x.fillRect(0, 0, cv.width, cv.height);
    const A = [
        255,
        26,
        140
    ], B = [
        204,
        255,
        0
    ];
    for(let j = 0; j < Rw; j++)for(let i = 0; i < C; i++){
        const on = d[(j * C + i) * 4] > 110, t = i / (C - 1), k = Math.min(1, Math.max(0, (t - .15) / .75)), c = [
            0,
            1,
            2
        ].map((n)=>Math.round(A[n] + (B[n] - A[n]) * k));
        x.beginPath();
        x.arc(i * cell + cell / 2, j * cell + cell / 2, cell * .36, 0, 6.283);
        if (on) {
            x.shadowColor = 'rgb(' + c + ')';
            x.shadowBlur = 10;
            x.fillStyle = 'rgb(' + c + ')';
        } else {
            x.shadowBlur = 0;
            x.fillStyle = 'rgba(120,30,60,.16)';
        }
        x.fill();
    }
    const tex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasTexture"](cv);
    tex.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    tex.anisotropy = 4;
    return tex;
}
/* ---------- David ---------- */ function makeDavid(host, opts) {
    opts = opts || {};
    const canvas = document.createElement('canvas');
    canvas.className = 'd3';
    host.appendChild(canvas);
    const R = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebGLRenderer"]({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: !!opts.keep
    });
    R.setPixelRatio(Math.min(devicePixelRatio || 1, coarse ? 1.5 : 2));
    R.outputColorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    R.toneMapping = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"];
    R.toneMappingExposure = 1.08;
    const S = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"]();
    const pm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PMREMGenerator"](R);
    S.environment = pm.fromScene(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$environments$2f$RoomEnvironment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoomEnvironment"](), 0.04).texture;
    const cam = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](24, 1, 0.1, 50);
    cam.position.set(0, 0, 4.6);
    /* studio light like the reference: soft key from upper left, gentle fill, cool rim */ S.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HemisphereLight"](0xffffff, 0x7d776f, 0.85));
    const key = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DirectionalLight"](0xfff4ea, 2.5);
    key.position.set(-2.6, 2.8, 3.0);
    S.add(key);
    const fill = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DirectionalLight"](0xeef4ff, 0.55);
    fill.position.set(2.8, 0.2, 2.2);
    S.add(fill);
    const rim = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DirectionalLight"](0xffffff, 0.7);
    rim.position.set(2.2, 2.2, -2.8);
    S.add(rim);
    const geo = decodeMesh(window.DAVID_MESH);
    const uCop = {
        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](cssv('--copper') || '#B77536')
    };
    /* marble: light warm white, baked occlusion in the curls, faint veins, fine grain, copper smears */ const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: 0xE6E2DC,
        metalness: 0,
        roughness: 0.62,
        envMapIntensity: 0.5,
        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"]
    });
    mat.onBeforeCompile = (sh)=>{
        sh.uniforms.uCop = uCop;
        sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nattribute float ao;varying float vAo;varying vec3 vO;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvO=position;vAo=ao;');
        sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vAo;varying vec3 vO;uniform vec3 uCop;float gF;\n' + NOISE).replace('#include <clipping_planes_fragment>', '#include <clipping_planes_fragment>\ngF=keepF(vO);if(gF<0.)discard;').replace('#include <color_fragment>', `#include <color_fragment>
        if(!gl_FrontFacing){float g2=vn(vO*90.)*.1+fbm(vO*14.)*.16;diffuseColor.rgb=diffuseColor.rgb*vec3(.98,.95,.91)*(.70-g2);}else{
        float vein=fbm(vO*vec3(2.6,4.2,2.6)+vec3(1.7,.3,4.1));float vl=1.-smoothstep(.0,.035,abs(vein-.52));
        float grain=vn(vO*150.)*.05+vn(vO*42.)*.04+fbm(vO*9.)*.05;
        float ao=pow(clamp(vAo,0.,1.),1.6);
        vec3 marble=diffuseColor.rgb*(1.-grain)*(1.-vl*.09)*mix(.3,1.,ao);
        float sm=smear(vO);diffuseColor.rgb=mix(marble,uCop*mix(.6,1.05,ao),sm*.85);
        float chip=1.-smoothstep(.0,.035,gF);diffuseColor.rgb*=1.-chip*(.18+vn(vO*80.)*.18);}`).replace('#include <normal_fragment_maps>', '#include <normal_fragment_maps>\nif(!gl_FrontFacing){vec3 pn=vec3(vn(vO*38.)-.5,vn(vO*38.+7.)-.5,0.)*.7+vec3(vn(vO*120.)-.5,vn(vO*120.+3.)-.5,0.)*.25;normal=normalize(vec3(0.,0.,1.)+pn*1.4);}').replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor=mix(roughnessFactor,.5,smear(vO))+vn(vO*60.)*.08;').replace('#include <aomap_fragment>', '#include <aomap_fragment>\nif(gl_FrontFacing){reflectedLight.indirectDiffuse*=mix(.15,1.,pow(clamp(vAo,0.,1.),1.6));reflectedLight.directDiffuse*=mix(.55,1.,clamp(vAo,0.,1.));}reflectedLight.indirectSpecular*=pow(clamp(vAo,0.,1.),1.5);');
    };
    const bust = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geo, mat);
    const head = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
    head.add(bust);
    head.position.y = -(0.5 + window.DAVID_MESH.yb) / 2;
    /* VR visor like the reference: a solid rounded box over the eyes, HELLO glowing on its face */ const gog = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
    gog.position.fromArray(CFG.gogPos);
    gog.rotation.set(CFG.gogPitch, CFG.gogYaw, 0, 'YXZ');
    head.add(gog);
    const GW = .6, GH = .2, GD = .32;
    const shell = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: 0x2a2a2d,
        roughness: .3,
        metalness: .18,
        envMapIntensity: 1.15
    });
    const box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](GW, GH, GD, 6, .055), shell);
    box.position.z = .02;
    gog.add(box);
    const vm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
        uniforms: {
            map: {
                value: ledTexture('HELLO')
            },
            uGlow: {
                value: 1
            },
            uTime: {
                value: 0
            }
        },
        toneMapped: false,
        transparent: true,
        vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
        fragmentShader: `uniform sampler2D map;uniform float uGlow;uniform float uTime;varying vec2 vUv;
      void main(){vec3 c=texture2D(map,vUv).rgb;float scan=.92+.08*sin(vUv.y*120.+uTime*3.);
        vec2 e=min(vUv,1.-vUv);float edge=smoothstep(0.,.06,min(e.x*3.4,e.y));
        vec3 col=c*(.45+1.15*uGlow)*scan;float a=edge;gl_FragColor=vec4(pow(col,vec3(1./2.2)),a);}`
    });
    const screen = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlaneGeometry"](GW - .1, GH - .07), vm);
    screen.position.set(0, 0, .02 + GD / 2 + .0015);
    gog.add(screen);
    const glass = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlaneGeometry"](GW - .1, GH - .07), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"]({
        color: 0xffffff,
        transparent: true,
        opacity: .1,
        roughness: .05,
        metalness: 0,
        clearcoat: 1,
        envMapIntensity: 1.5,
        depthWrite: false
    }));
    glass.position.set(0, 0, .02 + GD / 2 + .003);
    gog.add(glass);
    /* fragments of the break, floating under the bust */ const debris = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
    head.add(debris);
    const chipMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: 0xE2DED7,
        roughness: .82,
        metalness: 0,
        flatShading: true,
        envMapIntensity: .45
    });
    let seed = 11;
    const rnd = ()=>(seed = seed * 16807 % 2147483647) / 2147483647;
    const CH = [
        [
            -.44,
            -.74,
            .06,
            .06,
            1.6
        ],
        [
            -.1,
            -.88,
            .2,
            .045,
            1.2
        ],
        [
            .22,
            -.84,
            .22,
            .035,
            1.8
        ],
        [
            .46,
            -.7,
            .02,
            .05,
            1.3
        ],
        [
            .06,
            -.93,
            -.04,
            .06,
            1.5
        ],
        [
            -.36,
            -.9,
            -.12,
            .03,
            1.4
        ],
        [
            .36,
            -.92,
            -.14,
            .028,
            1.7
        ]
    ];
    const chips = CH.map((c)=>{
        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DodecahedronGeometry"](1, 0), pa = g.attributes.position, jit = {};
        for(let i = 0; i < pa.count; i++){
            const key = pa.getX(i).toFixed(3) + ',' + pa.getY(i).toFixed(3) + ',' + pa.getZ(i).toFixed(3);
            if (!jit[key]) jit[key] = [
                .7 + rnd() * .5,
                .7 + rnd() * .5,
                .7 + rnd() * .5
            ];
            const j = jit[key];
            pa.setXYZ(i, pa.getX(i) * j[0], pa.getY(i) * j[1], pa.getZ(i) * j[2]);
        }
        g.computeVertexNormals();
        const o = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](g, chipMat);
        o.scale.set(c[3] * c[4], c[3], c[3] * .8);
        o.position.set(c[0], c[1], c[2]);
        o.rotation.set(rnd() * 6, rnd() * 6, rnd() * 6);
        debris.add(o);
        return {
            o,
            b: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](c[0], c[1], c[2]),
            ph: rnd() * 6.3,
            sp: .45 + rnd() * .5,
            rs: (rnd() - .5) * .6
        };
    });
    const dustN = 40, dp = new Float32Array(dustN * 3);
    for(let i = 0; i < dustN; i++){
        dp[i * 3] = (rnd() - .5) * 1.1;
        dp[i * 3 + 1] = -.68 - rnd() * .26;
        dp[i * 3 + 2] = (rnd() - .5) * .8;
    }
    const dg = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    dg.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](dp, 3));
    const dust = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Points"](dg, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointsMaterial"]({
        color: 0xcfc9c0,
        size: .012,
        sizeAttenuation: true,
        transparent: true,
        opacity: .75,
        depthWrite: false
    }));
    debris.add(dust);
    function floatDebris(t, spread) {
        chips.forEach((c)=>{
            const out = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](c.b.x, 0, c.b.z).multiplyScalar(spread * .5);
            c.o.position.set(c.b.x + out.x, c.b.y + Math.sin(t * c.sp + c.ph) * .018 - spread * .05, c.b.z + out.z);
            c.o.rotation.x += .003 + c.rs * .004 + spread * .02;
            c.o.rotation.y += .004 + c.rs * .003 + spread * .02;
        });
        dust.rotation.y = t * .03;
        dust.position.y = Math.sin(t * .4) * .01 - spread * .03;
    }
    const pivot = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
    pivot.add(head);
    S.add(pivot);
    let W = 1, H = 1;
    function size() {
        const r = host.getBoundingClientRect();
        W = Math.max(2, r.width);
        H = Math.max(2, r.height);
        R.setSize(W, H, false);
        cam.aspect = W / H;
        const fit = opts.fit || 1.0;
        const vh = 2 * cam.position.z * Math.tan(cam.fov * Math.PI / 360);
        pivot.scale.setScalar(vh * fit);
        cam.updateProjectionMatrix();
    }
    size();
    function setTheme() {
        uCop.value.set(cssv('--copper') || '#B77536');
    }
    return {
        R,
        S,
        cam,
        pivot,
        head,
        gog,
        vm,
        mat,
        size,
        setTheme,
        floatDebris,
        render () {
            R.render(S, cam);
        }
    };
}
/* ---------- floating shapes ---------- */ function makeShapes(host) {
    const canvas = document.createElement('canvas');
    canvas.className = 'bg3d-c';
    host.appendChild(canvas);
    const R = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebGLRenderer"]({
        canvas,
        antialias: true,
        alpha: true
    });
    R.setPixelRatio(Math.min(devicePixelRatio || 1, coarse ? 1.25 : 1.6));
    R.outputColorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    R.toneMapping = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"];
    const S = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"]();
    const pm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PMREMGenerator"](R);
    S.environment = pm.fromScene(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$environments$2f$RoomEnvironment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoomEnvironment"](), 0.04).texture;
    const cam = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](32, 1, 0.1, 60);
    cam.position.set(0, 0, 10);
    S.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HemisphereLight"](0xffffff, 0xdedad3, 1.6));
    const dl = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DirectionalLight"](0xffffff, .7);
    dl.position.set(-3, 4, 5);
    S.add(dl);
    const white = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: 0xffffff,
        roughness: 1,
        metalness: 0,
        transparent: true,
        opacity: .55,
        depthWrite: false
    });
    const lines = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
        color: 0xffffff,
        transparent: true,
        opacity: .5,
        depthWrite: false
    });
    const G = {
        torus: ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](.62, .2, 32, 96),
        ring: ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](.7, .03, 12, 120),
        sphere: ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](.45, 48, 32),
        capsule: ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CapsuleGeometry"](.24, .8, 12, 32),
        box: ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$geometries$2f$RoundedBoxGeometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RoundedBoxGeometry"](.8, .8, .8, 4, .14),
        cone: ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConeGeometry"](.42, .9, 48),
        ico: ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IcosahedronGeometry"](.7, 0)
    };
    /* [type, x (fraction of half width), y (fraction of half height), z, scale] — white, barely there */ const L = [
        [
            'torus',
            -.84,
            .5,
            -3,
            1.1
        ],
        [
            'sphere',
            -.46,
            -.5,
            -3,
            .8
        ],
        [
            'ico',
            -.72,
            -.08,
            -4.5,
            1.2
        ],
        [
            'capsule',
            .7,
            .62,
            -4,
            1
        ],
        [
            'ring',
            .88,
            -.22,
            -3,
            1.2
        ],
        [
            'box',
            .46,
            -.5,
            -4.5,
            .8
        ],
        [
            'cone',
            .28,
            .84,
            -6,
            .8
        ]
    ];
    const list = (coarse ? L.filter((_, i)=>i % 2 === 0) : L).map((d)=>{
        let o;
        const g = G[d[0]]();
        o = d[0] === 'ico' ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineSegments"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EdgesGeometry"](g), lines) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](g, white);
        o.rotation.set(Math.random() * 6, Math.random() * 6, 0);
        S.add(o);
        return {
            o,
            base: d[4],
            fx: d[1],
            fy: d[2],
            z: d[3],
            ph: Math.random() * 6.28,
            sp: .2 + Math.random() * .3,
            rs: (Math.random() - .5) * .5
        };
    });
    let W = 1, H = 1;
    let k = 1;
    function size() {
        const r = host.getBoundingClientRect();
        W = Math.max(2, r.width);
        H = Math.max(2, r.height);
        R.setSize(W, H, false);
        cam.aspect = W / H;
        cam.updateProjectionMatrix();
        k = Math.max(.42, Math.min(1, cam.aspect / 1.5));
        list.forEach((s)=>s.o.scale.setScalar(s.base * k));
    }
    size();
    function setTheme() {
        const d = dark();
        white.opacity = d ? .07 : .55;
        lines.opacity = d ? .12 : .5;
    }
    setTheme();
    function update(t, scrollY1, spin, mx, my) {
        list.forEach((s)=>{
            const vh = 2 * (cam.position.z - s.z) * Math.tan(cam.fov * Math.PI / 360), vw = vh * cam.aspect;
            const par = 1 / (cam.position.z - s.z) * scrollY1 * 0.012;
            s.o.position.set(s.fx * vw * .5 + mx * -s.z * .04, s.fy * vh * .5 + Math.sin(t * s.sp + s.ph) * .18 + par, s.z);
            s.o.rotation.x += .002 + s.rs * .004 + spin * .6;
            s.o.rotation.y += .003 + s.rs * .003 + spin * .9;
        });
        cam.position.x += (mx * .25 - cam.position.x) * .05;
        cam.position.y += (-my * .18 - cam.position.y) * .05;
        cam.lookAt(0, 0, 0);
        R.render(S, cam);
    }
    return {
        R,
        S,
        cam,
        size,
        setTheme,
        update
    };
}
function startHero(mesh) {
    window.DAVID_MESH = mesh;
    const hero = document.getElementById('hero'), wrap = document.getElementById('d3wrap'), bgh = document.getElementById('bg3d');
    if (!hero || !wrap || !mesh) return ()=>{};
    try {
        const c = document.createElement('canvas');
        if (!(c.getContext('webgl2') || c.getContext('webgl'))) return ()=>{};
    } catch (e) {
        return ()=>{};
    }
    let D, B;
    try {
        D = makeDavid(wrap, {
            fit: .54
        });
        B = bgh ? makeShapes(bgh) : null;
    } catch (e) {
        console.warn('3D hero off:', e);
        return ()=>{};
    }
    hero.classList.add('has3d');
    let spread = 0, yaw = 0, pitch = 0, roll = 0, vy = 0, vp = 0, lastY = scrollY, mx = 0, my = 0, sx = 0, sy = 0, visible = true, introAt = 0, glow = 0;
    const ease = (t)=>1 - Math.pow(1 - t, 4);
    function introReady() {
        const l = document.getElementById('loader');
        return !l || l.classList.contains('done');
    }
    /* at the very top the page cannot scroll up, so the wheel still turns him */ addEventListener('wheel', (e)=>{
        if (scrollY <= 0 && e.deltaY < 0) {
            const d = Math.max(-60, e.deltaY);
            vy += d * 0.0007;
            vp += d * 0.00015;
        }
    }, {
        passive: true
    });
    addEventListener('pointermove', (e)=>{
        const r = hero.getBoundingClientRect();
        mx = (e.clientX - r.left) / r.width - .5;
        my = (e.clientY - r.top) / r.height - .5;
    }, {
        passive: true
    });
    if ('IntersectionObserver' in window) new IntersectionObserver((es)=>{
        visible = es[0].isIntersecting;
    }, {
        rootMargin: '80px'
    }).observe(hero);
    new MutationObserver(()=>{
        D.setTheme();
        B && B.setTheme();
    }).observe(document.documentElement, {
        attributes: true,
        attributeFilter: [
            'data-theme'
        ]
    });
    if ('ResizeObserver' in window) {
        const ro = new ResizeObserver(()=>{
            D.size();
            B && B.size();
        });
        ro.observe(wrap);
        bgh && ro.observe(bgh);
    } else addEventListener('resize', ()=>{
        D.size();
        B && B.size();
    });
    const t0 = performance.now();
    let raf = 0, stopped = false;
    (function loop(now) {
        if (stopped) return;
        raf = requestAnimationFrame(loop);
        const t = (now - t0) / 1000, dy = scrollY - lastY;
        lastY = scrollY;
        if (!introAt && introReady()) {
            introAt = now;
            hero.classList.add('d3on');
        }
        if (!visible) return;
        const ip = introAt ? Math.min(1, (now - introAt) / 2400) : 0, ie = ease(ip);
        /* scroll down turns right and nods down, scroll up turns left and lifts */ if (!reduce) {
            vy += dy * 0.0008;
            vp += dy * 0.00018;
        }
        vy *= 0.9;
        vp *= 0.88;
        if (Math.abs(vy) < 1e-5) vy = 0;
        if (Math.abs(vp) < 1e-5) vp = 0;
        yaw += vy;
        pitch = Math.max(-.42, Math.min(.42, pitch + vp));
        roll += (vy * 3.2 - roll) * .12;
        sx += (mx - sx) * .06;
        sy += (my - sy) * .06;
        const introSpin = -2.6 * (1 - ie);
        D.pivot.rotation.set(CFG.restPitch + pitch + sy * .22, CFG.restYaw + yaw + introSpin + sx * .45, roll * .6, 'YXZ');
        D.head.scale.setScalar(.7 + .3 * ie);
        glow += ((introAt ? 1 : 0) - glow) * .04;
        D.vm.uniforms.uGlow.value = glow;
        D.vm.uniforms.uTime.value = reduce ? 1.3 : t;
        spread += (Math.min(1, Math.abs(vy) * 28) - spread) * .06;
        D.floatDebris(reduce ? 0 : t, spread);
        D.render();
        if (B) B.update(reduce ? 0 : t, scrollY, reduce ? 0 : vy * .35, sx, sy);
    })(performance.now());
    return ()=>{
        stopped = true;
        cancelAnimationFrame(raf);
    };
}
}),
];

//# sourceMappingURL=apps_web_src_lib_hero3d_0ia5tjw.js.map