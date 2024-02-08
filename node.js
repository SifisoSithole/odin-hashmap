/**
 * Represents a node in a linked list.
 */
class Node {
  /**
     * Create a new Node.
     * @param {*} key - The key associated with the node.
     * @param {*} value - The value associated with the node.
     */
  constructor(key, value) {
    this.key = key; // The key associated with the node.
    this.value = value; // The value associated with the node.
    this.nextNode = null; // Reference to the next node in the linked list.
  }
}

module.exports = Node;
