let G = {
  // Log level
  I: "Info",
  W: "Warning",
  E: "Error",

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
      G.logger(G.E, "No material for grenade pack")
    }
  },

  // Logger
  logger: function(level, content) {
    // Build string
    let thisDate = new Date();
    let prefix = ""
    let timeStr = "[" + thisDate.toLocaleString() + "]"
    let levelStr = "[" + level + "]"
    if (level === G.I) {
      console.info(timeStr, levelStr, content)
    }
    else if (level === G.W) {
      console.warn(timeStr, levelStr, content)
    }
    else if (level === G.E) {
      console.error(timeStr, levelStr, content)
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
      G.logger(G.E, "cannot pack fault material(s) in grenade")
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
        G.logger(G.E, "no target selected")
      }
    }
    else {
      G.logger(G.E, "wrong type of target to throw")
    }
  }
}
