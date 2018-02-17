let G = {
  // Log level
  I: "Info",
  W: "Warning",
  E: "Error",

  // Select element
  target: function(selector) {
    if (typeof selector == "string" ) {
      let nodeList = document.querySelectorAll(selector)
      // Check selected nodes
      if (nodeList.length >= 1) {
        let gr = new grenade(nodeList)
        return gr
      }
      else {
        G.logger(G.E, "no target selected")
      }
    }
    else {
      G.logger(G.E, "wrong type of target selector")
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
  constructor(nodeList) {
    // Special renders
    this.hrefNode = ["A"]
    this.srcNode = ["IMG", "VIDEO", "IFRAME"]
    this.valueNode = ["INPUT", "OPTION"]

    // Render content to node
    this.renderer = function(node, content) {
      if (this.srcNode.includes(node.tagName)) {
        node.setAttribute('src', content)
      }
      else if (this.hrefNode.includes(node.tagName)) {
        node.setAttribute('href', content)
      }
      else if (this.valueNode.includes(node.tagName)) {
        node.setAttribute('value', content)
      }
      else {
        node.innerHTML = content
      }
    }

    // Store list
    if (nodeList instanceof NodeList) {
      this.list = nodeList
    }
    else {
      G.logger(G.E, "wrong type of target to throw")
    }
  }
  // Render data
  throw(data) {
    if (data !== undefined) {
      // Array render
      if (Array.isArray(data)) {
        for (let eachNode of this.list) {
          // Filter nodes
          let count = -1
          let len = data.length
          let gNodes = eachNode.querySelectorAll('.g-node')
          for (let eachG of gNodes) {
            count = (count + 1) % len
            this.renderer(eachG, data[count])
          }
        }
      }
      // Object render
      else if (typeof data == "object") {
        for (let eachNode of this.list) {
          // Filter nodes
          let gNodes = eachNode.querySelectorAll('.g-node')
          for (let eachG of gNodes) {
            let key = eachG.getAttribute('g-key')
            this.renderer(eachG, data[key])
          }
        }
      }
      else {
        G.logger(G.E, "Not supported data type for grenade")
      }
    }
    else {
      G.logger(G.E, "No data in grenade")
    }
  }
}
