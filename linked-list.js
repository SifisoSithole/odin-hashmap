const Node = require('./node');

/**
 * Represents a linked list.
 */
class LinkedList {
  /**
   * Create a new LinkedList.
   */
  constructor() {
    this.listHead = null; // The head of the linked list.
  }

  /**
   * Appends a new node to the end of the linked list or updates an existing node's
   * value if the key already exists.
   * @param {*} key - The key for the new node.
   * @param {*} value - The value for the new node.
   * @returns {boolean} - True if the node with the given key already exists and its
   * value is updated, false otherwise.
   */
  append(key, value) {
    const newNode = new Node(key, value);
    if (this.listHead === null) {
      this.listHead = newNode;
      return false;
    }

    if (this.listHead.key === key) {
      this.listHead.value = value;
      return true;
    }

    let currentNode = this.listHead;
    while (currentNode.nextNode) {
      if (currentNode.key === key) {
        currentNode.value = value;
        return true;
      }

      currentNode = currentNode.nextNode;
    }

    currentNode.nextNode = newNode;
    return false;
  }

  /**
   * Returns the number of nodes in the linked list.
   * @returns {number} - The number of nodes in the linked list.
   */
  size() {
    let i = 0;
    let currentNode = this.listHead;
    while (currentNode) {
      i += 1;
      currentNode = currentNode.nextNode;
    }
    return i;
  }

  /**
   * Removes the node with the specified key from the linked list.
   * @param {*} key - The key of the node to remove.
   * @returns {boolean} - True if the node with the specified key is removed, false otherwise.
   */
  remove(key) {
    let currentNode = this.listHead;
    let prev;

    if (!this.listHead) return false;

    if (currentNode.key === key) {
      this.listHead = null;
      return true;
    }

    if (!currentNode.nextNode) return false;

    while (currentNode) {
      prev = currentNode;
      currentNode = currentNode.nextNode;
      if (currentNode.key === key) {
        prev.nextNode = currentNode.nextNode;
        return true;
      }
    }

    return false;
  }

  /**
   * Checks if the linked list contains a node with the specified key.
   * @param {*} key - The key to search for.
   * @returns {boolean} - True if the linked list contains a node with the
   * specified key, false otherwise.
   */
  contains(key) {
    let currentNode = this.listHead;

    while (currentNode) {
      if (currentNode.key === key) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }

    return false;
  }

  /**
   * Retrieves the value associated with the specified key in the linked list.
   * @param {*} key - The key whose value to retrieve.
   * @returns {*} - The value associated with the specified key, or null if the key is not found.
   */
  getValue(key) {
    let currentNode = this.listHead;

    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode.value;
      }
      currentNode = currentNode.nextNode;
    }

    return null;
  }

  /**
   * Finds the index of the first occurrence of the specified value in the linked list.
   * @param {*} value - The value to search for.
   * @returns {number|null} - The index of the first occurrence of the value, or null if
   * the value is not found.
   */
  find(value) {
    let currentNode = this.listHead;
    let i = 0;

    while (currentNode) {
      if (currentNode.value === value) {
        return i;
      }
      i += 1;
      currentNode = currentNode.nextNode;
    }

    return null;
  }
}

module.exports = LinkedList;
