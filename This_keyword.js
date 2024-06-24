const alex = {
  identity: "kessy",
  greet: function() {
    console.log(`${this.identity} says hello`);
  }
}
alex.greet()