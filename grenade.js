let G = {
  // Log level
  I: "Info",
  W: "Warning",
  E: "Error",

  // Logger
  gLogger: function(level, content) {
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
  },

  // Pack data
  pack: function(first, ...others) {
    let data = []
    if (first !== undefined) {
      data.push(first)
      for (let each of others) {
        data.push(each)
      }
      console.log('data:', data);
      let gr = new grenade(data)
      return gr
    }
    else {
      gLogger(E, "No material for grenade pack")
    }
  }
}

// Class grenade
class grenade {
  constructor(data) {
    if (Array.isArray(data)) {
      this.data = data
    }
    else {
      gLogger(E, "cannot pack fault material(s) in grenade")
    }
  }
  // Select target
  throw(selector) {
    if (typeof selector == "string" ) {
      let group = document.querySelectorAll(selector)
      // Check selected nodes
      if (group.length >= 1) {
        console.log('selected:', group);
      }
      else {
        gLogger(E, "no target selected")
      }
    }
    else {
      gLogger(E, "wrong type of param for G()")
    }
  }
}
