import Color from 'color'

const water = 'rgb(101,  196,  236)'
const waterColor = Color(water)
const step = 29 // deg

const waters = {
  deep: waterColor.rotate(1 * step).darken(0.2).string(),
  slow: waterColor.string(),
  swift: waterColor.rotate(-1 * step).darken(0.2).string()
}
const rapids = {
  R1: waterColor.rotate(-2 * step).darken(0.2).string(),
  R2: waterColor.rotate(-3 * step).darken(0.2).string(),
  R3: waterColor.rotate(-4 * step).darken(0.2).string(),
  R4: waterColor.rotate(-5 * step).darken(0.2).string(),
  R5: waterColor.rotate(-6 * step).darken(0.2).string(),
  R6: waterColor.rotate(-7 * step).darken(0.2).string()
}
const ledges = {
  S1: waterColor.rotate(2.4 * step).lighten(0.3).string(),
  S2: waterColor.rotate(3 * step).lighten(0.2).string(),
  S3: waterColor.rotate(3.6 * step).lighten(0.1).string(),
  S4: waterColor.rotate(4.2 * step).darken(0.1).string(),
  S5: waterColor.rotate(4.8 * step).darken(0.2).string(),
  C: waterColor.rotate(5.4 * step).darken(0.4).string()
}
const portages = {
  P1: waterColor.rotate(-5.2 * step).darken(0.5).string(),
  P2: waterColor.rotate(-5.6 * step).darken(0.5).string(),
  P3: waterColor.rotate(-6 * step).darken(0.5).string(),
  P4: waterColor.rotate(-6.4 * step).darken(0.5).string(),
  P5: waterColor.rotate(-6.8 * step).darken(0.5).string(),
  Px: waterColor.rotate(-7.2 * step).darken(0.5).string()
}
const index = {
  deeps: waters.deep,
  water: waters.slow,
  EV: waters.swift,
  ...waters,
  ...rapids,
  ...ledges,
  ...portages,
  waters: ['deeps', 'water', 'EV'],
  rapids: ['R1', 'R2', 'R3', 'R4', 'R5', 'R6'],
  ledges: ['S1', 'S2', 'S3', 'S4', 'S5', 'C'],
  portages: ['P1', 'P2', 'P3', 'P4', 'P5', 'Px'],
  'put-in': 'black',
  unknown: 'white'
}
index.whitewater = ['EV', ...(index.rapids.slice(0, -1)), ...(index.ledges.reverse())]
export default index
