// Log level
let I = "Info"
let W = "Warning"
let E = "Error"

// Logger
let gLogger = function(level, content) {
  // Build string
  let thisDate = new Date();
  let prefix = ""
  let timeStr = "[" + thisDate.toLocaleString() + "]"
  let levelStr = "[" + level + "]"
  if (level === I) {
    console.info(timeStr, levelStr, content)
  }
  else if (level === W) {
    console.warn(timeStr, levelStr, content)
  }
  else if (level === E) {
    console.error(timeStr, levelStr, content)
  }
}

// Init grenade object
let G = function(selector) {
  if (typeof selector == "string" ) {
    let group = document.querySelectorAll(selector)
    // Check selected nodes
    if (group.length >= 1) {
      console.log('selected:', group);
      let gt = new gTarget(group)
      return gt
    }
    else {
      gLogger(E, "no target selected")
    }
  }
  else {
    gLogger(E, "wrong type of param for G()")
  }
}

//
class gTarget {
  constructor(nodeList) {
    if (nodeList instanceof NodeList) {
      this.target = nodeList
    }
    else {
      gLogger(E, "cannot aim at wrong type of target(s)")
    }
  }
  // Pack data
  pack(first, ...others) {
    let data = []
    if (first !== undefined) {
      data.push(first)
      for (let each of others) {
        data.push(each)
      }
      console.log('data:', data);
      let gr = new gReady(data)
      return gr
    }
    else {
      gLogger(E, "No material for grenade pack")
    }
  }
}

//
class gReady {
  constructor(data) {
    if (Array.isArray(data)) {
      this.data = data
    }
    else {
      gLogger(E, "cannot pack fault material(s) in grenade")
    }
  }
  // Throw(Render) data
  throw(data) {
    console.log('Thrown!');
  }
}
