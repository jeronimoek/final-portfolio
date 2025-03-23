// varying vec2 vUv;
// varying vec3 vPos;
uniform sampler2D uDataTexture;
varying vec2 vUv;
uniform vec3 uMouseWorldPosition;
uniform float uTime;

void main(){
    float step = (1./8.);
    
    float distX = vUv.x;
    float distY = vUv.y;

    float factor = 2.-distance(vUv, uMouseWorldPosition.xy)/10.;
    float brightnessFactor = max(.5,1.-distance(vUv, uMouseWorldPosition.xy)/1.);

    // float max = 1.;
    // vec4 color = vec4(0.0,.0,.0,1.0);
    float xVal = distX - mod( distX , step );
    // color.x = 1. - mod( xVal , max );
    float yVal = distY - mod( distY , step );
    // color.z = 1. - mod( yVal , max );
    // color.x = mod( vUv.x , block ) > block/2. ? 0. : 1. ;
    // color.y = mod( vUv.y , block ) > block/2. ? 0. : 1. ;
    
    float sum = xVal + yVal * factor + uTime/10.;
    // float modSum = mod(sum, 1.);
    float modSum = mod(sum, .8);

    // float max = xVal > yVal ? xVal : yVal;
    // float modMax = mod(max, 1.);

    vec4 colorData = texture2D(uDataTexture, vec2(modSum, 0.0));

    gl_FragColor = vec4(colorData.xyz * brightnessFactor, 1.0);
}