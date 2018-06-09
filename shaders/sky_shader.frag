#ifdef GL_ES
precision mediump float;
#endif

uniform samplerCube u_cubeTex;

varying vec3 v_pos;
varying vec4 v_color;

void main() {
    // gl_FragColor = textureCube(u_cubeTex, v_pos) + vec4(0.2, 0.0, 0.0, 0.0);
    gl_FragColor = textureCube(u_cubeTex, v_pos);
}
