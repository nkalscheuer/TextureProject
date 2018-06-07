#ifdef GL_ES
precision mediump float;

#endif
uniform samplerCube u_sphereTex;

varying vec4 v_pos;
varying vec3 v_normal;



void main() {
  gl_FragColor = textureCube(u_sphereTex, v_normal);
  // gl_FragColor = textureCube(u_sphereTex, v_pos.xyz);
  //gl_FragColor = vec4(1.0,0.4,0.4,1.0);
}
