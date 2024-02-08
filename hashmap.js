const LinkedList = require('./linked-list');

/**
 * Represents a simple hash map implementation.
 */
class HashMap {
  /**
   * Create a new HashMap.
   * @param {number} [capacity=16] - The initial capacity of the hash map.
   * @param {number} [loadFactor=0.75] - The load factor threshold for resizing the hash map.
   */
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity; // The initial capacity of the hash map.
    this.loadFactor = loadFactor; // The load factor threshold for resizing the hash map.
    this.buckets = new Array(capacity).fill(new LinkedList()); // buckets
    this.usedBuckets = 0; // Number of buckets that contain at least one key-value pair.
    this.size = 0; // Number of key-value pairs stored in the hash map.
    this.keysArray = []; // Array to store all keys in the hash map.
  }

  /**
   * Hashes a key to determine its bucket index.
   * @param {string} key - The key to hash.
   * @returns {number} - The bucket index for the key.
   */
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.capacity;
    }
    return hashCode;
  }

  /**
   * Resizes the bucket array when the load factor threshold is exceeded.
   */
  resizeBuckets() {
    // Double the capacity of the hash map
    const newCapacity = this.capacity * 2;

    // Create a new array of buckets with the doubled capacity
    const newBuckets = new Array(newCapacity).fill(new LinkedList());

    // Rehash all elements into the new buckets
    for (let i = 0; i < this.keysArray.length; i += 1) {
      const hashCode = this.hash(this.keysArray[i]);
      newBuckets[hashCode].append(this.keysArray[i], this.get(this.keysArray[i]));
    }

    // Update the hash map properties
    this.capacity = newCapacity;
    this.buckets = newBuckets;
  }

  /**
   * Sets a key-value pair in the hash map.
   * @param {string} key - The key for the pair.
   * @param {*} value - The value for the pair.
   * @throws {Error} - If the key is not a string.
   */
  set(key, value) {
    if (typeof key !== 'string') throw new Error('Key must be a string');
    const hashCode = this.hash(key);
    if (!this.buckets[hashCode].head) this.usedBuckets += 1;

    if (!this.buckets[hashCode].append(key, value)) {
      this.size += 1;
      this.keysArray.push(key);
    }

    if (this.size / this.capacity >= this.loadFactor) this.resizeBuckets();
  }

  /**
   * Retrieves the value associated with the specified key.
   * @param {string} key - The key whose value to retrieve.
   * @returns {*} - The value associated with the specified key, or undefined if not found.
   */
  get(key) {
    if (typeof key !== 'string') throw new Error('Key must be a string');
    const hashCode = this.hash(key);
    return this.buckets[hashCode].getValue(key);
  }

  /**
   * Checks if the hash map contains a key.
   * @param {string} key - The key to check for.
   * @returns {boolean} - True if the hash map contains the key, false otherwise.
   */
  has(key) {
    if (typeof key !== 'string') throw new Error('Key must be a string');
    const hashCode = this.hash(key);
    return this.buckets[hashCode].contains(key);
  }

  /**
   * Removes a key-value pair from the hash map.
   * @param {string} key - The key to remove.
   * @returns {boolean} - True if the key-value pair is removed, false if the key is not found.
   */
  remove(key) {
    if (typeof key !== 'string') throw new Error('Key must be a string');
    const hashCode = this.hash(key);
    const result = this.buckets[hashCode].remove(key);
    if (result) {
      this.size -= 1;
      const index = this.keysArray.indexOf(key);
      if (index !== -1) this.keysArray.splice(index, 1);
    }
    return result;
  }

  /**
   * Returns the number of key-value pairs in the hash map.
   * @returns {number} - The number of key-value pairs in the hash map.
   */
  length() {
    return this.size;
  }

  /**
   * Clears all key-value pairs from the hash map.
   */
  clear() {
    this.buckets.fill(null);
  }

  /**
   * Returns an array containing all keys in the hash map.
   * @returns {Array} - Array containing all keys in the hash map.
   */
  keys() {
    return this.keysArray;
  }

  /**
   * Returns an array containing all values in the hash map.
   * @returns {Array} - Array containing all values in the hash map.
   */
  values() {
    const valuesArray = [];
    for (let i = 0; i < this.keysArray.length; i += 1) {
      valuesArray.push(this.get(this.keysArray[i]));
    }
    return valuesArray;
  }

  /**
   * Returns an array containing all key-value pairs in the hash map.
   * @returns {Array} - Array containing all key-value pairs in the hash map.
   */
  entries() {
    const entries = [];
    for (let i = 0; i < this.keysArray.length; i += 1) {
      const keyPair = [this.keysArray[i]];
      keyPair.push(this.get(this.keysArray[i]));
      entries.push(keyPair);
    }
    return entries;
  }
}

module.exports = HashMap;
