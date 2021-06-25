.hamburger {
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
}

.hamburger .hamburger-inner,
.hamburger .hamburger-inner::before,
.hamburger .hamburger-inner::after {
  background-color: currentColor;
}

.hamburger-box {
  width: 15px;
  height: 12px;
  display: inline-block;
  position: relative;
}

.hamburger-inner {
  display: block;
  top: 50%;
  margin-top: -1px;
}

.hamburger-inner, .hamburger-inner:before, .hamburger-inner:after {
  width: 15px;
  height: 2px;
  background-color: currentColor;
  border-radius: 2px;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
}

.hamburger-inner:before, .hamburger-inner:after {
  content: "";
  display: block;
}

.hamburger-inner:before {
  top: -5px;
}

.hamburger-inner:after {
  bottom: -5px;
}

/*
 * Vortex
 */
.hamburger--vortex .hamburger-inner {
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}

.hamburger--vortex .hamburger-inner:before, .hamburger--vortex .hamburger-inner:after {
  transition-duration: 0s;
  transition-delay: 0.1s;
  transition-timing-function: linear;
}

.hamburger--vortex .hamburger-inner:before {
  transition-property: top, opacity;
}

.hamburger--vortex .hamburger-inner::after {
  transition-property: bottom, transform;
}

.hamburger--vortex.is-active .hamburger-inner {
  transform: rotate(765deg);
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}

.hamburger--vortex.is-active .hamburger-inner:before, .hamburger--vortex.is-active .hamburger-inner:after {
  transition-delay: 0s;
}

.hamburger--vortex.is-active .hamburger-inner:before {
  top: 0;
  opacity: 0;
}

.hamburger--vortex.is-active .hamburger-inner:after {
  bottom: 0;
  transform: rotate(90deg);
}

/*# sourceMappingURL=vortex.php.map */