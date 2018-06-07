uniform mat4 u_ModelMatrix;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ProjectionMatrix;

attribute vec4 a_Position;
varying vec4 v_pos;
varying vec3 v_normal;

void main() {
    v_normal = a_Position.xyz;
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;
    v_pos = gl_Position;
}
