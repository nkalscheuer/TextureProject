#ifdef GL_ES
precision mediump float;

#endif
uniform samplerCube u_sphereTex;

varying vec4 v_pos;
varying vec3 v_normal;
uniform vec3 u_EyePos;



void main() {
  vec3 v_incident = v_pos.xyz - u_EyePos;
  //Added color to sphere
  gl_FragColor = textureCube(u_sphereTex, reflect(v_incident, normalize(v_normal))) - vec4(0.1, 0.1, 0.0, 0.0);
  //No added color to sphere
  // gl_FragColor = textureCube(u_sphereTex, reflect(v_incident, normalize(v_normal)));
  // gl_FragColor = textureCube(u_sphereTex, v_normal);
  // gl_FragColor = textureCube(u_sphereTex, v_pos.xyz);
  //gl_FragColor = vec4(1.0,0.4,0.4,1.0);
}
