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
  throw(data, loop=false) {
    if (data !== undefined) {
      // Array render
      if (Array.isArray(data)) {
        if (loop === false) {
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
        // List of objects
        else {
          for (let eachNode of this.list) {
            // Init for loop
            let count = 0
            let prevNode = null
            let curNode = eachNode
            for (let eachDatum of data) {
              // Clone node
              let newNode = curNode.cloneNode(true)
              // If first entrance, do not insert
              if (count !== data.length-1) {
                curNode.parentElement.insertBefore(newNode, curNode.nextSibling)
              }
              // First node
              let gNodes = curNode.querySelectorAll('.g-node')
              for (let eachG of gNodes) {
                let key = eachG.getAttribute('g-key')
                if (key === "$index") {
                  this.renderer(eachG, count+1)
                }
                else {
                  this.renderer(eachG, eachDatum[key])
                }
              }
              // Switch node
              prevNode = curNode
              curNode = newNode
              // Counter increment
              count++
            }
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
