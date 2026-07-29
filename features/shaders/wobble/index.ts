import { simplexNoise4d } from "../simplexNoise4d";

export const vertexShader = `
attribute vec4 tangent;

uniform float uTime;
uniform float uTimeFrequency;
uniform float uStrength;
uniform float uPositionFrequency;
uniform float uWarpPositionFrequency;
uniform float uWarpTimeFrequency;
uniform float uWarpStrength;

varying float vWobble;

${simplexNoise4d}

float getWobble(vec3 position)
{
    vec3 warpedPosition = position;

    warpedPosition += simplexNoise4d(vec4(
        position * uWarpPositionFrequency,
        uTime * uWarpTimeFrequency
    )) * uWarpStrength;

    return simplexNoise4d(vec4(
        warpedPosition * uPositionFrequency,
        uTime * uTimeFrequency
    )) * uStrength;
}

void main()
{
    vec3 biTangent = cross(normal, tangent.xyz);

    // Neighbours positions
    float shift = 0.01;
    vec3 neighbour1 = csm_Position + tangent.xyz * shift;
    vec3 neighbour2 = csm_Position + biTangent * shift;

    // Wobble
    float wobble = getWobble(csm_Position);
    csm_Position += wobble * normal;
    neighbour1   += getWobble(neighbour1) * normal;
    neighbour2   += getWobble(neighbour2) * normal;

    // Compute normal
    vec3 toNeighbour1 = normalize(neighbour1 - csm_Position);
    vec3 toNeighbour2 = normalize(neighbour2 - csm_Position);
    csm_Normal = normalize(cross(toNeighbour1, toNeighbour2));

    // Varyings
    vWobble = wobble / uStrength;
}`;

export const fragmentShader = `
varying float vWobble;

uniform vec3 uColorA;
uniform vec3 uColorB;

void main()
{
    float colorMix = smoothstep(-1.0, 1.0, vWobble);
    csm_DiffuseColor.rgb = mix(uColorA, uColorB, colorMix);
}`;
