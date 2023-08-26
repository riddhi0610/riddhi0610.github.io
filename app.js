let menu = document.querySelector('#menu-icon');
  let navbar = document.querySelector('.navbar');

  menu.onclick = () => {
    menu.classList.toggle('fa-xmark');
    menu.classList.toggle('fa-bars');

        if(menu.classList.contains('fa-xmark')){
            navbar.style.display = "flex";
        }else{
            navbar.style.display = "none";
        }
    
  };

const accordians = document.querySelectorAll(".accordian");
accordians.forEach((accordian) => {
  accordian.addEventListener("click", () => {
    accordian.classList.toggle("active");
  });
});
  
  const settings = {
    colors: ["#86D4D3", "#A8E6B5", "#A8E6D1", "#86D4D3", "#A8E6B5"],
    // Using normalized coordinates for arcs
    points: [
      [[.5, 0], [0, .5]],
      [[.5, 0], [1, .5]],
      [[0, .5], [.5, 1]],
      [[1, .5], [.5, 1]],
      [[.5, 1], [.5, 0]],
      [[1, .5], [0, .5]],
    ],
    arcControlPoint: [.5, .5]
  };
  
  const utils = {
    getRandFromRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
  
  class Illustration {
    columnCount;
    rowCount;
    boxSize;
    colors;
    screen = { width: 0, height: 0 };
    svg;
    isAnimated;
  
    constructor(selector, colors) {
      this.boxes = [];
      this.screen = {
        width: window.innerWidth,
        height: window.innerHeight
      };
  
      this.columnCount = Math.floor(this.screen.width / 150);
      this.rowCount = Math.floor(this.screen.height / 150);
      this.boxSize = 40;
  
      this.setSVG(selector);
      this.colors = colors;
  
      this.isAnimated = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  
      this.draw();
    }
  
    setSVG(selector) {
      this.svg = document.querySelector(selector);
      this.svg.addEventListener("click", this.draw.bind(this));
      this.svg.setAttribute(
        "viewBox",
        `0 0 ${this.boxSize * this.columnCount} ${this.boxSize * this.rowCount}`
      );
    }
  
    reset() {
      this.boxes = [];
      this.svg.innerHTML = "";
    }
  
    draw() {
      this.reset();
  
      for (let i = 0; i < this.rowCount; i++) {
        for (let j = 0; j < this.columnCount; j++) {
          let elementColor = utils.getRandFromRange(0, this.colors.length - 1);
  
          const box = new Box(
            j * this.boxSize,
            i * this.boxSize,
            this.boxSize,
            this.boxSize,
            this.colors[elementColor]
          ).getDOMElement();
  
          this.svg.appendChild(box);
          this.boxes.push(box);
        }
      }
  
      this.isAnimated ? this.animate() : null;
    }
  
    animate() {
      const duration = 2.75;
      this.boxes.forEach((box, i) => {
        const direction = Math.random() > 0.5 ? 1 : -1;
        gsap.set(box, {transformOrigin: "50% 50%"});
        gsap.to(box, {
          keyframes: [
            {
              rotation: 90 * direction,
              duration: duration,
              ease: "power2.inOut"
            },
            {
              rotation: 180 * direction,
              duration: duration,
              ease: "power2.inOut"
            },
            {
              rotation: 270 * direction,
              duration: duration,
              ease: "power2.inOut"
            },
            {
              rotation: 360 * direction,
              duration: duration,
              ease: "power2.inOut"
            }
          ],
          repeat: -1,
        })
      })
    }
  }
  
  class Box {
    x;
    y;
    width;
    height;
    bgColor;
    elementColor;
    element;
  
    constructor(x, y, width, height, elementColor) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.elementColor = elementColor;
  
      this.rectangle = new Rectangle(x, y, width, height, "none");
      this.arc = new Arc(x, y, width, height, elementColor);
  
      this.setDOMElement();
    }
  
    getDOMElement() {
      return this.element;
    }
  
    setDOMElement() {
      this.element = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
      );
  
      this.element.append(this.rectangle.getDOMElement());
      this.element.append(this.arc.getDOMElement());
    }
  }
  
  class Rectangle {
    cx;
    cy;
    r;
    fill;
    element;
  
    constructor(x, y, width, height, fill) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.fill = fill;
  
      this.setDOMElement();
    }
  
    getDOMElement() {
      return this.element;
    }
  
    setDOMElement(x, y, width, height, fill) {
      this.element = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
  
      this.element.setAttribute("x", x ? x : this.x);
      this.element.setAttribute("y", y ? y : this.y);
      this.element.setAttribute("width", width ? width : this.width);
      this.element.setAttribute("height", height ? height : this.height);
      this.element.style.fill = fill ? fill : this.fill;
    }
  }
  
  class Arc {
    x;
    y;
    width;
    height;
    position;
    fill;
    path;
    element;
  
    constructor(x, y, width, height, stroke) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.points = utils.getRandFromRange(0, settings.points.length - 1);
      this.points = settings.points[this.points];
      this.stroke = stroke;
      this.strokeWidth = 10;
  
      this.setPath();
      this.setDOMElement();
    }
  
    setPath() {
      let w = this.width;
      let h = this.height;
      let start = this.points[0];
      let end = this.points[1];
  
      this.path = `M ${this.x + start[0] * w} ${this.y + start[1] * h} Q ${this.x + settings.arcControlPoint[0] * w} ${this.y + settings.arcControlPoint[1] * h}, ${this.x + end[0] * w} ${this.y + end[1] * h}`;
    }
  
    getDOMElement() {
      return this.element;
    }
  
    setDOMElement(x, y, width, height, points, stroke) {
      this.element = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
  
      this.element.setAttribute("d", this.path);
      this.element.setAttribute("fill", "none");
      this.element.setAttribute("stroke-width", this.strokeWidth);
      this.element.classList.add("arc");
      this.element.style.stroke = stroke ? stroke : this.stroke;
    }
  }
  
  const illustration = new Illustration(
    "#illustration",
    settings.colors
  );
  