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
 * Minus
 */
.hamburger--minus .hamburger-inner:before, .hamburger--minus .hamburger-inner:after {
  transition: bottom 0.08s 0s ease-out, top 0.08s 0s ease-out, opacity 0s linear;
}

.hamburger--minus.is-active .hamburger-inner:before, .hamburger--minus.is-active .hamburger-inner:after {
  opacity: 0;
  transition: bottom 0.08s ease-out, top 0.08s ease-out, opacity 0s 0.08s linear;
}

.hamburger--minus.is-active .hamburger-inner:before {
  top: 0;
}

.hamburger--minus.is-active .hamburger-inner:after {
  bottom: 0;
}

/*# sourceMappingURL=minus.php.map */